const request = require("supertest")
const app = require("../app")
const expect = require("chai").expect;

describe("GET /", function () {
    it("returns the home page", async function () {
        const response = await request(app).get("/");
        expect(response.status).to.eql(200);
        // check if the html page contains the text "Welcome to Express"
        expect(response.text).to.contain("Welcome to Express");
    });

    it("returns the status of the service", async function () {
        const response = await request(app).get("/status");
        expect(response.status).to.eql(200);
        expect(response.body.service).to.eql("vermittler");
        expect(response.body.version).to.eql("0.9");
    });
});

