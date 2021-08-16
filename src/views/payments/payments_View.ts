import Payment from "../../models/payments/payment";

export default {
  render(payment: Payment) {
    return {
      id: payment.id,
      paymentId: payment.id,
      date: payment.date,
      phoneNumber: payment.phoneNumber,
      reference: payment.reference,
      transaction: payment.transaction,
      amount: payment.amount,
      type: payment.type,
      status: payment.status
    };
  },
  renderMany(payments: Payment[]) {
    return payments.map((payment) => this.render(payment));
  },
};
