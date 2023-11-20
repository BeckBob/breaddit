const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const endPoints = require('../endpoints.json');


beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    return db.end();
  });
  
  
  describe("api/topics", () => {
      test("status check responds 200 amd their are the sorrect keys in topics array and correct length", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
    .then(({body}) => {
            const {topics} = body
             expect(topics).toHaveLength(3);
             topics.forEach((topic) => {
                 expect(topic).toMatchObject({
                     description: expect.any(String),
                     slug: expect.any(String),
                 });
    });
});
});
    test("check error message is correct when making a request that doesn't exist", () =>{
    return request(app)
    .get("/api/banana")
    .expect(404)
    .then(({body}) => {
        expect(body.msg).toBe("Not Found")
    });
});
});

describe("GET /api", () => {
    test("get status code 200 and the json we recieve from link is same as endpoints.json file", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((body) => {
            const jsonEndpoints = body.body.endPoints
            expect(jsonEndpoints).toEqual(endPoints)
        })
    })
})
