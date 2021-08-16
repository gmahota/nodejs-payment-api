
import Payment from '../../models/payments/payment'
import PaymentRepository from '../../repository/payments/paymentRepository'
import payments_View from '../../views/payments/payments_View'


const getById = (id: string) =>
    PaymentRepository.findById(id)

const getAll = () =>
    PaymentRepository.findAll()


const create = async function create(data: Payment): Promise<Payment> {
    var payment = await PaymentRepository.create(data)

    return payments_View.render(payment)
}

const getByPhoneNumber = (phoneNumber: string) =>
    PaymentRepository.findByPhoneNumber(phoneNumber)

export default {
    getAll,
    getById,
    create,
    getByPhoneNumber,
}