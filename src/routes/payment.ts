import { Router, Request, Response } from "express";
import Reference from "../services/payments/reference"
import PaymentsReader from "../services/payments/paymentsReader"

import * as PaymentControler from "../controllers/payments/paymentController";

const paymentRouter = Router();

paymentRouter.get("/ponto24/:entity-:document-:code-:numberPayment", async (request: Request, response: Response) => {

    const { entity, document, code, numberPayment } = request.params

    const reference = Reference.getReference_Ponto24(entity, document, Number(code), Number(numberPayment))
    response.send({ "Referencia": reference, "tipo": "Ponto 24", "Caracteres": reference.length })
})

paymentRouter.get("/ponto24/:entity/pedding", async (request: Request, response: Response) => {

    const { entity } = request.params

    const list = await PaymentsReader.readFiles()

    response.send(list)
})

paymentRouter.get("/bim/:bank_code-:bank-:code-:invoice", async (request: Request, response: Response) => {

    const { bank_code, bank, code, invoice } = request.params

    const reference = Reference.getReference_Bim(bank_code, bank, code, Number(invoice))
    response.send("Referencia BIM: " + reference);
})

paymentRouter
    .get("/payments", PaymentControler.get_all_payments)
    .get("/payments/:id", PaymentControler.get_payment)
    .post("/payments/", PaymentControler.create_payment)

export default paymentRouter;