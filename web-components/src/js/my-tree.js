class MyTree extends HTMLElement {
    static get observedAttributes() {
        return [NAME, ITEMS]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === NAME) {
            this._name = newValue
            this._processName()
        }
        else if (name === ITEMS) {
            this._items = JSON.parse(newValue)
            this._processItems()
        }
    }

    _processName() {
        this._treeName.textContent = this._name
    }
    
    _processItems() {
        this._items.forEach(item => {
            let elem
            if(item.hasOwnProperty(ITEMS) && item.items !== null) {
                elem = document.createElement("my-tree")
                elem.setAttribute(NAME, item.name)
                elem.setAttribute(ITEMS, JSON.stringify(item.items))
            } else {
                elem = document.createElement("my-leaf")
                elem.setAttribute(NAME, item.name)
            }
            this._treeContent.append(elem)
        })
    }

    _toggleTree(event) {
        event.target.classList.toggle("tree__name--opened")
        event.target.classList.toggle("tree__name--closed")
    }

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(tree.content.cloneNode(true))
        this._treeName = this.shadowRoot.querySelector('button')
        this._treeContent = this.shadowRoot.querySelector('ul')
    }
    
    connectedCallback() {
        this._treeName.addEventListener('click', this._toggleTree)
    }
    
    disconnectedCallback() {
        this._treeName.removeEventListener('click', this._toggleTree)
    }

    get name() {
        return this._name
    }

    set name(name) {
        this.setAttribute(NAME, name)
    }

    get items() {
        return this._items
    }

    set items(items) {
        this.setAttribute(ITEMS, items)
    }
}

window.customElements.define('my-tree', MyTree);
