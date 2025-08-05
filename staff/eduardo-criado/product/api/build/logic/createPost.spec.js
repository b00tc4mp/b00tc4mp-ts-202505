import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { createPost } from "./createPost.js";
import { PostRepository } from "../data/repository/sql/PostRepository.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { ValidationError } from "com";
const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } = process.env;
describe("createPost", () => {
    before(() => connect(MONGO_URL));
    // beforeEach(() =>
    //   Promise.all([PostRepository.removeAll(), UserRepository.removeAll()])
    // );
    beforeEach(async () => {
        await PostRepository.removeAll();
        await UserRepository.removeAll();
    });
    it("creates a new post from a valid user", () => {
        return UserRepository.save({
            id: "123456789012345678901234",
            name: "John Mikel",
            email: "jmike@me.com",
            username: "jmikel",
            password: "password",
            avatar: "http://image.com/avatar",
        })
            .then(() => {
            return createPost("123456789012345678901234", // authorId
            "Post Title", "Post Description", "http://image.com/post");
        })
            .then(() => {
            return PostRepository.findAll().then((posts) => {
                expect(posts).to.have.lengthOf(1);
                expect(posts[0].author).to.equal("123456789012345678901234");
                expect(posts[0].title).to.equal("Post Title");
                expect(posts[0].description).to.equal("Post Description");
                expect(posts[0].image).to.equal("http://image.com/post");
                expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
            });
        });
    });
    it("fails on invalid user id format", () => {
        let errorThrown;
        try {
            /* @ts-ignore */
            createPost("", "Post Title", "Post Description", "http://image.com/post");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.exist;
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id format");
        }
    });
    it("fails on invalid title type", () => {
        let errorThrown;
        try {
            createPost("123456789012345678901234", 
            /* @ts-ignore */
            undefined, "Post Description", "http://image.com/post");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.exist;
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid title type");
        }
    });
    it("fails on invalid title min length", () => {
        let errorThrown;
        try {
            createPost("123456789012345678901234", "", "Post Description", "http://image.com/post");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.exist;
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid title min length");
        }
    });
    it("fails on invalid title max length", () => {
        let errorThrown;
        try {
            createPost("123456789012345678901234", "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890", "Post Description", "http://image.com/post");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.exist;
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid title max length");
        }
    });
    it("fails on invalid description type", () => {
        let errorThrown;
        try {
            createPost("123456789012345678901234", "Post Title", 
            /* @ts-ignore */
            undefined, "http://image.com/post");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.exist;
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid description type");
        }
    });
    after(() => disconnect());
});
//# sourceMappingURL=createPost.spec.js.map
//# sourceMappingURL=createPost.spec.js.map