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

function endModal() {
  $('.overlay').fadeIn(500)
  $('.modalFinal').fadeIn(500)
}
onMounted(() => {
  $('.popup__close-btn').on('click', function () {
    var popup = $('.popup')
    $('.popup').removeClass('_opened')
    window.setTimeout(function () {
      popup.removeClass('clickable')
    }, 5)
  })

  function moveBubble(classname) {
    switch (classname) {
      case '.s0':
        $(classname).animate({ marginLeft: '15%' }, 1000)
        break
      case '.s1':
        $(classname).animate({ marginLeft: '30%' }, 1000)
        break
      case '.s2':
        $(classname).animate({ marginLeft: '43%' }, 1000)
        break
      case '.s3':
        $(classname).animate({ marginLeft: '50%' }, 1000)
        break
      case '.s4':
        $(classname).animate({ marginLeft: '65%' }, 1000)
        break
    }
  }

  function appearBubble(classname) {
    $(classname).fadeIn(500)
  }

  while (counter < 5) {
    let classname = '.s' + counter
    setTimeout(() => appearBubble(classname), counter * 1000)
    setTimeout(() => moveBubble(classname), counter * 1200)
    counter++
  }
})

function finish() {
  log('ACTIVITY', 'user_finished_block', 6)
  if (window.localStorage.getItem('error') === null) {
    log('ROI', 'user_without_mistake', 6)
  } else {
    log('ROI', 'user_mistake', 6)
    window.localStorage.removeItem('error')
  }
  log('SYSTEM', 'session_finished')
  window.localStorage.removeItem('architect_block')
  //window.location.href = './';
}
</script>
<template>
  <div class="ending">
    <div class="wrapper">
      <main class="main">
        <section class="main__welcome welcome ending_style-1">
          <div class="welcome__container">
            <div class="welcome__wrapper ending_style-2">
              <div
                class="welcome__image"
                data-aos="rm-opacity=1"
                data-aos-offset="20"
                data-aos-duration="800"
                data
              >
                <img :src="media('../../public/img/End Pic.png')" alt="" />
              </div>

              <div
                class="welcome-message"
                data-aos="fade-right"
                data-aos-offset="20"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                <h1 class="ending_style-3">
                  {{ translate('Заказчик согласовал проект!') }}'
                </h1>
                <p>
                  {{
                    translate(
                      'Вскоре вы передали генеральный план строителям, а уже через несколько месяцев на заброшенном пустыре появился прекрасный парк, который по достоинству оценили все жители города.'
                    )
                  }}
                </p>
              </div>

              <div
                class="button-box"
                data-aos="fade-down"
                data-aos-offset="20"
                data-aos-duration="800"
                data-aos-delay="800"
              >
                <button
                  class="welcome-button button ending_style-4"
                  @click="endModal"
                >
                  {{ translate('Завершить работу') }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="container py-4">
          <div class="d-flex justify-content-center">
            <div class="speech-bubble speech-right s0 ending_style-5">
              <img :src="media('../../public/img/quotes/img1.svg')" alt="" />
            </div>
            <div class="speech-bubble speech-right s1 ending_style-6">
              <img :src="media('../../public/img/quotes/img2.svg')" alt="" />
            </div>
            <div class="speech-bubble speech-left s2 ending_style-7">
              <img :src="media('../../public/img/quotes/img3.svg')" alt="" />
            </div>
            <div class="speech-bubble speech-right s3 ending_style-8">
              <img :src="media('../../public/img/quotes/img4.svg')" alt="" />
            </div>
            <div class="speech-bubble speech-right s4 ending_style-9">
              <img :src="media('../../public/img/quotes/img5.svg')" alt="" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="rounded-all modalWindow modalFinal ending_style-10 container">
      <div class="row ending_style-11 mx-4">
        <div class="col-8 ending_style-12">
          <h1 class="finish-title ending_style-13">
            {{ translate('Поздравляем!') }}
          </h1>
          <p>
            {{
              translate(
                'Ваше архитектурное бюро выполнило весьма сложный заказ.'
              )
            }}
          </p>
          <p class="ending_style-14">
            {{
              translate(
                'Вы определили, в какой точке города должно появиться новое общественное пространство, провели исследования с местными жителями, зонировали территорию, а затем по вашему проекту построили настоящий парк.'
              )
            }}
          </p>

          <button class="button ending_style-15" @click="finish">
            {{ translate('Перейти к финалу') }}
          </button>
        </div>
        <div class="col-4 ending_style-16">
          <img
            :src="media('../../public/img/finalModal.png')"
            alt=""
            class="img-fluid ending_style-17 mr-auto"
          />
        </div>
      </div>
    </div>

    <div class="overlay ending_style-18"></div>
  </div>
</template>
