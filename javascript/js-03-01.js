// getPath - поиск уникального селектора
//
// Цель:
//     Написать алгоритм и функцию getPath(), находящую уникальный css-селектор для элемента в документе.
//     Уникальный селектор может быть использован в document.querySelector() и возвращать исходный элемент.
//
//     Так чтобы document.querySelectorAll(), вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.
//
//     $0 // HTMLElement
// getPath($0) // => "body div.someclass ul li:first-child"

rootElement = (htmlElement) => {
    let parent = htmlElement
    while (parent.parentElement !== null) {
        parent = parent.parentElement
    }
    return parent
}

hasElementUniqueSelector = (htmlElement, selector) => {
    const root = rootElement(htmlElement)
    const elements = root.querySelectorAll(selector)
    return elements.length === 1
}

getPath = (htmlElement, prev = "") => {
    if (htmlElement.tagName.toLowerCase() === "body") return `body ${prev}`.toLowerCase().trim()
    else if (htmlElement.parentElement === null) return null
    else {
        const idSelector = htmlElement.id !== "" ? `#${htmlElement.id}` : ""
        if (idSelector !== "" && hasElementUniqueSelector(htmlElement, idSelector)) return `${idSelector} ${prev}`.toLowerCase().trim()
        const classNameSelector = htmlElement.className !== "" ? `.${htmlElement.className}` : ""
        // Search for previous tags
        let orderByElements = 0
        let isOneByOne = true
        let orderByTypes = 0
        let currentIndex = 0
        let sibling = htmlElement
        while (sibling.previousElementSibling !== null) {
            sibling = sibling.previousElementSibling
            currentIndex++
            if (sibling.tagName === htmlElement.tagName) {
                if (isOneByOne) {
                    orderByElements++
                }
                orderByTypes++
            } else {
                isOneByOne = false
            }
        }

        // Search for next tags
        sibling = htmlElement
        let otherByElements = false
        let otherByType = false
        let next = true
        while (sibling.nextElementSibling !== null && !otherByElements && !otherByType) {
            sibling = sibling.nextElementSibling
            if (sibling.tagName === htmlElement.tagName) {
                if (next) {
                    otherByElements = true
                }
                otherByType = true
            } else {
                next = false
            }
        }

        // analysis
        /*
        * single element at all (no any siblings): orderByElements = 0, currentIndex = 0, otherXXX = false, next = true
        * first element at all (there are only next siblings): orderByElements = 0, currentIndex = 0, otherXXX = true
        *       otherByElements = true => :first-child
        *       otherByType = true => :first-of-type
        * nth element (there are both some prev & next siblings): orderByElements > 0, currentIndex > 0, otherXXX = true
        *       orderByElements == orderByType == currentIndex => :nth-child(currentIndex + 1)
        *       else => :nth-of-type(orderByType + 1)
        * last element (there are only prev siblings): orderByElements > 0, orderByType > 0, otherXXX = false
        *       orderByElements == orderByType == currentIndex => :last-child
        *       else => :last-of-type
        * */
        let tail
        if (!otherByElements && !otherByType) {
            // no next siblings
            if (currentIndex === 0) {
                // single element, nothing to add
                tail = ""
            } else {
                // there are prev siblings
                tail = next ? ":last-child" : ":last-of-type"
            }
        } else {
            // there are next siblings
            if (currentIndex === 0) {
                // no prev siblings
                tail = ":first-child"
            } else {
                // there are prev siblings
                if (orderByTypes === 0) {
                    tail = ":first-of-type"
                } else {
                    tail = orderByTypes === orderByElements
                        ? `:nth-child(${orderByElements + 1})`
                        : `:nth-of-type(${orderByTypes + 1})`
                }
            }
        }

        const path = `${htmlElement.tagName}${idSelector}${classNameSelector}${tail} ${prev}`
        return getPath(htmlElement.parentElement, path)
    }
}

module.exports = getPath