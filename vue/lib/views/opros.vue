<script setup>
import { inject, onMounted } from 'vue'

import { opros } from '../utils'

// eslint-disable-next-line no-unused-vars
const translate = inject('translate')
// eslint-disable-next-line no-unused-vars
const log = inject('log')
// eslint-disable-next-line no-unused-vars
const media = inject('media')

const emit = defineEmits(['next'])

onMounted(() => {
  opros()
})

function next_block(e) {
  e.preventDefault()
  log('ACTIVITY', 'user_finished_block', 2)

  if (window.localStorage.getItem('error') === null) {
    log('ROI', 'user_without_mistake', 2)
  } else {
    log('ROI', 'user_mistake', 2)
    window.localStorage.removeItem('error')
  }
}
</script>

<template>
  <div class="opros">
    <div class="wrapper">
      <main class="main">
        <div class="main__container">
          <div class="d-flex justify-content-around opros_style-1">
            <div class="content-part opros_style-2">
              <div
                class="rounded-all workflow__part opros_style-3 container py-4"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <p class="part-name">{{ translate('Часть 2') }}</p>
                <h1 class="title">{{ translate('Семинар с жителями') }}</h1>
              </div>
              <div
                class="rounded-all workflow__part opros_style-4 container py-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
              >
                <p class="opros_style-5">
                  {{
                    translate(
                      'Один из важнейших этапов перед проектированием — узнать, что хотят увидеть в будущем парке горожане и что они думают о выбранном месте.'
                    )
                  }}
                </p>
                <p>
                  {{
                    translate(
                      'Определите, какие вопросы подходят для анкетирования:'
                    )
                  }}
                </p>
                <div class="oprosGo opros_style-6">
                  <div class="opros opros_style-7">
                    <img
                      :src="media('../../public/img/questionBg.png')"
                      id="questionBg"
                      class="opros_style-8"
                    />
                    <p class="oprosNum quest-content opros_style-9"></p>
                    <h3
                      class="oprosQuestion title quest-content opros_style-10"
                    ></h3>
                  </div>
                  <div class="justify-content-around opros_style-11 py-4">
                    <button
                      class="btn btn-answear btn-outline-danger opros_style-17 px-4 py-2"
                      @click="log('ACTIVITY', 'user_action', 2, 1)"
                    >
                      <i class="fa-solid fa-x"> </i>
                      <b class="opros_style-12">
                        {{ translate('Не подходит') }}</b
                      >
                    </button>
                    <button
                      class="btn btn-answear btn-outline-success px-4 py-2"
                      @click="log('ACTIVITY', 'user_action', 2, 2)"
                    >
                      <i class="fa-solid fa-check"></i
                      ><b class="opros_style-13">
                        {{ translate('Подходит') }}</b
                      >
                    </button>
                  </div>
                </div>
                <div class="oprosFinish hidden text-center">
                  <div class="finish-article">
                    <b>
                      <p>{{ translate('Анкета составлена.') }}</p>
                    </b>
                    <b>
                      <p>{{ translate('Вы распределили все вопросы!') }}</p>
                    </b>
                  </div>
                  <button
                    @click=";[next_block($event), emit('next')]"
                    class="button opros_style-14"
                  >
                    {{ translate('Провести опрос населения') }}
                  </button>
                </div>
              </div>
            </div>
            <div
              :style="{
                backgroundImage: `url(${media(
                  '../public/img/bg/anketa-bg.png'
                )})`,
              }"
              class="questionnaire"
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h1 class="questionnaire__title opros_style-15">
                {{ translate('АНКЕТА') }}
              </h1>
              <h1 class="questionnaire__logo opros_style-16">
                <img
                  :src="media('../../public/img/biletStroy.png')"
                  alt=""
                  class="img-fluid"
                />
              </h1>

              <p
                class="questionnaire__paragraph"
                v-html="
                  translate(
                    'для жителей Профиграда с целью выяснения <br> пожеланий по проектированию городского парка'
                  )
                "
              ></p>
              <div class="answears">
                <div class="answear answear_empty">
                  <div class="answear__num">1.</div>
                  <div class="answear__text"><div class="decor"></div></div>
                </div>

                <div class="answear answear_empty">
                  <div class="answear__num">2.</div>
                  <div class="answear__text"><div class="decor"></div></div>
                </div>

                <div class="answear answear_empty">
                  <div class="answear__num">3.</div>
                  <div class="answear__text">
                    <div class="decor"></div>
                    <div class="decor"></div>
                  </div>
                </div>

                <div class="answear answear_empty">
                  <div class="answear__num">4.</div>
                  <div class="answear__text">
                    <div class="decor"></div>
                    <div class="decor"></div>
                  </div>
                </div>

                <div class="answear answear_empty">
                  <div class="answear__num">5.</div>
                  <div class="answear__text"><div class="decor"></div></div>
                </div>
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
  </div>
</template>
