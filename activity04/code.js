// Elements.
const info = document.getElementById('info')
/** @type {HTMLVideoElement} */
const video = document.getElementById('video')

// Global variable for the current time in the video.
let time = 0

// Function to transform time in seconds to a string.
function timeToStr(t) {
  const SECONDS = Math.floor(t)
  const MINUTES = Math.floor(SECONDS/60)
  return MINUTES + ":" + SECONDS
}
// Function to display the time and duration of the video in the info element.
function updateInfo() {
  info.textContent = timeToStr(time) + '/' + timeToStr(video.duration)
}

// Listeners nested inside of the 'loadeddata' listener to wait until the video loads. 
video.addEventListener('loadeddata', () => {
  // Local variable to store the interval.
  let interval = NaN

  // Replace the context menu with the info element and update it.
  video.addEventListener('contextmenu', ev => {
    ev.preventDefault()
    info.classList.toggle('hidden')
    updateInfo()
  })

  // Pause/Play video when clicked.
  video.addEventListener('click', ev => {
    ev.preventDefault()
    if (video.paused)
      video.play()
    else
      video.pause()
  })

  // Update the time variable and the info element while the video is playing.
  video.addEventListener('play', ev => {
    interval = setInterval(() => {
      time = video.currentTime        
      updateInfo()
    }, 1000)
  })

  // Stop updating when the video is paused.
  video.addEventListener('pause', ev => {
    clearInterval(interval)
  })
})