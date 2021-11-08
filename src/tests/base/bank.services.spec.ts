import "reflect-metadata";
import Bank from '../../models/base/bank';
import BankService from "../../services/base/bank";

import connection from '../../utils/connection';

jest.setTimeout(500000)

describe("Create Bank", () => {

    beforeAll(async () => {

        await connection.create();
    });

    afterAll(async () => {
        try {
            await connection.close();
        } catch (e) { }
    });

    beforeEach(async () => {
        try {
            await connection.clear();
        } catch (e) { }

    });

    it("should be able to create a new bank", async () => {

        let bankData: Bank = {
            code: "BMI",
            name: "BMI"
        };

        const bank = await BankService.create(bankData);

        expect(bank).toHaveProperty("code");
        expect(bank.code).toBe(bankData.code);
    })

    it("should not be able to create an existing bank", async () => {
        let bankData: Bank = {
            code: "BMA",
            name: "BMA"
        };
        await BankService.create(bankData);
        
        await expect(BankService.create(bankData))
            .rejects
            .toEqual( new Error("Bank already exists"));
    })
})