import { inject } from 'vue'

export default () => {
  const translate = inject('translate')
  const media = inject('media')

  let counter = 0
  const wrongs = [1, 2, 5, 7]
  let corrAnsw = 'btn-outline-success'
  let answearEmptyElements
  let localCounter = 0

  const questions = [
    translate('Что вы обычно делаете в парках?'),
    translate('Как зовут ваших домашних питомцев?'),
    translate('Хотите ли вы уехать из города?'),
    translate('Как сейчас используется выбранная территория?'),
    translate(
      'Какие особо значимые места и ценные объекты есть на территории и рядом с ней?'
    ),
    translate(
      'Какого музыкального исполнителя вы бы пригласили на открытие парка?'
    ),
    translate('Какие основные проблемы характерны для выбранной территории?'),
    translate('Какую вы предпочитаете кухню?'),
    translate('Чего не хватает на данной территории?'),
  ]

  function setQuestion(n) {
    if (n < questions.length) {
      document.querySelector('.oprosNum').textContent =
      translate('Вопрос ') + (n + 1) + translate(' из 9')
    }
    document.querySelector('.oprosQuestion').textContent = questions[n]
    switch (n) {
      case 7:
        document
          .querySelector('#questionBg')
          .setAttribute('src', media('./img/questionBg2.png'))
        document
          .querySelector('.quest-content')
          .classList.add('quest-content_pos1')
        break
      case 8:
        document
          .querySelector('#questionBg')
          .setAttribute('src', media('./img/questionBg3.png'))
        document
          .querySelector('.quest-content')
          .classList.remove('quest-content_pos1')
        document
          .querySelector('.quest-content')
          .classList.add('quest-content_pos2')
        break
    }
  }

  function wrongAnswer() {
    document.querySelector('.popup').classList.add('_opened')
    var popup = document.querySelector('.popup')
    window.setTimeout(function () {
      popup.classList.add('clickable')
    }, 5)
  }

  document
    .querySelector('.popup__close-btn')
    .addEventListener('click', function () {
      var popup = document.querySelector('.popup')
      document.querySelector('.popup').classList.remove('_opened')
      window.setTimeout(function () {
        popup.classList.remove('clickable')
      }, 5)
    })

  document.addEventListener('click', function (e) {
    var popup = document.querySelector('.popup')
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
    var popup = document.querySelector('.popup')
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

  setQuestion(counter)

  document.querySelectorAll('.btn-answear').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (counter < questions.length) {
        if (this.classList.contains(corrAnsw)) {
          if (!wrongs.includes(counter)) {
            let answearEmptyElements =
              document.querySelectorAll('.answear_empty')
            localCounter = localCounter + 1

            let newContent =
              '<div class="answear__num">' +
              localCounter +
              '.</div>' +
              '<div class="answear__text">' +
              questions[counter] +
              '</div>'
            answearEmptyElements[0].innerHTML = newContent
            answearEmptyElements[0].classList.remove('answear_empty')
          }
          counter++
          if (counter == 9) {
            document.querySelector('.oprosGo').style.display = 'none'
            document.querySelector('.oprosFinish').classList.remove('hidden')
          }
          setQuestion(counter)
          if (wrongs.includes(counter)) {
            corrAnsw = 'btn-outline-danger'
          } else {
            corrAnsw = 'btn-outline-success'
          }
        } else {
          wrongAnswer()
        }
      }
    })
  })
}
