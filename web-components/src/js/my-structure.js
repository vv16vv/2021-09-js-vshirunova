class MyStructure extends HTMLElement {
    static get observedAttributes() {
        return [TREE]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`MyStructure: attributeChangedCallback: name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
        this._tree = JSON.parse(newValue)

        const strName = this._tree.name
        const strItems = this._tree.items

        const folder = document.createElement("my-folder")
        folder.setAttribute(NAME, strName)
        folder.setAttribute(ITEMS, JSON.stringify(strItems))
        
        this._treeElement.append(folder)
    }

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(structure.content.cloneNode(true))
        this._treeElement = this.shadowRoot.querySelector('section[name="tree"] > ul')
    }

    get tree() {
        console.log(`get tree`)
        return this._tree
    }

    set tree(tree) {
        console.log(`set tree`)
        this.setAttribute(TREE, tree)
    }
}

window.customElements.define('my-structure', MyStructure)
