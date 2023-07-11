<template>
  <div class="wrapper home_style-1">
    <main class="main">
      <section class="main__welcome welcome">
        <div class="welcome__container">
          <div class="welcome__wrapper">
            <div
              class="welcome__image"
              data-aos-offset="20"
              data-aos-duration="800"
            >
              <img :src="media('../../public/img/introPhone.png')" alt="" />
            </div>

            <div
              class="welcome-message"
              data-aos="fade-right"
              data-aos-offset="20"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <h1 class="home_style-2">
                {{ translate('Жителям Профиграда нужен парк!') }}
              </h1>
              <p>
                {{
                  translate(
                    'Профиград — профориентационный город будущего, где представлены все отрасли экономики.'
                  )
                }}
              </p>
              <p>
                {{
                  translate(
                    'Здесь уже есть школа и кинотеатр, бизнес-центр и поликлиника, но нет ни одного парка для отдыха местных жителей. И именно вам нужно будет его создать!'
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
                @click="start($event), emit('next')"
                class="welcome-button button home_style-3"
              >
                <span>{{ translate('К проекту') }}</span
                ><img
                  :src="media('../../public/img/icons/arrow-right.svg')"
                  alt=""
                />
              </button>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const translate = inject('translate')
// eslint-disable-next-line no-unused-vars
const log = inject('log')
// eslint-disable-next-line no-unused-vars
const media = inject('media')

const emit = defineEmits(['next'])

onMounted(() => {
  if (window.localStorage.getItem('session') === null) {
    var today = new Date()
    window.localStorage.setItem('session', btoa(today.toISOString()))
    log('SYSTEM', 'session_created')
  }
})

function start(e) {
  e.preventDefault()
  log('SYSTEM', 'session_started')
}
</script>
