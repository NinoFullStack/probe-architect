export default () => {
  let stageNum = 0
  let speechCounter = 0

  function correctAnswer() {
    document.querySelector(`.stage${stageNum}`).classList.remove('active')
    let endSpeech = 0
    stageNum++
    let classname = `.stage${stageNum}`
    setTimeout(() => {
      document.querySelector(classname).classList.add('active')
    }, 1000)
    switch (stageNum) {
      case 1:
        endSpeech = 5
        break
      case 2:
        endSpeech = 7
        break
      case 3:
        endSpeech = 9
        break
      case 4:
        endSpeech = 11
        break
    }
    showSpeech(speechCounter, endSpeech)
  }

  document.querySelectorAll('li.correct').forEach(item => {
    item.addEventListener('click', correctAnswer)
  })

  function wrongAnswer() {
    let popup = document.querySelector('.popup')
    popup.classList.add('_opened')
    window.setTimeout(function () {
      popup.classList.add('clickable')
    }, 5)
  }

  document.querySelectorAll('.wrong').forEach(item => {
    item.addEventListener('click', wrongAnswer)
  })

  document
    .querySelector('.popup__close-btn')
    .addEventListener('click', function () {
      let popup = document.querySelector('.popup')
      popup.classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    })

  document.addEventListener('click', function (e) {
    let popup = document.querySelector('.popup')

    if (
      !e.target.closest('.popup') &&
      popup?.classList?.contains('_opened') &&
      popup?.classList?.contains('clickable')
    ) {
      popup.classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    }
  })

  document.addEventListener('keydown', function (event) {
    let popup = document.querySelector('.popup')
    let popupFinished = document.querySelector('.popupFinished')

    if (
      popup.classList.contains('_opened') ||
      popupFinished.classList.contains('_opened')
    ) {
      if (event.key == 'Escape') {
        popup.classList.remove('_opened')
        window.setTimeout(function () {
          popup.classList.remove('clickable')
        }, 5)
      }
    }
  })

  function showOneSpeech(classname) {
    document.querySelector(classname).style.display = 'block'
    document.querySelector(classname).classList.add('active')
  }

  function showSpeech(startNum, n) {
    let counter = startNum
    let secondCounter = 0
    while (startNum < n) {
      let classname = `.r${startNum}`
      setTimeout(() => showOneSpeech(classname), secondCounter * 1000)
      secondCounter++
      speechCounter++
      startNum++
      counter++
    }
  }

  showSpeech(speechCounter, 3)
}
