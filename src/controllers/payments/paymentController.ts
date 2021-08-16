import { Request, Response } from "express";
import PaymentService from "../../services/payments/payment";
import Payment from "./../../models/payments/payment";
import path from "path";

import aws from "aws-sdk";

export const get_all_payments = async (
  request: Request,
  response: Response,
) => {
  const Payment = await PaymentService.getAll();
  return response.status(200).json(Payment);
};

export const get_payment = async (request: Request, response: Response) => {
  const { id } = request.body;

  const payment = await PaymentService.getById(id);

  if (payment) {
    return response.status(200).json(payment);
  }
  return response.status(404).json({ msg: "no payment with that id" });
};

export const create_payment = async (request: Request, response: Response) => {
  const {
    date,
    phoneNumber,
    reference,
    transaction,
    amount,
    type,
    status,
    orderId,
  } = await request.body;

  try {
    let payment: Payment = {
      id: 0,
      date,
      phoneNumber,
      reference,
      transaction,
      amount,
      type,
      status
    };

    payment = await PaymentService.create(payment);

    return response.status(200).json(payment);
  } catch (e) {
    return response.status(e.status || 404).json(
      {
        msg: e.statusText ||
          "Error to create a payment" + ` for order ${orderId}`,
        error: e,
      },
    );
  }
};

export const delete_order = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await Paymentervice.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
      { msg: "error to create a order with that i" },
    );
  }
};

export const print_payment = async (request: Request, response: Response) => {
  const { id } = request.params;

  const payment = await PaymentService.getById(id);

  if (payment) {
    var awsS3 = new aws.S3({
      accessKeyId: process.env.AWS_AccessKey,
      secretAccessKey: process.env.AWS_Secret,
    });

    var options = {
      Bucket: process.env.AWS_S3_Buckets || "Mahota_Dev",
      Key: `payments/${id}.pdf`,
    };

    awsS3.getObject(options, function (err, data) {
      response.contentType("application/pdf");

      if (err) {
        var file = path.join(`./public/uploads/payments/${id}.pdf`);
        response.download(file);
      } else {
        response.send(data.Body);
      }
    });
  } else {
    return response.status(404).json({ msg: "no payment with that id" });
  }
};
