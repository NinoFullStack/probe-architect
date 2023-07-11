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

onMounted(() => {
  $('.popup__close-btn').on('click', function () {
    var popup = $('.popup')
    $('.popup').removeClass('_opened')
    window.setTimeout(function () {
      popup.removeClass('clickable')
    }, 5)
  })

  function clearZonesAndBoxes() {
    let nonSelectable = ''
    if (count == 3) {
      nonSelectable = 'zone4'
    } else if (count == 2) {
      nonSelectable = 'zone3'
    }
    $('.zoneSelected').each(function () {
      if ($(this).hasClass(nonSelectable)) {
        $(this).addClass('wrongZone')
      }
      $(this).removeClass('zoneSelected')
    })
    $('.boxSelected').each(function () {
      $(this).text('')
      $(this).removeClass('checked')
    })
  }
  function checkCount() {
    if (count == 3 && $('.firstQuestion').is(':visible')) {
      $('.nextQuestion').removeClass('button_disabled')
    } else {
      $('.nextQuestion').addClass('button_disabled')
    }
    if (count == 2 && $('.secondQuestion').is(':visible')) {
      $('.nextQuestion').removeClass('button_disabled')
    }
    if (count == 1 && $('.thirdQuestion').is(':visible')) {
      $('.nextQuestion').removeClass('button_disabled')
    }
  }

  function wrongAnswer() {
    window.localStorage.setItem('error', 'true')
    $('.popup').addClass('_opened')
    var popup = $('.popup')
    window.setTimeout(function () {
      popup.addClass('clickable')
    }, 5)
  }

  $('.popup__close-btn').on('click', function () {
    var popup = $('.popup')
    $('.popup').removeClass('_opened')
    window.setTimeout(function () {
      popup.removeClass('clickable')
    }, 5)
  })
  $(document).on('click', function (e) {
    var popup = $('.popup')
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
    var popup = $('.popup')
    var popupFinished = $('.popupFinished')

    if (popup.hasClass('_opened') || popupFinished.hasClass('_opened')) {
      if (event.key == 'Escape') {
        popup.removeClass('_opened')
        window.setTimeout(function () {
          popup.removeClass('clickable')
        }, 5)
      }
    }
  })

  $('.startButt').on('click', function () {
    $('.modalStart').fadeOut(500)
    $('.overlay').fadeOut(500)

    $('.workflow').addClass('visible')
  })

  let count = 0
  $('.zone1').on('click', function () {
    log('ACTIVITY', 'user_action', 1, 1)
    wrongAnswer()
  })
  $('.zone2').on('click', function () {
    log('ACTIVITY', 'user_action', 1, 2)
    if ($('.zone2').hasClass('zone') && !$('.zone2').hasClass('zoneSelected')) {
      $('.zone2').addClass('zoneSelected')
      $('.box2').addClass('boxSelected')
      $('.zone2').attr('src', media('./img/map/zone2active.png'))
      $('.box2').addClass('checked')
      count++
      checkCount()
    }
  })
  $('.zone3').on('click', function () {
    log('ACTIVITY', 'user_action', 1, 3)
    if (
      !$('.zone3').hasClass('wrongZone') &&
      !$('.zone3').hasClass('zoneSelected')
    ) {
      $('.zone3').addClass('zoneSelected')
      $('.box3').addClass('boxSelected')
      $('.zone3').attr('src', media('./img/map/zone3active.png'))
      $('.box3').addClass('checked')
      count++
      checkCount()
    } else {
      wrongAnswer()
    }
  })
  $('.zone4').on('click', function () {
    log('ACTIVITY', 'user_action', 1, 4)
    if (
      !$('.zone4').hasClass('wrongZone') &&
      !$('.zone4').hasClass('zoneSelected')
    ) {
      $('.zone4').addClass('zoneSelected')
      $('.zone4').attr('src', media('./img/map/zone4active.png'))
      $('.box4').addClass('boxSelected')
      $('.box4').addClass('checked')
      count++
      checkCount()
    } else {
      wrongAnswer()
    }
  })

  $('.nextQuestion').on('click', function () {
    if (count == 3 && $('.firstQuestion').is(':visible')) {
      $('.zone1').fadeOut(500)
      $('.firstQuestion').fadeOut(500)
      $('.mapPeople').fadeOut(500)
      $('.secondQuestion').fadeIn(500)
      $('.mapTracks').fadeIn(500)
      $('.zone2').attr('src', media('./img/map/zone2.png'))
      $('.zone3').attr('src', media('./img/map/zone3.png'))
      $('.zone4').attr('src', media('./img/map/zone4.png'))
      clearZonesAndBoxes()
      count = 0
      checkCount()
    } else if (count == 2 && $('.secondQuestion').is(':visible')) {
      $('.zone4').fadeOut(500)
      $('.secondQuestion').fadeOut(500)
      $('.mapTracks').fadeOut(500)
      $('.thirdQuestion').fadeIn(500)
      $('.mapWideTracks').fadeIn(500)
      $('.mapAreas').fadeIn(500)
      $('.zone2').attr('src', media('./img/map/zone2.png'))
      $('.zone3').attr('src', media('./img/map/zone3.png'))
      clearZonesAndBoxes()
      count = 0
      checkCount()
    } else if (count == 1 && $('.thirdQuestion').is(':visible')) {
      $('.nextQuestion').fadeOut(500)
      $('.popup-finished').addClass('_opened')
      checkCount()
    }
  })
})

function next_block(e) {
  e.preventDefault()
  log('ACTIVITY', 'user_finished_block', 1)
  if (window.localStorage.getItem('error') === null) {
    log('ROI', 'user_without_mistake', 1)
  } else {
    log('ROI', 'user_mistake', 1)
    window.localStorage.removeItem('error')
  }
}
</script>

<template>
  <div class="map">
    <div class="wrapper">
      <main class="main">
        <div class="main__container">
          <div class="d-flex justify-content-center workflow">
            <div class="workflow__part rounded-all workflow__map map_style-1">
              <img
                :src="media('../../public/img/map.png')"
                class="map_style-2"
              />
              <img
                :src="media('../../public/img/mapPeople.png')"
                class="mapPeople map_style-3"
              />
              <img
                :src="media('../../public/img/mapTracks.png')"
                class="mapTracks map_style-4"
              />
              <img
                :src="media('../../public/img/mapTracks2.png')"
                class="mapWideTracks map_style-5"
              />
              <img
                :src="media('../../public/img/mapAreas.png')"
                class="mapAreas map_style-6"
              />
              <div class="map_style-7">
                <img
                  :src="media('../../public/img/map/zone1.png')"
                  class="zone zone1 wrongZone map_style-8"
                />
              </div>
              <div class="map_style-9">
                <img
                  :src="media('../../public/img/map/zone2.svg')"
                  class="zone zone2 map_style-10"
                />
              </div>
              <div class="map_style-11">
                <img
                  :src="media('../../public/img/map/zone3.png')"
                  class="zone zone3 map_style-12"
                />
              </div>
              <div class="map_style-13">
                <img
                  :src="media('../../public/img/map/zone4.png')"
                  class="zone zone4 map_style-14"
                />
              </div>
            </div>
            <div class="px-4">
              <div class="rounded-all workflow__part map_style-15 container">
                <p class="part-name">{{ translate('Часть 1') }}</p>
                <h3 class="title">{{ translate('Выбор территории') }}</h3>
                <div class="firstQuestion map_style-16">
                  <p>
                    {{
                      translate(
                        'Выберите 3 места, рядом с которыми живёт много жителей'
                      )
                    }}
                  </p>
                  <div class="d-flex">
                    <div
                      class="boxIco box2 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                    <div
                      class="boxIco box3 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                    <div
                      class="boxIco box4 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                  </div>
                </div>
                <div class="secondQuestion map_style-17">
                  <p>
                    {{
                      translate(
                        'Выберите 2 места с наибольшим числом остановок дорожного транспорта поблизости'
                      )
                    }}
                  </p>
                  <div class="d-flex">
                    <div
                      class="boxIco box2 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                    <div
                      class="boxIco box3 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                  </div>
                </div>
                <div class="thirdQuestion map_style-18">
                  <p>
                    {{
                      translate(
                        'Выберите место, до которого проще всего добраться пешком; чем больше радиус пешей доступности, тем лучше'
                      )
                    }}
                  </p>
                  <div class="d-flex">
                    <div
                      class="boxIco box2 checkbox-green"
                      :style="{
                        backgroundImage: `url(${media(
                          '../../public/img/icons/success.svg'
                        )})`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                class="rounded-all firstQuestion workflow__part map_style-19 container my-2"
              >
                <h3 class="map_style-20 ml-auto">
                  {{ translate('Плотность населения Профиград') }}а
                </h3>
                <div class="map_style-21 my-2"></div>
                <div class="d-flex labels">
                  <p class="label map_style-22">
                    {{ translate('Высокая') }}
                  </p>
                  <p class="label map_style-23">
                    {{ translate('Низкая') }}
                  </p>
                </div>
              </div>
              <div
                class="rounded-all secondQuestion workflow__part map_style-24 container my-2"
              >
                <h3 class="map_style-25 ml-auto">
                  {{ translate('Маршруты общественного транспорта') }}
                </h3>
                <div class="d-flex">
                  <div>
                    <img :src="media('../../public/img/route.png')" alt="" />
                    <p class="label">{{ translate('Остановка') }}</p>
                  </div>
                  <div>
                    <img :src="media('../../public/img/route.png')" alt="" />
                    <p class="label">{{ translate('Остановка') }}</p>
                  </div>
                </div>
              </div>
              <div
                class="rounded-all thirdQuestion workflow__part map_style-26 container my-2"
              >
                <h3 class="map_style-27 ml-auto">
                  {{ translate('Доступность улиц для пешеходов') }}
                </h3>
                <div class="d-flex range">
                  <div>
                    <div class="map_style-28"></div>
                    <p>5 {{ translate('мин.') }}</p>
                  </div>
                  <div>
                    <div class="map_style-29"></div>
                    <p>10 {{ translate('мин.') }}</p>
                  </div>
                  <div>
                    <div class="map_style-30"></div>
                    <p>15 {{ translate('мин.') }}</p>
                  </div>
                  <div>
                    <div class="map_style-31"></div>
                    <p>20 {{ translate('мин.') }}'</p>
                  </div>
                </div>
              </div>
              <button class="button nextQuestion button_disabled map_style-32">
                {{ translate('Продолжить') }}
              </button>
            </div>
          </div>

          <div
            class="rounded-all modalWindow modalStart container"
            id="map-popup"
          >
            <div class="row mx-4">
              <div class="col-6 col-6_article map_style-33">
                <h1
                  class="map_style-34"
                  v-html="
                    translate(
                      'Давайте определим,<br />какое место в городе лучше всего подходит для  парка!'
                    )
                  "
                ></h1>
                <p>
                  {{
                    translate(
                      'Оцените плотность населения, транспортную и пешеходную доступность, чтобы выбрать лучшую территорию'
                    )
                  }}
                </p>
              </div>
              <div class="col-6 col-6_img">
                <img
                  :src="media('../../public/img/mapModal.png')"
                  alt=""
                  class="img-fluid map_style-35 mr-auto"
                />
              </div>
            </div>

            <button class="button startButt map_style-36">
              {{ translate('Приступим!') }}
            </button>
          </div>

          <div class="overlay"></div>
        </div>
      </main>

      <div class="popup">
        <div class="popup__icon">
          <img :src="media('../../public/img/icons/attention.svg')" alt="" />
        </div>
        <div class="popup__info">
          <div class="popup__header">
            <h3 class="popup__title">
              {{ translate('Ой, это неверный вариант!') }}'
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
            }}'
          </p>
        </div>
      </div>

      <div class="popup-finished">
        <div class="popup-finished__info">
          <div class="popup-finished__header">
            <h3 class="popup-finished__title">{{ translate('Отлично!') }}</h3>
          </div>
          <p
            class="popup-finished__paragraph"
            v-html="
              translate(
                'На основе аналитических данных вы определили лучшую<br />территорию для будущего парка.'
              )
            "
          ></p>
        </div>
        <button
          @click=";[next_block($event), emit('next')]"
          class="popup-finished__button"
        >
          {{ translate('Продолжить') }}
        </button>
      </div>
    </div>
  </div>
</template>
