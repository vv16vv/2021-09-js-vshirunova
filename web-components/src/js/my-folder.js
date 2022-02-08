class MyFolder extends HTMLElement {
    static get observedAttributes() {
        return [NAME, ITEMS]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`MyFolder: attributeChangedCallback: name=${name}, oldValue=${oldValue}, newValue=${newValue}`)
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
        this._folderName.textContent = this._name
    }
    
    _processItems() {
        this._items.forEach(item => {
            let elem
            if(item.hasOwnProperty(ITEMS) && item.items !== null) {
                elem = document.createElement("my-folder")
                elem.setAttribute(NAME, item.name)
                elem.setAttribute(ITEMS, JSON.stringify(item.items))
            } else {
                elem = document.createElement("my-leaf")
                elem.setAttribute(NAME, item.name)
            }
            this._folderContent.append(elem)
        })
    }

    _toggleFolder(event) {
        event.target.classList.toggle("folder__name--opened")
        event.target.classList.toggle("folder__name--closed")
    }

    constructor() {
        super()
        console.log(`MyFolder: constructor`)
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(folder.content.cloneNode(true))
        this._folderName = this.shadowRoot.querySelector('button')
        this._folderContent = this.shadowRoot.querySelector('ul')
    }
    
    connectedCallback() {
        this._folderName.addEventListener('click', this._toggleFolder)
    }
    
    disconnectedCallback() {
        this._folderName.removeEventListener('click', this._toggleFolder)
    }

    get name() {
        console.log(`get name`)
        return this._name
    }

    set name(name) {
        console.log(`set name`)
        this.setAttribute(NAME, name)
    }

    get items() {
        console.log(`get items`)
        return this._items
    }

    set items(items) {
        console.log(`set items`)
        this.setAttribute(ITEMS, items)
    }
}

window.customElements.define('my-folder', MyFolder);
