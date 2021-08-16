import { Request, Response } from "express";
import BankService from "../../services/base/bank";
import Bank from "../../models/base/bank";

export const get_all = async (
    request: Request,
    response: Response,
) => {
    const Customer = await BankService.getAll();
    return response.status(200).json(Customer);
};

export const get_bank = async (request: Request, response: Response) => {
    const { id } = request.params;

    const item = await BankService.getByCode(id);

    if (item) {
        return response.status(200).json(item);
    }
    return response.status(404).json(
        { msg: "no Customer with that phoneNumber" },
    );
};

export const create_bank = async (request: Request, response: Response) => {
    const {
        code,
        name,
        website,
        address,
        vat,
        province,
        phoneNumber,
        cellphone,
        email
    } = await request.body;

    try {

        let item: Bank = {
            code,
            name,
            website,
            address,
            vat,
            province,
            phoneNumber,
            cellphone,
            email
        };

        item = await BankService.create(item);

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
