import { Router, Request, Response } from "express";
import Reference from "../services/payment/reference"

const paymentRouter = Router();

paymentRouter.get("/ponto24/:entity-:document-:code-:numberPayment", async (request: Request, response: Response) => {

    const { entity, document, code, numberPayment } = request.params

    const reference = Reference.getReference_Ponto24(entity, document, Number(code),Number(numberPayment) )
    response.send("Referencia Ponto 24: " + reference);
})

paymentRouter.get("/bim/:bank_code-:bank-:code-:invoice", async (request: Request, response: Response) => {

    const { bank_code, bank, code, invoice } = request.params

    const reference = Reference.getReference_Bim(bank_code, bank, code,Number(invoice))
    response.send("Referencia BIM: " + reference);
})

export default paymentRouter;