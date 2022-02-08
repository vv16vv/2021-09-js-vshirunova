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

const folder = document.createElement("template")
folder.innerHTML = `
    <style>
        .folder__content {
          ${contentStyle}
        }
    
        .folder__name {
          position: relative;
          background-color: transparent;
          border: none;

          ${fontStyle}
        }
    
        .folder__name:hover + .folder__content {
          outline: 1px darkblue solid;
          background-color: rgba(173, 216, 230, 0.33);
        }
    
        .folder__name:hover {
          color: darkblue;
          cursor: pointer;
          font-weight: bold;
        }
    
        .folder__name::before {
          position: absolute;
        }
    
        .folder__name--opened + .folder__content {
          display: block;
        }
    
        .folder__name--closed + .folder__content {
          display: none;
        }
    
        .folder__name--opened::before {
          content: "-";
          left: -0.6em;
        }
    
        .folder__name--closed::before {
          content: "+";
          left: -0.8em;
        }
    </style>
    <li>
        <button class="folder__name folder__name--opened" type="button"></button>
        <ul class="folder__content">
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