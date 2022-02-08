class MyStructure extends HTMLElement {
    static get observedAttributes() {
        return [TREE]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._tree = JSON.parse(newValue)

        const strName = this._tree.name
        const strItems = this._tree.items

        const subtree = document.createElement("my-tree")
        subtree.setAttribute(NAME, strName)
        subtree.setAttribute(ITEMS, JSON.stringify(strItems))
        
        this._treeElement.append(subtree)
    }

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(structure.content.cloneNode(true))
        this._treeElement = this.shadowRoot.querySelector('section[name="tree"] > ul')
    }

    get tree() {
        return this._tree
    }

    set tree(tree) {
        this.setAttribute(TREE, tree)
    }
}

window.customElements.define('my-structure', MyStructure)
