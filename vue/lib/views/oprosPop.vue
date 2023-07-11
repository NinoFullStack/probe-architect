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

  let counter = 0
  let popup = $('.popup')

  fadeInSpeech(0)

  function wrongAnswer() {
    window.localStorage.setItem('error', 'true')
    $('.popup').addClass('_opened')
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

  function fadeInSpeech(n) {
    let classname = '.s' + n
    $(classname).fadeIn(500)
  }

  function fadeOutSpeech(n) {
    let classname = '.s' + n
    $(classname).fadeOut(500)
  }

  function totalWindow() {
    $('.overlay').fadeIn(500)
    $('.totalWindow').fadeIn(500)
  }

  function changeProgCount(n) {
    $('.progCount').text(n + '/6')
  }

  function updateHappy(n) {
    $('.happyIndex').attr(
      'src',
      media('../../public/img/happy') + (n + 1) + '.png'
    )
    if (n + 1 == 3) {
      $('.happyState').text(translate('Уже лучше...'))
      $('.happyState').css('color', 'orange')
    }
    if (n + 1 == 5) {
      $('.happyState').text(translate('Все довольны!'))
      $('.happyState').css('color', 'green')
    }
  }

  $('.btn-warning').on('click', function () {
    let classname = 'a' + counter
    if ($(this).hasClass(classname)) {
      fadeOutSpeech(counter)
      updateHappy(counter)
      counter++
      changeProgCount(counter)
      fadeInSpeech(counter)
      $(this).prop('disabled', true)
      if (counter == 6) {
        setTimeout(() => totalWindow(), 2000)
      }
    } else {
      wrongAnswer()
    }
  })
})

function next_block(e) {
  e.preventDefault()
  log('ACTIVITY', 'user_finished_block', 3)
  if (window.localStorage.getItem('error') === null) {
    log('ROI', 'user_without_mistake', 3)
  } else {
    log('ROI', 'user_mistake', 3)
    window.localStorage.removeItem('error')
  }
}
</script>

<template>
  <div class="oprosPop">
    <div class="wrapper">
      <main class="main">
        <div class="main__container">
          <div class="d-flex justify-content-center oprosPop_style-12">
            <div>
              <div
                class="rounded-all workflow__part oprosPop_style-13 container my-4 py-4"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <p class="part-name">{{ translate('Часть 2') }}</p>
                <h4 class="title">{{ translate('Семинар с жителями') }}</h4>
              </div>
              <div
                class="workflow__part oprosPop_style-14"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <img
                  :src="media('../../public/img/population.png')"
                  alt=""
                  class="img-fluid oprosPop_style-15"
                />
                <div class="speech-bubble speech-right s0 oprosPop_style-16">
                  <h6>{{ translate('Мне не хватает воркаут-площадки') }}</h6>
                  <h6>
                    {{
                      translate(
                        'Тренировки на свежем воздухе - самые полезные!'
                      )
                    }}
                  </h6>
                </div>
                <div class="speech-bubble speech-right s1 oprosPop_style-17">
                  <h6>{{ translate('Хочу, чтобы можно было везде') }}</h6>
                  <h6>{{ translate('без проблем пройти и проехать') }}</h6>
                </div>
                <div class="speech-bubble speech-left s2 oprosPop_style-18">
                  <h6>
                    {{ translate('Хотим площадку с веревочным парком!') }}
                  </h6>
                </div>
                <div class="speech-bubble speech-left s3 oprosPop_style-19">
                  <h6>
                    {{
                      translate('Да, детская площадка нужна. Но не хватает ещё')
                    }}
                  </h6>
                  <h6>
                    {{ translate('какого-нибудь кафе, чтобы перекусить') }}
                  </h6>
                </div>
                <div class="speech-bubble speech-right s4 oprosPop_style-20">
                  <h6>{{ translate('Неплохо бы арендовать ролики и') }}</h6>
                  <h6>{{ translate('велосипеды прямо в парке') }}</h6>
                </div>
                <div class="speech-bubble speech-left s5 oprosPop_style-21">
                  <h6>
                    {{ translate('Я хотел бы дрессировать собаку в парке') }}
                  </h6>
                  <h6>
                    {{ translate('и знакомиться с другими владельцами') }}
                  </h6>
                </div>
              </div>
            </div>
            <div class="oprosPop_style-22">
              <div
                class="rounded-all workflow__part oprosPop_style-23 container my-4 py-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <div class="row justify-content-between oprosPop_style-24">
                  <div class="col-8">
                    <h4 class="aside-title">
                      {{
                        translate('Что нужно учесть при проектировании парка?')
                      }}
                    </h4>
                  </div>
                  <div class="col-2 oprosPop_style-25">
                    <h4 class="progCount oprosPop_style-26">0/6</h4>
                  </div>
                </div>
                <p>{{ translate('Сопоставьте реплики с вариантами:') }}</p>
                <div class="answear-for-q">
                  <button
                    type="button"
                    class="btn btn-warning a3"
                    @click="log('ACTIVITY', 'user_action', 3, 1)"
                  >
                    {{ translate('Кафе') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning a5"
                    @click="log('ACTIVITY', 'user_action', 3, 2)"
                  >
                    {{ translate('Площадка для собак') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="log('ACTIVITY', 'user_action', 3, 3)"
                  >
                    {{ translate('Пруд с уточками') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="log('ACTIVITY', 'user_action', 3, 4)"
                  >
                    {{ translate('Скейтпарк') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning a2"
                    @click="log('ACTIVITY', 'user_action', 3, 5)"
                  >
                    {{ translate('Детская площадка') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning a0"
                    @click="log('ACTIVITY', 'user_action', 3, 6)"
                  >
                    {{ translate('Спортивная площадка') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning a4"
                    @click="log('ACTIVITY', 'user_action', 3, 7)"
                  >
                    {{ translate('Пункт проката') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="log('ACTIVITY', 'user_action', 3, 8)"
                  >
                    {{ translate('Колесо обозрения') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="log('ACTIVITY', 'user_action', 3, 9)"
                  >
                    {{ translate('Фонтан') }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-warning a1"
                    @click="log('ACTIVITY', 'user_action', 3, 10)"
                  >
                    {{ translate('Доступная среда') }}
                  </button>
                </div>
              </div>

              <div
                class="rounded-all workflow__part oprosPop_style-27 container my-4 py-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                <h4 class="oprosPop_style-28 ml-auto">
                  {{ translate('Индекс счастья жителей') }}
                </h4>
                <img
                  class="happyIndex oprosPop_style-29"
                  :src="media('../../public/img/happy1.png')"
                  alt=""
                />
                <p class="happyState oprosPop_style-30">
                  {{ translate('Низкий') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="popup">
        <div class="popup__icon">
          <img :src="media('../../public/img/icons/attention.svg')" alt="" />
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
    </div>

    <div class="overlay oprosPop_style-1"></div>

    <div
      class="rounded-all modalWindow totalWindow oprosPop_style-2 container px-4"
    >
      <h4
        class="oprosPop_style-3"
        v-html="
          translate(
            'Вместе с аналитиками вы завершили <br> полевые исследования. Отличная работа!'
          )
        "
      ></h4>
      <h6 class="oprosPop_style-4">
        {{ translate('Портрет аудитории') }}
      </h6>
      <div class="row justify-content-around oprosPop_style-5">
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar4.png')"
            alt=""
            class="img-fluid"
          />
          <p>Семьи с детьми</p>
        </div>
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar3.png')"
            alt=""
            class="img-fluid"
          />
          <p>Дети</p>
        </div>
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar5.png')"
            alt=""
            class="img-fluid"
          />
          <p>Спортсмены</p>
        </div>
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar1.png')"
            alt=""
            class="img-fluid"
          />
          <p>Взрослые</p>
        </div>
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar6.png')"
            alt=""
            class="img-fluid"
          />
          <p>Пенсионеры</p>
        </div>
        <div class="col-2 aud-part text-center">
          <img
            :src="media('../../public/img/avatars/avatar2.png')"
            alt=""
            class="img-fluid"
          />
          <p>Владельцы собак</p>
        </div>
      </div>
      <div class="row justify-content-between oprosPop_style-6">
        <div class="oprosPop_style-7">
          <h6 class="label-total-stat">Пожелания местных жителей</h6>
          <img
            :src="media('../../public/img/graph1.svg')"
            alt=""
            class="img-fluid oprosPop_style-8"
          />
        </div>
        <div class="oprosPop_style-9">
          <h6 class="label-total-stat">Прогноз роста населения</h6>
          <img
            :src="media('../../public/img/graph2.svg')"
            alt=""
            class="img-fluid oprosPop_style-10"
          />
        </div>
      </div>
      <button
        @click=";[next_block($event), emit('next')]"
        class="button oprosPop_style-11"
      >
        <span>{{ translate('Следующий этап') }}</span
        ><img :src="media('../../public/img/icons/arrow-right.svg')" alt="" />
      </button>
    </div>
  </div>
</template>
