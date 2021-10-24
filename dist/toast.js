//
// toast.js - A simple, pure JS toast/popup library for JS
//

const toastStyles = document.createElement('style')
toastStyles.innerHTML = `
.toast {
  background-color: #444;
  position: fixed;
  z-index: 50;
  padding: 1rem;
  box-shadow: 0.2rem 0.5rem 0.8rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  cursor: default;
}
.toastShown {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s linear;
}
.toastHidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.5s, opacity 0.3s linear;
}`
document.body.appendChild(toastStyles)

// Show a toast message
export function showToast(message, duration = 2000, pos = 'top-center') {
  const toast = document.createElement(`div`)
  //toast.id = `toast_${Math.random()}`
  toast.classList.add(`toast`)
  toast.classList.add(`toastHidden`)
  toast.innerHTML = message
  toast.addEventListener('click', () => {
    toast.classList.add(`toastHidden`)
  })

  document.body.appendChild(toast)

  switch (pos) {
    case 'top-center':
      toast.style.top = '2rem'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
      break
    case 'top-right':
      toast.style.top = '2rem'
      toast.style.right = '2rem'
      break
    case 'top-left':
      toast.style.top = '2rem'
      toast.style.left = '2rem'
      break
    case 'bottom-center':
      toast.style.bottom = '2rem'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
      break
    case 'bottom-right':
      toast.style.bottom = '2rem'
      toast.style.right = '2rem'
      break
    case 'bottom-left':
      toast.style.bottom = '2rem'
      toast.style.left = '2rem'
      break
    default:
      toast.style.top = '2rem'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
  }

  // Show the toast
  toast.classList.replace('toastHidden', 'toastShown')
  // Set a timeout to hide the toast
  setTimeout(function () {
    toast.classList.replace('toastShown', 'toastHidden')
    // Remove from the DOM *after* fading out
    setTimeout(function () {
      document.body.removeChild(toast)
    }, 1000)
  }, duration)
}
