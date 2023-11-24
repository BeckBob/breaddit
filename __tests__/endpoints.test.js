const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const endPoints = require('../endpoints.json');
const sorted = require('jest-sorted');


beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    return db.end();
  });
  
  
  describe("api/topics", () => {
      test("status check responds 200 amd their are the correct keys in topics array and correct length", () => {
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

describe("GET /api/articles/:article_id", () => {
    test("200: and an article object with the correct properties", () => {
        return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({body}) => {
        
            const article = body
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String) 
            })     
            });
        })
    test("404: Not Found when article number doesn't exist", () => {
        return request(app)
        .get("/api/articles/32")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })
    test("400: Bad request when given invalid article ID", () => {
        return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    })
})

describe("/api/articles", () => {
    test("200: returns object with all the articles", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body}) => {
            const articles = body.body
            const size = Object.keys(articles[0]).length;
            expect(size).toBe(8)
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })
            })
        })
    })
    test("articles appear in descending order", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body}) => {
            const articles = body.body
            expect(articles).toBeSortedBy('article_id', {
                descending: true,
              });
        })
    })
    
})

describe("/api/articles/:article_id/comments", () => {
    test("200: returns with and array of comments with correct keys for article with specific ID", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({body}) => {
            const comments = body.comments
            const size = Object.keys(comments).length;
            expect(size).toBe(11)
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    author: expect.any(String),
                })
            })
        })
    })
    test("articles appear in descending order", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({body}) => {
            const comments = body.comments
            expect(comments).toBeSortedBy('comment_id', {
                descending: true,
              });
        });
    });
    test("404: check error message is correct when article number doesn't exist", () =>{
        return request(app)
        .get("/api/articles/33/comments ")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        });
    });
    test("400: Bad request when given invalid article ID", () => {
        return request(app)
        .get("/api/articles/banana/comments")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        });
    });
    test("200: when requesting comments on article with no comments return empty array", () => {
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({body}) => {
            expect(body.comments).toEqual([])
        });
    });

});

describe("POST /api/articles/:article_id/comments", () => {
    test("201: when posting comment it responds with the posted comment", () => {
        const newComment = {username: 'rogersop',
                            body: "this is a comment"}
        return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toEqual({
                comment_id: 19,
                article_id: 2,
                body: "this is a comment",
                created_at: expect.any(String),
                votes: 0,
                author: "rogersop",
            });
        });
    });
    test("404: when posting comment on an article that doesnt exist", () => {
        const newComment = {username: 'rogersop',
                            body: "this is a comment"}
        return request(app)
        .post("/api/articles/34/comments")
        .send(newComment)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found");
        });
    });
    test("404: error when posting comment from user that doesn't exist", () => {
        const newComment = {username: 'beckbeck',
                            body: "this is a comment"}
        return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("User Doesn't Exist");
        });
    });
    test("400: Bad Request when given invalid article id", () => {
        const newComment = {username: 'rogersop',
                            body: "this is a comment"}
        return request(app)
        .post("/api/articles/banana/comments")
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request");
        });
    });
    test("400: Bad Request when request body is incomplete", () => {
        const newComment = {username: 'rogersop'}
        return request(app)
        .post("/api/articles/6/comments")
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request");
        });
    });
    test("400: Bad Request when request body has too many properties", () => {
        const newComment = {username: 'rogersop',
                            body: "this is a comment",
                            extra: "extra stuff"}
        return request(app)
        .post("/api/articles/6/comments")
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request");
        });
    });
});

describe("PATCH /api/articles/:article_id", () => {
    test("takes key of inc_votes and increments votes on article by that number, returning the updated article", () => {
        const update = {inc_votes: 1}
        
        return request(app)
        .patch("/api/articles/1")
        .send(update)
        .expect(201)
        .then(({body}) => {
            expect(body.article).toEqual({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 101,
                article_id: 1,
                article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
        
    })
    test("takes key of inc_votes and correctly updates vote key when inc_votes is a negative number", () => {
        const update = {inc_votes: -99}
        
        return request(app)
        .patch("/api/articles/1")
        .send(update)
        .expect(201)
        .then(({body}) => {
            expect(body.article).toEqual({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 1,
                article_id: 1,
                article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
    })
    test("404: when trying to update votes on an article that doesnt exist", () => {
        const update = {inc_votes: 3}
        return request(app)
        .patch("/api/articles/34")
        .send(update)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found");
        });
    });
       test("400: Bad request when key isn't inc_votes", () => {
        const update = {notAkey: 3}
        return request(app)
        .patch("/api/articles/2")
        .send(update)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request");
        });
    });
        test("200: returns updated article having ignored the extra keys", () => {
        const update = {inc_votes: 3,
                        notAkey: 5}
        return request(app)
        .patch("/api/articles/1")
        .send(update)
        .expect(201)
        .then(({body}) => {
            expect(body.article).toEqual({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 103,
                article_id: 1,
                article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
    });
    test("400: Bad request when given invalid article id", () => {
        const update = {inc_votes: 3}
        return request(app)
        .patch("/api/articles/banana")
        .send(update)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request");
        });
    });
})

describe("DELETE /api/comments/:comment_id", () => {
    test("204: deletes the comment with the given comment id", () => {
        return request(app)
        .delete("/api/comments/2")
        .expect(204)
    })
    test("400: Bad Request when given invalid comment id", () => {
        return request(app)
        .delete("/api/comments/banana")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toEqual("Bad Request")
        })
    })
    test("404: Not Found when comment id doesn't exist", () => {
        return request(app)
        .delete("/api/comments/103")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toEqual("Not Found")
        })
    })
})

describe("GET /api/users", () => {
    test("status check responds 200 and responds with object with correct keys and length", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
    .then(({body}) => {
            const users = body.users
             expect(users).toHaveLength(4);
             users.forEach((user) => {
                 expect(user).toMatchObject({
                     username: expect.any(String),
                     name: expect.any(String),
                     avatar_url: expect.any(String),
                 });
    });
});
});
})

describe("GET /api/articles (topic query)", () => {
    test("returns with articles filtered by topic in query", () => {
        return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({body}) => {
            const articles = body.body;
            expect(articles).toHaveLength(12)
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: "mitch",
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })
            })
        })
    })
    test("400: Bad Request when query isn't topic i.e. /api/articles?banana=mitch", () =>{
        return request(app)
        .get("/api/articles?banana=cats")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    })
    test("404: Not Found when topic doesn't exist i.e. /api/articles?topic=sharon", () =>{
        return request(app)
        .get("/api/articles?topic=sharon")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })
    test("200: empty array for when topic exists but there are no articles linked to it", () =>{
        return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({body}) => {
            expect(body.body).toEqual([])
        })
    })
})

describe("GET /api/articles/:article_id ADD COMMENT_COUNT", () => {
    test("200: returns with article including comment_count", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
            const article = body
            expect(article.comment_count).toBe(11)
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                comment_count: expect.any(Number),
                votes: expect.any(Number),
                article_img_url: expect.any(String), 
            })     
            });
       
        
    })
    test("200: when article has no comments returns with article including comment_count at 0", () => {
        return request(app)
        .get("/api/articles/8")
        .expect(200)
        .then(({body}) => {
            const article = body
            expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                comment_count: 0,
                votes: expect.any(Number),
                article_img_url: expect.any(String), 
            })     
            });
    })
    
})