class MyStructure extends HTMLElement {
  static get observedAttributes() {
    return [TREE]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._reset()
    try {
      this._tree = JSON.parse(newValue)
    } catch (e) {
      this._tree = null
    }

    if(this._tree !== null) {
      const strName = this._tree.name
      const strItems = this._tree.items

      const subtree = document.createElement("my-tree")
      subtree.setAttribute(NAME, strName)
      subtree.setAttribute(ITEMS, JSON.stringify(strItems))

      this._treeElement.append(subtree)
    }
  }

  _reset() {
    const myTrees = this._treeElement.querySelectorAll("my-tree")
    myTrees.forEach(tree => tree.remove())
  }

  constructor() {
    super()
    this.attachShadow({mode: "open"})
    this.shadowRoot.appendChild(structure.content.cloneNode(true))
    this._treeElement = this.shadowRoot.querySelector("section[name=\"tree\"] > ul")
  }

  get tree() {
    return this._tree
  }

  set tree(tree) {
    this.setAttribute(TREE, tree)
  }
}

window.customElements.define("my-structure", MyStructure)
