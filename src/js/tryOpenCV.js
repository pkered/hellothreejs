export function tryOpenCV(element) {
  document.getElementById('opencv-appbody').classList.remove('hidden');
  const video = document.getElementById("videoInput")
  const videoBtn = document.getElementById("startvideo-button")
  const captureBtn = document.getElementById("capture-button")
  captureBtn.classList.remove('hidden')

  videoBtn.onclick = async () => navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then( stream => {
    video.srcObject = stream
    video.play()
    videoBtn.disabled = true
  })
  .catch( err => console.log('an error occurred while streaming video', err))

  // captureBtn.onclick = () =>
}
