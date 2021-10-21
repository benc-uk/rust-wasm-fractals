const toast = document.createElement(`div`)
toast.id = `toast`
toast.classList.add(`toastHidden`)
document.body.appendChild(toast)

const toastStyles = document.createElement('style')
toastStyles.innerHTML = `
#toast {
  background-color: #444;
  position: fixed;
  min-width: 250px;
  margin-left: -125px;
  top: 10%;
  left: 50%;
  padding: 0.5rem;
  box-shadow: 0.2rem 0.5rem 0.8rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
}
.toastShown {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s linear;
}
.toastHidden {
  visibility: visible !important;
  opacity: 0;
  transition: visibility 0s 0.5s, opacity 0.3s linear;
}`
document.body.appendChild(toastStyles)

// show a toast message
export function showToast(message, duration) {
  toast.innerHTML = message
  toast.classList.replace('toastHidden', 'toastShown')
  setTimeout(function () {
    toast.classList.replace('toastShown', 'toastHidden')
  }, duration)
}
