const apply = () => {
  const textArea = document.querySelector("textarea")
  const myStructure = document.querySelector("my-structure")
  const message = document.querySelector(".message")

  const errorStyle = "error"

  try {
    JSON.parse(textArea.value)
    myStructure.tree = textArea.value
    textArea.classList.remove(errorStyle)
    message.hidden = true
  } catch (e) {
    if(!textArea.classList.contains(errorStyle)) {
      textArea.classList.add(errorStyle)
    }
    message.hidden = false
    myStructure.tree = ""
  }
}