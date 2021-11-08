
import Bank from '../../models/base/bank'
import repository from '../../repository/base/bank'


const getByCode = (id: string) =>
  repository.findByCode(id)

const getAll = () =>
  repository.findAll()


const create = async (bank: Bank) : Promise<Bank> =>{
  
  if(await exists(bank.code)){

    return Promise.reject(new Error("Bank already exists"))
  }else{
    return repository.create(bank)
  }
}  

const exists = (code: string) =>
  repository.exists(code)

export default {
  getAll,
  getByCode,
  create,
  exists
}