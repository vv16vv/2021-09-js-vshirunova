const TREE = "tree"
const NAME = "name"
const ITEMS = "items"

const contentStyle = `
    padding: 0 1.2em;
    width: max-content;
    list-style-type: none;
    position: relative;
`

const fontStyle = `
    font-family: Tahoma, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5em;
`

const structure = document.createElement("template")
structure.innerHTML = `
    <style>
        .structure {
          ${fontStyle}
        }
        .structure__content {
          ${contentStyle}
        }
    </style>
    <section name="tree" class="structure">
        <ul class="structure__content">
        </ul>
    </section>
`

const tree = document.createElement("template")
tree.innerHTML = `
    <style>
        .tree__content {
          ${contentStyle}
        }
    
        .tree__name {
          position: relative;
          background-color: transparent;
          border: none;

          ${fontStyle}
        }
    
        .tree__name:hover + .tree__content {
          outline: 1px darkblue solid;
          background-color: rgba(173, 216, 230, 0.33);
        }
    
        .tree__name:hover {
          color: darkblue;
          cursor: pointer;
          font-weight: bold;
        }
    
        .tree__name::before {
          position: absolute;
        }
    
        .tree__name--opened + .tree__content {
          display: block;
        }
    
        .tree__name--closed + .tree__content {
          display: none;
        }
    
        .tree__name--opened::before {
          content: "-";
          left: -0.6em;
        }
    
        .tree__name--closed::before {
          content: "+";
          left: -0.8em;
        }
    </style>
    <li>
        <button class="tree__name tree__name--opened" type="button"></button>
        <ul class="tree__content">
        </ul>
    </li>
`

const leaf = document.createElement("template")
leaf.innerHTML = `
  <style>
    .my-leaf {
      color: gray;
      position: relative;
    }

    .my-leaf::before {
      content: ".";
      position: absolute;
      left: -0.5em;
      top: -0.47em;
    }
  </style>
  <li>
    <span class="my-leaf"></span>
  </li>
`