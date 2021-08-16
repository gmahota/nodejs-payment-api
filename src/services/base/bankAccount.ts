
import BankAccount from '../../models/base/bankAccount'
import repository from '../../repository/base/bankAccount'


const getById = (id: string) =>
  repository.findById(id)

const getAll = () =>
  repository.findAll()


const create = (BankAccount: BankAccount) =>
  repository.create(BankAccount)

export default {
  getAll,
  getById,
  create
}