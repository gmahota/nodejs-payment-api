
import Bank from '../../models/base/bank'
import repository from '../../repository/base/bank'


const getByCode = (id: string) =>
  repository.findByCode(id)

const getAll = () =>
  repository.findAll()


const create = (bank: Bank) =>
  repository.create(bank)

export default {
  getAll,
  getByCode,
  create
}