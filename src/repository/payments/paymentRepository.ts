import Payment from "../../models/payments/payment";
import { getRepository } from "typeorm";

import { v4 as uuidv4 } from "uuid";
import PaymentMpesaLog from "../../models/payments/paymentMpesaLog";

import Mpesa from "../../services/mpesa";
import path from "path";
import fs from "fs";
import appRoot from "app-root-path"

const findById = async function findById(id: string): Promise<Payment> {
  const PaymentRepository = getRepository(Payment);

  const payment: Payment = await PaymentRepository.findOneOrFail({
    where: { id: id }
  });

  return payment;
};

const findAll = async function findAll(): Promise<Payment[]> {
  const PaymentRepository = getRepository(Payment);

  const Payments: Payment[] = await PaymentRepository.find({
    order: {
      date: "ASC",
      id: "DESC",
    }
  });

  return Payments;
};

const findByPhoneNumber = async function findByName(
  name: string,
): Promise<Payment[]> {
  const PaymentRepository = getRepository(Payment);

  const Payments: Payment[] = await PaymentRepository.find({
    order: {
      date: "ASC",
      id: "DESC",
    },
  });

  return Payments;
};

const create = async function create(
  payment: Payment,
): Promise<Payment> {
  const PaymentRepository = getRepository(Payment);
  const PaymentMpesaLogRepository = getRepository(PaymentMpesaLog);

  const mpesaResponse = await Mpesa.set_ReceiveMoney(
    payment.phoneNumber,
    payment.reference,
    payment.reference,
    payment.amount
  );

  const data = {
    ...mpesaResponse,
    date: new Date()
  }

  const mpesaLog = await PaymentMpesaLogRepository.save(data);

  switch (Number(mpesaLog.status)) {
    case 200:
    case 201:
      payment.paymentMpesaLog = mpesaLog;

      payment = PaymentRepository.create(payment);

      payment.reference = payment.paymentMpesaLog?.reference || payment.reference;
      payment.transaction = payment.paymentMpesaLog?.transaction || payment.transaction;
      payment.status = "finished"

      await PaymentRepository.save(payment)

      return payment;

    default: return new Promise((resolve, reject) => reject(mpesaLog))
  }
};



export default {
  create,
  findById,
  findAll,
  findByPhoneNumber
};
