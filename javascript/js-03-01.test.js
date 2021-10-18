const jsdom = require("jsdom")
const getPath = require("./js-03-01")

describe("getPath", () => {
    describe("should return null", () => {
        const html = "<html lang='ru'>\n" +
            "<head>\n" +
            "  <title>Hello</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "</body>\n" +
            "</html>"
        const doc = (new jsdom.JSDOM(html)).window.document
        it("for html", () => {
            const el = doc.getElementsByTagName("html")[0]
            const actual = getPath(el)
            expect(actual).toBeNull()
        })
        it("for out-of-body tags - head", () => {
            const el = doc.getElementsByTagName("head")[0]
            const actual = getPath(el)
            expect(actual).toBeNull()
        })
        it("for out-of-body tags - head title", () => {
            const el = doc.getElementsByTagName("title")[0]
            const actual = getPath(el)
            expect(actual).toBeNull()
        })

    })
    describe("should return", () => {
        it("body path for body", () => {
            const html = "<html lang='ru'>\n" +
                "<head>\n" +
                "  <title>Hello</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <h1>Header</h1>\n" +
                "  <p id='p1'>Abc</p>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("body")[0]
            const actual = getPath(el)
            expect(actual).toBe("body")
        })
        it("path with class name if exist", () => {
            const html = "<html lang='ru'>\n" +
                "<head>\n" +
                "  <title>Hello</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <h1 class='title'>Header</h1>\n" +
                "  <p id='p1'>Abc</p>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByClassName("title")[0]
            const actual = getPath(el)
            expect(actual).toBe("body h1.title")
        })
        it("path with only id if there is the unique id", () => {
            const html = "<html lang='ru'>\n" +
                "<head>\n" +
                "  <title>Hello</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <p id='p1'>Abc</p>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("p")[0]
            const actual = getPath(el)
            expect(actual).toBe("#p1")
        })
        it("full path with id if there are several the same ids", () => {
            const html = "<html lang='ru'>\n" +
                "<head>\n" +
                "  <title>Hello</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <p id='p1'>Abc</p>\n" +
                "  <div id='p1'>Des</div>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("p")[0]
            const actual = getPath(el)
            expect(actual).toBe("body p#p1")
        })
        it("path with both class and id if there are several the same ids", () => {
            const html = "<html lang='ru'>\n" +
                "<head>\n" +
                "  <title>Hello</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <ul id='list' class='items'>" +
                "    <li id='list'>yellow</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("ul")[0]
            const actual = getPath(el)
            expect(actual).toBe("body ul#list.items")
        })
        it("path with first-child if the searched element the very first child and there are other the same tags" +
            " later", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <li>yellow</li>\n" +
                "    <div>extra div</div>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <li>brown</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[0]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:first-child")
        })
        it("path with first-of-type if the searched element the first child with the same tag but not first child at" +
            " all", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <div>extra div</div>\n" +
                "    <li>yellow</li>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <li>brown</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[0]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:first-of-type")
        })
        it("path with nth-child if there are the same tags before the searched element but not last child at all", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <li>yellow</li>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <li>brown</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[2]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:nth-child(3)")
        })
        it("path with nth-of-type if there are the same tags not one by another before the searched element and not" +
            " last child at all", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <li>yellow</li>\n" +
                "    <div>extra div</div>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <li>brown</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[2]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:nth-of-type(3)")
        })
        it("path with last-child if the searched element is the last child at all and there are the same tags before", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <li>yellow</li>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <div>extra div</div>\n" +
                "    <li>brown</li>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[3]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:last-child")
        })
        it("path with last-of-type if the searched element is the last tag, but there are other tags too", () => {
            const html = "<html lang='ru'>\n" +
                "<body>\n" +
                "  <ul class='items'>" +
                "    <li>yellow</li>\n" +
                "    <li>red</li>\n" +
                "    <li>green</li>\n" +
                "    <li>brown</li>\n" +
                "    <div>extra div</div>\n" +
                "  </ul>\n" +
                "</body>\n" +
                "</html>"
            const doc = (new jsdom.JSDOM(html)).window.document

            const el = doc.getElementsByTagName("li")[3]
            const actual = getPath(el)
            expect(actual).toBe("body ul.items li:last-of-type")
        })
    })
})