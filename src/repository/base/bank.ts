import Bank from "../../models/base/bank";
import { getRepository, getConnection } from "typeorm";

const findByCode = async function findById(code: string): Promise<Bank> {
  const BankRepository = getRepository(Bank);

  const item: Bank = await BankRepository.findOneOrFail({
    where: { code: code }
  });

  return item;
};

const findAll = async function findAll(): Promise<Bank[]> {
  const BankRepository = getRepository(Bank);

  const Banks: Bank[] = await BankRepository.find({
    order: {
      name: "ASC",
      code: "DESC",
    },
  });

  return Banks;
}

const exists = async function exists(code: string): Promise<boolean> {
  const BankRepository = getRepository(Bank);

  var items = await BankRepository.find({
    where: { code: code }
  }) || [];

  return items.length > 0;
};

const create = async function create(
  item: Bank
): Promise<Bank> {

    const BankRepository = getRepository(Bank);

    await BankRepository.save(item);
  
    return item;
  
  
};

const update = async function update(
  item: Bank
): Promise<Bank> {
  const BankRepository = getRepository(Bank);

  await BankRepository.save(item);

  return item;
};

export default {
  create,
  findAll,
  findByCode,
  update,
  exists
};
