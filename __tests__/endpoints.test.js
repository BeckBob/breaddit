const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");



beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    return db.end();
  });
  
  
  describe("api/topics", () => {
      test("status check responds 200", () => {
          return request(app)
          .get("/api/topics")
          .expect(200)
    });
      test("status check responds 200", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body.topics).toEqual([
                {
                  description: 'The man, the Mitch, the legend',
                  slug: 'mitch'
                },
                {
                  description: 'Not dogs',
                  slug: 'cats'
                },
                {
                  description: 'what books are made of',
                  slug: 'paper'
                }
              ]);
    });
    });
test("check error message is correct when making a request that doesn't exist", () =>{
    return request(app)
    .get("/api/banana")
    .expect(404)
    .then(({body}) => {
        expect(body.msg).toBe("Not Found")
    })
})
});