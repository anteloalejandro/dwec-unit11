// Get all the necessary elements
const list = document.getElementById('lista')
const submit = document.getElementById('mas')
const textbox = document.getElementById('tarea')

// Function save to the list's HTML
function saveList() {
  localStorage.setItem('list', JSON.stringify(list, ['innerHTML']))
}

// Replace the current list's HTML when the page loads if a saved one exists
const oldList = localStorage.getItem('list') 
if (oldList)
  list.innerHTML = JSON.parse(oldList).innerHTML

// When clicking on the '+' button...
submit.addEventListener('click', ev => {
  ev.preventDefault() // Keeps the page from reloading

  // Create a new element and give it the value of the input field
  const li = document.createElement('li')
  li.textContent = textbox.value

  // Create a new button and append it to the new element
  const remove = document.createElement('a')
  remove.textContent = 'remove'
  li.appendChild(remove)

  // Check if the task already exists. If it does, don't add it.
  for (const child of [...list.children]) {
    if (li.textContent === child.textContent) {
      textbox.style.outline = "solid red"
      var tmp = setTimeout(() => {
        textbox.style.outline = "unset"
        clearTimeout(tmp)
      }, 2000)
      return
    }
  }

  // Append the new element to the list.
  list.appendChild(li)

  // Sort the children alphabetically
  const children = [...list.children]
  children.sort((a, b) =>
    a.textContent.localeCompare(b.textContent))
  list.replaceChildren(...children)

  // Save the new list and clear the value of the input field.
  saveList()
})

// When clicking on the list...
list.addEventListener('click', ev => {
  // Remove the list entry if the remove button was clicked.
  if (ev.target.tagName === 'A') {
    ev.target.parentNode.remove()
  }
  saveList()
})