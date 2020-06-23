const request = require("supertest");
const server = require("../api/server.js");

const db = require("../data/dbConfig.js");

describe("auth-router testing", () => {
  describe("registering a user", () => {
    it("should return 201 ok", () => {
      return db("users")
        .truncate()
        .then(() => {
          return request(server)
            .post("/api/auth/register")
            .send({ email: "TestName@email.com", password: "test" });
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return a JSON object", () => {
      return db("users")
        .truncate()
        .then(() => {
          return request(server)
            .post("/api/auth/register")
            .send({ email: "TestName@email.com", password: "test" });
        })
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
  });

    // Logging in tests

  describe("logging in a user", () => {
    it("should return 200 OK", () => {
      return db("users")
        .truncate()
        .then(() => {
          return request(server)
            .post("/api/auth/register")
            .send({ email: "TestName", password: "test" });
        })
        .then(() => {
          return request(server)
            .post("/api/auth/login")
            .send({ email: "TestName", password: "test" });
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return a JSON object", () => {
      return db("users")
        .truncate()
        .then(() => {
          return request(server)
            .post("/api/auth/register")
            .send({ username: "TestName", password: "test" });
        })
        .then(() => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "TestName", password: "test" });
        })
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
  });
});
