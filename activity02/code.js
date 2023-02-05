// Add one to the number of visits. It gets coerced into 0 if it's null.
localStorage.setItem('visitas', +localStorage.getItem('visitas') + 1)
// Display de number of visits.
document.getElementById('num').textContent = localStorage.getItem('visitas')
// Resets the number of visits when clicked.
document.getElementById('reset').onclick = () => {
  localStorage.removeItem('visitas'),
    location.reload()
}
