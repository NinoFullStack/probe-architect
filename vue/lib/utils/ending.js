export default () => {
  let counter = 0

  function endModal() {
    document.querySelector('.overlay').classList.add('active')
    document.querySelector('.modalFinal').classList.add('active')
  }

  document.querySelector('.end-button').addEventListener('click', endModal)

  document
    .querySelector('.popup__close-btn')
    ?.addEventListener('click', function () {
      var popup = document.querySelector('.popup')
      document.querySelector('.popup').classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    })

  function appearBubble(classname) {
    document.querySelector(classname).classList.add('active')
  }

  while (counter < 5) {
    let classname = '.s' + counter
    setTimeout(() => appearBubble(classname), counter * 1000)
    counter++
  }
}
