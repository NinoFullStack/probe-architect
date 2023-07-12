import { inject } from 'vue'

export default () => {
  const media = inject('media')

  function clearZonesAndBoxes() {
    let nonSelectable = ''
    if (count == 3) {
      nonSelectable = 'zone4'
    } else if (count == 2) {
      nonSelectable = 'zone3'
    }
    document.querySelectorAll('.zoneSelected').forEach(function (zone) {
      if (zone.classList.contains(nonSelectable)) {
        zone.classList.add('wrongZone')
      }
      zone.classList.remove('zoneSelected')
    })
    document.querySelectorAll('.boxSelected').forEach(function (box) {
      box.textContent = ''
      box.classList.remove('checked')
    })
  }

  function checkCount() {
    if (
      count == 3 &&
      document.querySelector('.firstQuestion').style.display !== 'none'
    ) {
      document
        .querySelector('.nextQuestion')
        .classList.remove('button_disabled')
    } else {
      document.querySelector('.nextQuestion').classList.add('button_disabled')
    }
    if (
      count == 2 &&
      document.querySelector('.secondQuestion').style.display !== 'none'
    ) {
      document
        .querySelector('.nextQuestion')
        .classList.remove('button_disabled')
    }
    if (
      count == 1 &&
      document.querySelector('.thirdQuestion').style.display !== 'none'
    ) {
      document
        .querySelector('.nextQuestion')
        .classList.remove('button_disabled')
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

  document.querySelector('.startButt').addEventListener('click', function () {
    document.querySelector('.modalStart').classList.remove('active')
    document.querySelector('.overlay').classList.remove('active')

    document.querySelector('.workflow').classList.add('visible')
  })

  let count = 0
  document.querySelector('.zone1').addEventListener('click', function () {
    wrongAnswer()
  })
  document.querySelector('.zone2').addEventListener('click', function () {
    if (
      document.querySelector('.zone2').classList.contains('zone') &&
      !document.querySelector('.zone2').classList.contains('zoneSelected')
    ) {
      document.querySelector('.zone2').classList.add('zoneSelected')
      document.querySelector('.box2').classList.add('boxSelected')
      document
        .querySelector('.zone2')
        .setAttribute('src', media('./img/map/zone2active.png'))
      document.querySelector('.box2').classList.add('checked')
      count++
      checkCount()
    }
  })
  document.querySelector('.zone3').addEventListener('click', function () {
    if (
      !document.querySelector('.zone3').classList.contains('wrongZone') &&
      !document.querySelector('.zone3').classList.contains('zoneSelected')
    ) {
      document.querySelector('.zone3').classList.add('zoneSelected')
      document.querySelector('.box3').classList.add('boxSelected')
      document
        .querySelector('.zone3')
        .setAttribute('src', media('./img/map/zone3active.png'))
      document.querySelector('.box3').classList.add('checked')
      count++
      checkCount()
    } else {
      wrongAnswer()
    }
  })
  document.querySelector('.zone4').addEventListener('click', function () {
    if (
      !document.querySelector('.zone4').classList.contains('wrongZone') &&
      !document.querySelector('.zone4').classList.contains('zoneSelected')
    ) {
      document.querySelector('.zone4').classList.add('zoneSelected')
      document
        .querySelector('.zone4')
        .setAttribute('src', media('./img/map/zone4active.png'))
      document.querySelector('.box4').classList.add('boxSelected')
      document.querySelector('.box4').classList.add('checked')
      count++
      checkCount()
    } else {
      wrongAnswer()
    }
  })

  document
    .querySelector('.nextQuestion')
    .addEventListener('click', function () {
      if (
        count == 3 &&
        document.querySelector('.firstQuestion').style.display !== 'none'
      ) {
        document.querySelector('.zone1').style.display = 'none'
        document.querySelector('.firstQuestion').style.display = 'none'
        document.querySelector('.firstQuestion').innerHTML = ''
        document.querySelector('.mapPeople').classList.remove('active')
        document.querySelector('.secondQuestion').style.display = 'block'
        document.querySelector('.mapTracks').classList.add('active')
        document
          .querySelector('.zone2')
          .setAttribute('src', media('./img/map/zone2.png'))
        document
          .querySelector('.zone3')
          .setAttribute('src', media('./img/map/zone3.png'))
        document
          .querySelector('.zone4')
          .setAttribute('src', media('./img/map/zone4.png'))
        clearZonesAndBoxes()
        count = 0
        checkCount()
      } else if (
        count == 2 &&
        document.querySelector('.secondQuestion').style.display !== 'none'
      ) {
        document.querySelector('.zone4').style.display = 'none'
        document.querySelector('.secondQuestion').style.display = 'none'
        document.querySelector('.secondQuestion').innerHTML = ''
        document.querySelector('.mapTracks').classList.remove('active')
        document.querySelector('.thirdQuestion').style.display = 'block'
        document.querySelector('.mapWideTracks').classList.add('active')
        document.querySelector('.mapAreas').classList.add('active')
        document
          .querySelector('.zone2')
          .setAttribute('src', media('./img/map/zone2.png'))
        document
          .querySelector('.zone3')
          .setAttribute('src', media('./img/map/zone3.png'))
        clearZonesAndBoxes()
        count = 0
        checkCount()
      } else if (
        count == 1 &&
        document.querySelector('.thirdQuestion').style.display !== 'none'
      ) {
        document.querySelector('.nextQuestion').style.display = 'none'
        document.querySelector('.popup-finished').classList.add('_opened')
        checkCount()
      }
    })
}
