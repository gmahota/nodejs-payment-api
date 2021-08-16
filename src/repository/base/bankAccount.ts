import BankAccount from "../../models/base/bankAccount";
import { getRepository, getConnection } from "typeorm";

const findById = async function findById(id: string): Promise<BankAccount> {
  const BankAccountRepository = getRepository(BankAccount);

  const item: BankAccount = await BankAccountRepository.findOneOrFail({
    where: { id: id }
  });

  return item;
};

const findAll = async function findAll(): Promise<BankAccount[]> {
  const BankAccountRepository = getRepository(BankAccount);

  const BankAccounts: BankAccount[] = await BankAccountRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return BankAccounts;
}

const findByCode = async function findByCode(code: string): Promise<BankAccount> {
  const BankAccountRepository = getRepository(BankAccount);

  const item: BankAccount = await BankAccountRepository.findOneOrFail({
    where: { code: code }
  });

  return item;
};

const create = async function create(
  item: BankAccount
): Promise<BankAccount> {
  const BankAccountRepository = getRepository(BankAccount);

  await BankAccountRepository.save(item);

  return item;
};

export default {
  create,
  findAll,
  findById,
  findByCode
};
