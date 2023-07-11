<script setup>
import jQuery from 'jquery'
const $ = jQuery
import { inject, onMounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const translate = inject('translate')
// eslint-disable-next-line no-unused-vars
const log = inject('log')
// eslint-disable-next-line no-unused-vars
const media = inject('media')

const emit = defineEmits(['next'])

let counter = 0
let firstStage = true

function firstStagePass() {
  firstStage = false
  $('.zone0').attr('src', media('./img/Zonirovanie/zZone0Done.png'))
  $('.zone1').attr('src', media('./img/Zonirovanie/zZone1Done.png'))
  $('.neccPart').css('background-color', 'lightgreen')
  $('.roads').css('display', 'block')
  $('.firstStage').css('display', 'none')
  $('.secondStage').fadeIn(500)
  $('.addPart').css('background-color', '#FAE4A5')
  $('.writingAd').fadeIn(500)
  $('.zoneFree').css('display', 'block')
  $('.necessCount').text('')
  $('.necessCount').append('<i class="fa-solid fa-check fa-xl"></i>')
  counter = 0
}

function secondStagePass() {
  $('.addPart').css('background-color', 'lightgreen')
  $('.secondStage').fadeOut(500)
  $('.popup-finished').addClass('_opened')
  $('.addCount').text('')
  $('.addCount').append('<i class="fa-solid fa-check fa-xl"></i>')
  counter = 0
}

onMounted(() => {
  $('.popup__close-btn').on('click', function () {
    var popup = $('.popup')
    $('.popup').removeClass('_opened')
    window.setTimeout(function () {
      popup.removeClass('clickable')
    }, 5)
  })

  let neccHeaders = [
    translate('Пункт проката'),
    translate('Площадка для собак'),
    translate('Детская площадка'),
    translate('Кафе'),
    translate('Спортивная площадка'),
  ]
  let neccDescrs = [
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

  $('.firstStage').fadeIn(500)
  updateHeader(counter)
  updateDescr(counter)
  function updateWriting(n) {
    let avatarPos
    if (n - 1 != 5) {
      avatarPos = ['30px', '30px', '70px', '-30px', '59px', '40px']
      $('#avik').attr('src', media('./img/avatars/avatar') + n + '.png')
      $('#avik').css('top', avatarPos[n])
      $('#zapiska').attr('src', media('./img/avatars/writing') + n + '.png')
    } else {
      avatarPos = ['30px', '30px', '70px', '-30px', '59px', '40px']
      $('#avik').css('display', 'none')
      $('#zapiska').css('display', 'none')
    }
  }

  function wrongAnswer() {
    window.localStorage.setItem('error', 'true')
    let popup = $('.popup')
    popup.addClass('_opened')
    window.setTimeout(function () {
      popup.addClass('clickable')
    }, 5)
  }

  $('.popup__close-btn').on('click', function () {
    let popup = $('.popup')
    popup.removeClass('_opened')
    window.setTimeout(function () {
      popup.removeClass('clickable')
    }, 5)
  })

  $(document).on('click', function (e) {
    let popup = $('.popup')
    if (
      !$(e.target).closest('.popup').length &&
      popup.hasClass('_opened') &&
      popup.hasClass('clickable')
    ) {
      popup.removeClass('_opened')
      window.setTimeout(function () {
        popup.removeClass('clickable')
      }, 5)
    }
  })

  $(document).on('keydown', function (event) {
    let popup = $('.popup')
    let popupFinished = $('.popupFinished')

    if (popup.hasClass('_opened') || popupFinished.hasClass('_opened')) {
      if (event.key == 'Escape') {
        popup.removeClass('_opened')
        window.setTimeout(function () {
          popup.removeClass('clickable')
        }, 5)
      }
    }
  })

  function selectNeccZone(n) {
    log('ACTIVITY', 'user_action', 4, n + 1)
    let classname = '.a' + n
    $(classname).attr(
      'src',
      media('./img/Zonirovanie/zZone') + n + 'Select.png'
    )
  }

  function updateCounter(n) {
    let classname = firstStage ? '.necessCount' : '.addCount'
    let totalCount = firstStage ? '2' : '5'
    $(classname).text(n + '/' + totalCount)
  }

  function updateHeader(n) {
    if (n != 5) {
      $('.addZoneHeader').text(neccHeaders[n])
    } else {
      $('.addZoneHeader').text('')
    }
  }

  function updateDescr(n) {
    if (n != 5) {
      $('.addZoneDescr').text(neccDescrs[n])
    } else {
      $('.addZoneDescr').text('')
    }
  }

  $('.zone').on('click', function () {
    if (!$(this).hasClass('zoneSelected')) {
      let classname = 'a' + counter
      if ($(this).hasClass(classname)) {
        selectNeccZone(counter)
        $(this).addClass('zoneSelected')
        counter++
        updateHeader(counter)
        updateDescr(counter)
        updateCounter(counter)
        if (counter == 2) {
          $('.firstStageButton').attr('disabled', false)
        }
      } else {
        wrongAnswer()
      }
    }
  })

  $('.zoneFree').on('click', function () {
    log('ACTIVITY', 'user_action', 3, counter + 3)
    if (!$(this).hasClass('zoneSelected')) {
      if (counter == 5) {
        console.log(counter + ' line161 ')
      }
      $(this).addClass('zoneSelected')
      let src = $(this).attr('src')
      let newSrc = src.substring(0, src.length - 4)
      newSrc = newSrc + 'Select.png'
      $(this).attr('src', newSrc)
      counter++
      updateWriting(counter + 1)
      updateHeader(counter)
      updateDescr(counter)
      updateCounter(counter)
      if (counter == 5) {
        $('.secondStageButton').attr('disabled', false)
      }
    }
  })
})

function next_block(e) {
  e.preventDefault()
  log('ACTIVITY', 'user_finished_block', 4)
  if (window.localStorage.getItem('error') === null) {
    log('ROI', 'user_without_mistake', 4)
  } else {
    log('ROI', 'user_mistake', 4)
    window.localStorage.removeItem('error')
  }
}
</script>

<template>
  <div class="zonirovanie">
    <div class="wrapper">
      <main class="main">
        <div class="main__container zonirovanie_style-1">
          <div
            class="workflow__part zonirovanie_style-2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div class="zonirovanie_style-3">
              <img
                :src="media('../../public/img/parkMap.png')"
                alt=""
                class="zonirovanie_style-4"
              />
              <div class="writingAd zonirovanie_style-5">
                <img
                  :src="media('../../public/img/avatars/writing1.png')"
                  alt=""
                  id="zapiska"
                />
                <img
                  :src="media('../../public/img/avatars/avatar1.png')"
                  alt=""
                  id="avik"
                  class="zonirovanie_style-6"
                />
              </div>
              <div class="zonirovanie_style-7">
                <img
                  :src="media('../../public/img/Zonirovanie/zZone0.png')"
                  alt=""
                  class="zone zone0 a0 zonirovanie_style-8"
                />
              </div>
              <div class="zonirovanie_style-9">
                <img
                  :src="media('../../public/img/Zonirovanie/zZone1.png')"
                  alt=""
                  class="zone zone1 a1 zonirovanie_style-10"
                />
              </div>

              <img
                :src="media('../../public/img/Zonirovanie/roads.png')"
                alt=""
                class="roads zonirovanie_style-11"
              />

              <div class="zonirovanie_style-12">
                <img
                  :src="media('../../public/img/Zonirovanie/dog.png')"
                  alt=""
                  class="zoneFree zonirovanie_style-13"
                />
              </div>
              <div class="zonirovanie_style-14">
                <img
                  :src="media('../../public/img/Zonirovanie/Girya.png')"
                  alt=""
                  class="zoneFree zonirovanie_style-15"
                />
              </div>
              <div class="zonirovanie_style-16">
                <img
                  :src="media('../../public/img/Zonirovanie/Cafe.png')"
                  alt=""
                  class="zoneFree zonirovanie_style-17"
                />
              </div>
              <div class="zonirovanie_style-18">
                <img
                  :src="media('../../public/img/Zonirovanie/Baby.png')"
                  alt=""
                  class="zoneFree zonirovanie_style-19"
                />
              </div>
              <div class="zonirovanie_style-20">
                <img
                  :src="media('../../public/img/Zonirovanie/Samokat.png')"
                  alt=""
                  class="zoneFree zonirovanie_style-21"
                />
              </div>
            </div>
          </div>
          <div
            class="workflow__part zonirovanie_style-22"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            <div class="rounded-all zonirovanie_style-23 container py-4">
              <p class="part-name">{{ translate('Часть 3') }}</p>
              <h3 class="title zonirovanie_style-24">
                {{ translate('Зонирование') }}
              </h3>
              <p class="zonirovanie_style-25">
                {{
                  translate(
                    'На предыдущем этапе мы узнали, чего хотят жители. Теперь вам надо сделать эскиз проекта — выберите на карте будущего парка подходящие участки.'
                  )
                }}
              </p>
              <div
                class="rounded-all-lightly neccPart zonirovanie_style-26 container pt-2"
              >
                <div class="d-flex">
                  <em class="mr-auto">
                    <p>{{ translate('ОБЯЗАТЕЛЬНЫЕ ЗОНЫ') }}</p>
                  </em>
                  <b class="ml-auto">
                    <p class="necessCount">0/2</p>
                  </b>
                </div>
                <div class="firstStage zonirovanie_style-27">
                  <div class="zonirovanie_style-28 py-2">
                    <h3 class="neccZoneHeader zonirovanie_style-29">
                      {{ translate('Рекреационная зона') }}
                    </h3>
                    <p class="neccZoneDescr">
                      {{
                        translate(
                          'Самая обширная область парка для отдыха и прогулок'
                        )
                      }}
                    </p>
                    <button
                      class="firstStageButton stage-btn"
                      @click="firstStagePass()"
                      disabled
                    >
                      {{ translate('Подтвердить') }}
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="rounded-all-lightly addPart zonirovanie_style-30 container mt-2 pt-2"
              >
                <div class="d-flex">
                  <em class="mr-auto">
                    <p>{{ translate('ПОЖЕЛАНИЯ ЖИТЕЛЕЙ') }}</p>
                  </em>
                  <b class="ml-auto">
                    <p class="addCount">0/5</p>
                  </b>
                </div>
                <div class="secondStage zonirovanie_style-31">
                  <div class="py-2">
                    <h3 class="addZoneHeader"></h3>
                    <p class="addZoneDescr"></p>
                    <button
                      class="secondStageButton stage-btn"
                      @click="secondStagePass()"
                      disabled
                    >
                      {{ translate('Подтвердить') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="popup">
        <div class="popup__icon">
          <img src:="media('../../public/img/icons/attention.svg')" alt="">
        </div>
        <div class="popup__info">
          <div class="popup__header">
            <h3 class="popup__title">
              {{ translate('Ой, это неверный вариант!') }}
            </h3>
            <button class="popup__close-btn">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.26541 7L0 1.73459L1.73459 0L7 5.26541L12.2654 0L14 1.73459L8.73459 7L14 12.2654L12.2654 14L7 8.73459L1.73459 14L0 12.2654L5.26541 7Z"
                  fill="#75797B"
                />
              </svg>
            </button>
          </div>
          <p class="popup__paragraph">
            {{
              translate(
                'Если не знаете, какой вариант выбрать, загляните в справочник.'
              )
            }}
          </p>
        </div>
      </div>

      <div class="popup-finished">
        <div class="popup-finished__info">
          <div class="popup-finished__header">
            <h3 class="popup-finished__title">{{ translate('Прекрасно!') }}</h3>
          </div>
          <p
            class="popup-finished__paragraph"
            v-html="
              translate(
                'У вас получился эскизный проект — его уже можно <br> презентовать заказчику.'
              )
            "
          ></p>
        </div>
        <button
          @click=";[next_block($event), emit('next')]"
          class="popup-finished__button"
        >
          {{ translate('Далее') }}
        </button>
      </div>
    </div>
  </div>
</template>
