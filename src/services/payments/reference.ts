
const getReference_Ponto24 = (entity: string, document: string, code: number, numberPayment: number) => {
    let sReferenciaSCheck = ""

    let sReferenciaSCheckCalc = ""

    let I = 1;
    let P = 0;
    let S = 0;
    let numPos = 0;
    let CheckDigitReferencia = 0;

    sReferenciaSCheck = document.substring(0, 1) + pad_with_zeroes(code.toString(), 6) + pad_with_zeroes(numberPayment.toString(), 2)

    sReferenciaSCheckCalc = pad_with_zeroes(entity, 5) + sReferenciaSCheck;

    while (I <= 15) {
        if (I == 1) {
            P = 0;
        }
        if (I < 15) {
            numPos = Number(sReferenciaSCheckCalc.substring(I - 1, 1));
        }
        else {
            numPos = 0;
        }

        S = P + numPos;
        P = (S * 10) % 97;

        I++;
    }

    CheckDigitReferencia = 98 - P;

    return sReferenciaSCheck + pad_with_zeroes(CheckDigitReferencia.toString(), 2);
}

const getReference_Bim = (bank_code: string, bank: string, code: string, invoice: number) => {
    let strNibFinal = ""

    if (bank.length != 4) {
        throw new Error("Codigo Banco deve ter 4 digitos");
    }

    if (code.length != 4) {
        throw new Error("Codigo Balção deve ter 4 digitos");
    }

    let arrayPeso = [73, 17, 89, 38, 62, 45, 53, 15, 50, 5, 49, 34, 81, 76, 27, 90, 9, 30, 3, 10, 1];

    let strAuxConta = pad_with_zeroes(invoice.toString(), 11)

    let strNib = bank + code + strAuxConta + "00"

    let lngSoma = 0;
    let soma1 = 0;

    for (var i = 0; i < arrayPeso.length; i++) {
        //int num = Convert.ToInt32(strNib.ElementAt(i));
        soma1 = Number(strNib.substring(i, 1)) * arrayPeso[i];
        lngSoma = lngSoma + soma1;
    }

    var lngModSoma = lngSoma % 97;

    var intChDj = 98 - lngModSoma;

    strNibFinal = strNib.substring(0, 19);

    strNibFinal += pad_with_zeroes(intChDj.toString(), 2);

    return strNibFinal
}

function pad_with_zeroes(value: string, length: number) {

    var my_string = '' + value;

    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;
}

export default {
    getReference_Ponto24,
    getReference_Bim
}