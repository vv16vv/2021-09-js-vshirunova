class MyLeaf extends HTMLElement {
    static get observedAttributes() {
        return [NAME];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._name = newValue;
        this._fileName.textContent = this._name
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this.setAttribute('name', name);
        this.render();
    }

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(leaf.content.cloneNode(true))
        this._fileName = this.shadowRoot.querySelector('span')
    }
}

window.customElements.define('my-leaf', MyLeaf);