/**
 * @jest-environment jsdom
 */
const getPath = require("./js-03-01")

const testSelectorIsUnique = ({innerHTML: expectedText}, selector) => {
    const elements = document.querySelectorAll(selector)
    expect(elements).toHaveLength(1)

    const actualText = elements[0].innerHTML
    expect(actualText).toBe(expectedText)
}

describe("getPath should return", () => {
    it("body path for body", () => {
        document.body.innerHTML = "\n" +
            "  <h1>Header</h1>\n" +
            "  <p id='p1'>Abc</p>\n"
        const el = document.querySelector("body")
        const actual = getPath(el)
        expect(actual).toBe("body")
        testSelectorIsUnique(el, actual)
    })
    it("path with class name if exist", () => {
        document.body.innerHTML = "\n" +
            "  <h1 class='title'>Header</h1>\n" +
            "  <p id='p1'>Abc</p>\n"
        const el = document.querySelector("h1")
        const actual = getPath(el)
        expect(actual).toBe("body h1.title")
        testSelectorIsUnique(el, actual)
    })
    it("path with all class names if exist", () => {
        document.body.innerHTML = "\n" +
            "  <h1 class='title main'>Header</h1>\n" +
            "  <p id='p1'>Abc</p>\n"
        const el = document.querySelector("h1")
        const actual = getPath(el)
        expect(actual).toBe("body h1.title.main")
        testSelectorIsUnique(el, actual)
    })
    it("path with only id if there is the unique id", () => {
        document.body.innerHTML = "\n" +
            "  <p id='p1'>Abc</p>\n"

        const el = document.querySelector("p")
        const actual = getPath(el)
        expect(actual).toBe("#p1")
        testSelectorIsUnique(el, actual)
    })
    it("path with parent's only id if there is the unique id", () => {
        document.body.innerHTML = "\n" +
            "  <div id='p1'>" +
            "    <p>Abc</p>\n" +
            "  </div>"

        const el = document.querySelector("p")
        const actual = getPath(el)
        expect(actual).toBe("#p1 p")
        testSelectorIsUnique(el, actual)
    })
    it("full path with id if there are several the same ids", () => {
        document.body.innerHTML = "\n" +
            "  <p id='p1'>Abc</p>\n" +
            "  <div id='p1'>Des</div>\n"
        const el = document.querySelector("p")
        const actual = getPath(el)
        expect(actual).toBe("body p#p1")
        testSelectorIsUnique(el, actual)
    })
    it("path with both class and id if there are several the same ids", () => {
        document.body.innerHTML = "\n" +
            "  <ul id='list' class='items'>" +
            "    <li id='list'>yellow</li>\n" +
            "  </ul>\n"
        const el = document.querySelector("ul")
        const actual = getPath(el)
        expect(actual).toBe("body ul#list.items")
        testSelectorIsUnique(el, actual)
    })
    it("path with first-child if the searched element the very first child and there are other the same tags" +
        " later", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <div>extra div</div>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <li>brown</li>\n" +
            "  </ul>\n"
        const el = document.querySelector("li")
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:first-child")
        testSelectorIsUnique(el, actual)
    })
    it("path with first-of-type if the searched element the first child with the same tag but not first child at" +
        " all", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <div>extra div</div>\n" +
            "    <li>yellow</li>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <li>brown</li>\n" +
            "  </ul>\n"
        const el = document.querySelector("li")
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:first-of-type")
        testSelectorIsUnique(el, actual)
    })
    it("path with nth-child if there are the same tags before the searched element but not last child at all", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <li>brown</li>\n" +
            "  </ul>\n"
        const el = document.getElementsByTagName("li")[2]
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:nth-child(3)")
        testSelectorIsUnique(el, actual)
    })
    it("path with nth-of-type if there are the same tags not one by another before the searched element and not" +
        " last child at all", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <div>extra div</div>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <li>brown</li>\n" +
            "  </ul>\n"
        const el = document.getElementsByTagName("li")[2]
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:nth-of-type(3)")
        testSelectorIsUnique(el, actual)
    })
    it("path with last-child if the searched element is the last child at all and there are the same tags before", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <div>extra div</div>\n" +
            "    <li>brown</li>\n" +
            "  </ul>\n"
        const el = document.getElementsByTagName("li")[3]
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:last-child")
        testSelectorIsUnique(el, actual)
    })
    it("path with last-of-type if the searched element is the last tag, but there are other tags too", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <li>red</li>\n" +
            "    <li>green</li>\n" +
            "    <li>brown</li>\n" +
            "    <div>extra div</div>\n" +
            "  </ul>\n"
        const el = document.getElementsByTagName("li")[3]
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li:last-of-type")
        testSelectorIsUnique(el, actual)
    })
    it("path nth-child + class", () => {
        document.body.innerHTML = "\n" +
            "  <ul class='items'>" +
            "    <li>yellow</li>\n" +
            "    <li class='color'>red</li>\n" +
            "    <li class='color'>green</li>\n" +
            "    <li>brown</li>\n" +
            "    <div>extra div</div>\n" +
            "  </ul>\n"
        const el = document.getElementsByTagName("li")[1]
        const actual = getPath(el)
        expect(actual).toBe("body ul.items li.color:nth-child(2)")
        testSelectorIsUnique(el, actual)
    })
})