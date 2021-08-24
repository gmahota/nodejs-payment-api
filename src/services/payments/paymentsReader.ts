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
        port: Number(process.env.FTP_PServices_Port) || 21,

    }).then(async (serverMessage) => {
        console.log('Server message: ' + serverMessage);

        return await ftp.listSafe('/To Import');
    }).then(async function (list: any) {
        await list
            .filter((item: any) => item["type"] === "-")
            .forEach(async (item: any) => {
                ftp.cwd('/To Import');

                var stream = await ftp.get(`${item.name}`)
                const chunks: any = [];

                for await (let chunk of stream) {
                    chunks.push(chunk)
                }

                const buffer = Buffer.concat(chunks);
                const str = buffer.toString("utf-8")

                lists.push(convertToServicePayment(String(str)))

            })

        // console.log('Directory listing:');
        // console.dir(list);

        return ftp.end();
    });

    return lists

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
                .filter((line: string) => line.substr(0, 1) === "2")
                .forEach((line: string) => {
                    const item: ServicePaymentLine = {
                        id: 0,
                        reference: line.substr(1, 11),
                        date: convertToDate(line.substr(44, 8), "DDMMyyyy"),
                        transactionId: line.substr(58, 7),
                        amount: convertToNumber(line.substr(12, 16), 2),
                        rate: convertToNumber(line.substr(28, 16), 2),
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