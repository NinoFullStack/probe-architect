import { inject } from 'vue'

export default () => {
  const translate = inject('translate')
  const media = inject('media')

  let counter = 0
  let popup = document.querySelector('.popup')

  fadeInSpeech(0)

  function wrongAnswer() {
    popup.classList.add('_opened')
    window.setTimeout(function () {
      popup.classList.add('clickable')
    }, 5)
  }

  document
    .querySelector('.popup__close-btn')
    .addEventListener('click', function () {
      popup.classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    })

  document.addEventListener('click', function (e) {
    if (
      !e.target.closest('.popup') &&
      popup.classList.contains('_opened') &&
      popup.classList.contains('clickable')
    ) {
      popup.classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    }
  })

  document.addEventListener('keydown', function (event) {
    var popupFinished = document.querySelector('.popup-finished')

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

  function fadeInSpeech(n) {
    let classname = '.s' + n
    document.querySelector(classname).classList.add('showed')
  }

  function fadeOutSpeech(n) {
    let classname = '.s' + n
    document.querySelector(classname).classList.remove('showed')
  }

  function totalWindow() {
    document.querySelector('.overlay').classList.add('active')
    document.querySelector('.totalWindow').classList.add('active')
  }

  function changeProgCount(n) {
    document.querySelector('.progCount').textContent = n + '/6'
  }

  function updateHappy(n) {
    document
      .querySelector('.happyIndex')
      .setAttribute('src', media('./img/happy' + (n + 1) + '.png'))
    if (n + 1 == 3) {
      document.querySelector('.happyState').textContent =
        translate('Уже лучше...')
      document.querySelector('.happyState').style.color = 'orange'
    }
    if (n + 1 == 5) {
      document.querySelector('.happyState').textContent =
        translate('Все довольны!')
      document.querySelector('.happyState').style.color = translate('green')
    }
  }

  document.querySelectorAll('.btn-warning').forEach(function (btn) {
    btn.addEventListener('click', function () {
      let classname = 'a' + counter
      if (this.classList.contains(classname)) {
        if (counter < 5) {
          fadeOutSpeech(counter)
          updateHappy(counter)
          counter++
          changeProgCount(counter)
          fadeInSpeech(counter)
          this.disabled = true
        } else {
          fadeOutSpeech(counter)
          updateHappy(counter)
          counter = 5
          changeProgCount(counter)
          fadeInSpeech(counter)
          this.disabled = true
          document
            .querySelector('.speech-bubble_last')
            .classList.remove('showed')

          setTimeout(() => totalWindow(), 2000)
        }
      } else {
        wrongAnswer()
      }
    })
  })
}
