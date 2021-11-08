/**
 * @jest-environment ./src/database/environment-jest
 */

import {app} from '../../app'
import request from "supertest"

jest.useFakeTimers()
jest.setTimeout(500000)

describe("Create Bank Controller",()=>{
    it("should be able to create a new bank",async()=>{
        const response = await request(app)
            .post("/api/banks")
            .send({ 
                code:"BIM",
                name:"BANK Internacional",
            })
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("code");
    });

    it("should not be able to create an existing bank", async () => {     

        await request(app)
            .post("/api/banks")
            .send({
                code: "FNB",
                name: "First National"
            })
        
        const response = await request(app)
            .post("/api/banks")
            .send({
                code: "FNB",
                name: "First National"
            })

        expect(response.status).toBe(400);
    })
})