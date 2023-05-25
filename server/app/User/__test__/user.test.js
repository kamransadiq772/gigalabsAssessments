const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../../../index')
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});
describe("GET /api/user", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/api/user");
        expect(res.statusCode).toBe(200);
    });
});
describe("POST /api/user/login", () => {
    it("should return invalid data of login", async () => {
        const res = await request(app).post("/api/user/login").send({
            email: "kamransadiq6783468@gamgmail.com",
            password: "1234"
        });
        expect(res.statusCode).toBe(409);
    });
});
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});
