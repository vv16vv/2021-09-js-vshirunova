const jsdom = require("jsdom")
const getPath = require("./js-03-01")

describe("getPath should return null", () => {
    const html = "<html lang='ru'>\n" +
        "<head>\n" +
        "  <title>Hello</title>\n" +
        "</head>\n" +
        "<body>\n" +
        "</body>\n" +
        "</html>"

    it("for html", () => {
        const doc = (new jsdom.JSDOM(html)).window.document
        const el = doc.querySelector("html")
        const actual = getPath(el)
        expect(actual).toBeNull()
    })
    it("for out-of-body tags - head", () => {
        const doc = (new jsdom.JSDOM(html)).window.document
        const el = doc.querySelector("head")
        const actual = getPath(el)
        expect(actual).toBeNull()
    })
    it("for out-of-body tags - head title", () => {
        const doc = (new jsdom.JSDOM(html)).window.document
        const el = doc.querySelector("title")
        const actual = getPath(el)
        expect(actual).toBeNull()
    })
})