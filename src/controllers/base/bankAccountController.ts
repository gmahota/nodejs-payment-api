import { Request, Response } from "express";

import BankAccountService from "../../services/base/bankAccount";
import BankService from "../../services/base/bank";
import CompanyService from "../../services/base/company";

import BankAccount from "../../models/base/bankAccount";


export const get_all = async (
    request: Request,
    response: Response,
) => {
    const Customer = await BankAccountService.getAll();
    return response.status(200).json(Customer);
};

export const get_bankAccount = async (request: Request, response: Response) => {
    const { id } = request.params;

    const item = await BankAccountService.getById(id);

    if (item) {
        return response.status(200).json(item);
    }
    return response.status(404).json(
        { msg: "no Customer with that phoneNumber" },
    );
};

export const create_bankAccount = async (request: Request, response: Response) => {
    const {
        code,
        name,
        number,
        nib,
        swift,
        iban,
        accountManager,
        accountManagerDetails,
        productType,
        currency,
        branch,
        openingDate,
        currentBalance,
        bankCode,
        companyId
    } = await request.body;

    try {

        let item: BankAccount = {
            id: 0,
            code,
            name,
            number,
            nib,
            swift,
            iban,
            accountManager,
            accountManagerDetails,
            productType,
            currency,
            branch,
            openingDate,
            currentBalance
        };

        if (!!companyId) {
            item.Company = await CompanyService.getById(companyId);
        }

        if (!!bankCode) {
            item.Bank = await BankService.getByCode(bankCode);
        }

        item = await BankAccountService.create(item);

        return response.status(200).json(item);
    } catch (e) {
        return response.status(404).json(
            { msg: "error to create a Customer with that i", error: e },
        );
    }
};

export const delete_customer = async (request: Request, response: Response) => {
    return response.status(500).json(
        { msg: "not Implemented" },
    );
    const { id } = request.body;

    try {
        //await Customerervice.remove(id);

        return response.send(200).json({ id: id });
    } catch (e) {
        return response.send(404).json(
            { msg: "error to create a order with that i" },
        );
    }
};
