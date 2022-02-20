import {JSDOM} from "jsdom"
import {getPath} from "./js-03-01"

describe("getPath should return null", () => {
    const html = "<html lang='ru'>\n" +
        "<head>\n" +
        "  <title>Hello</title>\n" +
        "</head>\n" +
        "<body>\n" +
        "</body>\n" +
        "</html>"

    it("for html", () => {
        const doc: Document = (new JSDOM(html)).window.document
        const el: HTMLElement = doc.querySelector("html")
        const actual: string = getPath(el)
        expect(actual).toBeNull()
    })
    it("for out-of-body tags - head", () => {
        const doc: Document = (new JSDOM(html)).window.document
        const el: HTMLElement = doc.querySelector("head")
        const actual: string = getPath(el)
        expect(actual).toBeNull()
    })
    it("for out-of-body tags - head title", () => {
        const doc: Document = (new JSDOM(html)).window.document
        const el: HTMLElement = doc.querySelector("title")
        const actual: string = getPath(el)
        expect(actual).toBeNull()
    })
})