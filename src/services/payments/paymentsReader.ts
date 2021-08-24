import fs from 'fs'
import PromiseFtp from 'promise-ftp'
import ServicePayment from '../../models/payments/servicePayment'
import ServicePaymentLine from '../../models/payments/servicePaymentLine'
import moment from 'moment'

const readFiles = async () => {
    var ftp = new PromiseFtp();
    const lists: ServicePayment[] = []

    await ftp.connect({
        host: process.env.FTP_PServices_Host,
        user: process.env.FTP_PServices_User,
        password: process.env.FTP_PServices_Password,
        port: Number(process.env.FTP_PServices_Port) || 21
    }).then(async (serverMessage) => {
        console.log('Server message: ' + serverMessage);

        return await ftp.listSafe('/To Import');
    }).then(async function (list: any) {
        await list
            .filter((item: any) => item["type"] === "-")
            .forEach(async (item: any) => {

                console.log(item)

                await ftp.get(`/To Import/${item.name}`, true)
                    .then((stream) => {
                        console.log(stream)
                        getStream(stream).then(r => {
                            let item: ServicePayment = convertToServicePayment(String(r))

                            lists.push(item)
                        });
                    }).catch((err) => {
                        console.log(err)
                    })


                // convert stream to string

            })

        // console.log('Directory listing:');
        // console.dir(list);

        return ftp.end();
    });


    return lists

    function getStream(stream: any) {
        return new Promise(resolve => {
            const chunks: any = [];

            //Buffer.from is required if chunk is a String, see comments
            stream.on("data", (chunk: any) => chunks.push(Buffer.from(chunk)));
            stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
        });
    }


    function convertToServicePayment(text: string) {
        try {
            //readlines from string
            const servicePayment: ServicePayment = {
                id: 0,
                total: 0,
                totalRate: 0,
                items: []
            }
            let items: ServicePaymentLine[] = []
            const lines = text.split(/(?:\r\n|\r|\n)/g)
            lines
                .filter((line: string) => line.substring(0, 1) === "2")
                .forEach((line: string) => {
                    const item: ServicePaymentLine = {
                        id: 0,
                        reference: line.substring(1, 11),
                        date: convertToDate(line.substring(44, 8), "DDMMyyyy"),
                        transactionId: line.substring(58, 7),
                        amount: convertToNumber(line.substring(12, 16), 2),
                        rate: convertToNumber(line.substring(28, 16), 2),
                    }

                    items.push(item)

                })

            servicePayment.items = items;
            servicePayment.total = items.reduce((a, b: ServicePaymentLine) => a + b.amount, 0);
            servicePayment.totalRate = items.reduce((a, b: ServicePaymentLine) => a + b.rate, 0);

            return servicePayment;
        } catch (e) {
            throw e
        }
    }

    function convertToNumber(text: string, length: number) {
        try {
            var position = text.length - length

            var output = text.substr(0, position) + "." + text.substr(position, length)
            return parseFloat(output)
        } catch (e) {
            throw e
        }

    }

    function convertToDate(text: string, format: string) {
        try {
            return moment(text, format).toDate()
        } catch (e) {
            throw e
        }

    }
}

export default {
    readFiles
}