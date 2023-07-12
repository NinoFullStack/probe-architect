import { inject } from 'vue'

export default () => {
  const translate = inject('translate')
  const media = inject('media')

  let counter = 0
  let firstStage = true
  const neccHeaders = [
    translate('Пункт проката'),
    translate('Площадка для собак'),
    translate('Детская площадка'),
    translate('Кафе'),
    translate('Спортивная площадка'),
  ]
  const neccDescrs = [
    translate(
      'Касса, раздевалка с камерами хранения, стоянка для велосипедов под навесом'
    ),
    translate(
      'Газон, барьеры и тоннели, информационный стенд, урна и ограждение'
    ),
    translate(
      'Качели и горки, детский городок, верёвочные подвесные сооружения'
    ),
    translate(
      'Помещение с кухней, водопроводом и газопроводом, летняя веранда с клумбами'
    ),
    translate('Турники, брусья, тренажёры, наклонные скамьи и скалодром'),
  ]

  document.querySelector('.firstStage').style.display = 'block'
  updateHeader(counter)
  updateDescr(counter)

  function updateWriting(n) {
    if (n - 1 !== 5) {
      let avatarPos = ['30px', '30px', '70px', '-30px', '59px', '40px']
      document
        .querySelector('#avik')
        .setAttribute('src', media('./img/avatars/avatar' + n + '.png'))
      document.querySelector('#avik').style.top = avatarPos[n]
      document
        .querySelector('#zapiska')
        .setAttribute('src', media('./img/avatars/writing' + n + '.png'))
    } else {
      let avatarPos = ['30px', '30px', '70px', '-30px', '59px', '40px']
      document.querySelector('#avik').style.display = 'none'
      document.querySelector('#zapiska').style.display = 'none'
    }
  }

  function wrongAnswer() {
    let popup = document.querySelector('.popup')
    popup.classList.add('_opened')
    window.setTimeout(function () {
      popup.classList.add('clickable')
    }, 5)
  }

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

  function selectNeccZone(n) {
    let classname = '.a' + n
    document
      .querySelector(classname)
      .setAttribute('src', media('./img/Zonirovanie/zZone' + n + 'Select.png'))
  }

  function updateCounter(n) {
    let classname = firstStage ? '.necessCount' : '.addCount'
    let totalCount = firstStage ? '2' : '5'
    document.querySelector(classname).textContent = n + '/' + totalCount
  }

  function updateHeader(n) {
    if (n !== 5) {
      document.querySelector('.addZoneHeader').textContent = neccHeaders[n]
    } else {
      document.querySelector('.addZoneHeader').textContent = ''
    }
  }

  function updateDescr(n) {
    if (n !== 5) {
      document.querySelector('.addZoneDescr').textContent = neccDescrs[n]
    } else {
      document.querySelector('.addZoneDescr').textContent = ''
    }
  }

  function firstStagePass() {
    firstStage = false
    document
      .querySelector('.zone0')
      .setAttribute('src', media('./img/Zonirovanie/zZone0Done.png'))
    document
      .querySelector('.zone1')
      .setAttribute('src', media('./img/Zonirovanie/zZone1Done.png'))
    document.querySelector('.neccPart').style.backgroundColor = 'lightgreen'
    document.querySelector('.roads').style.display = 'block'
    document.querySelector('.firstStage').style.display = 'none'
    document.querySelector('.secondStage').style.display = 'block'
    document.querySelector('.addPart').style.backgroundColor = '#FAE4A5'
    document.querySelector('.writingAd').style.display = 'block'
    document.querySelectorAll('.zoneFree').forEach(el => {
      el.style.display = 'block'
    })
    document.querySelector('.necessCount').textContent = ''
    document.querySelector('.necessCount').innerHTML =
      '<i class="fa-solid fa-check fa-xl"></i>'
    counter = 0
  }

  document
    .querySelector('.firstStageButton')
    .addEventListener('click', firstStagePass)

  function secondStagePass() {
    document.querySelector('.addPart').style.backgroundColor = 'lightgreen'
    document.querySelector('.secondStage').style.display = 'none'
    document.querySelector('.popup-finished').classList.add('_opened')
    document.querySelector('.addCount').textContent = ''
    document.querySelector('.addCount').innerHTML =
      '<i class="fa-solid fa-check fa-xl"></i>'
    counter = 0
  }

  document
    .querySelector('.secondStageButton')
    .addEventListener('click', secondStagePass)

  document.querySelectorAll('.zone').forEach(function (zone) {
    zone.addEventListener('click', function () {
      if (!this.classList.contains('zoneSelected')) {
        let classname = 'a' + counter
        if (this.classList.contains(classname)) {
          selectNeccZone(counter)
          this.classList.add('zoneSelected')
          counter++
          updateHeader(counter)
          updateDescr(counter)
          updateCounter(counter)
          if (counter == 2) {
            document.querySelector('.firstStageButton').disabled = false
          }
        } else {
          wrongAnswer()
        }
      }
    })
  })

  document.addEventListener('click', e => {
    if (e.target.closest('.zoneFree')) {
      e.target.classList.add('zoneSelected')
      let src = e.target.getAttribute('src')
      let newSrc = src.substring(0, src.length - 4)
      newSrc = newSrc + 'Select.png'
      e.target.setAttribute('src', newSrc)
      counter++
      updateWriting(counter + 1)
      updateHeader(counter)
      updateDescr(counter)
      updateCounter(counter)
      if (counter == 5) {
        document.querySelector('.secondStageButton').disabled = false
      }
    }
  })
}
