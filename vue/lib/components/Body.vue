<template>
  <div id="architect">
    <component :is="states[currentState]" @next="currentState++" />
  </div>
</template>

<script setup>
import { markRaw, ref, watch } from 'vue'

import {
  HomeView,
  MapView,
  OprosView,
  OprosPopView,
  ZonirovanieView,
  DialogView,
  EndingView,
} from '../views'

let currentState = ref(0)

let architect_block = window.localStorage.getItem('architect_block')
if (architect_block !== null) {
  currentState = ref(+architect_block)
}

watch(
  () => currentState.value,
  () => {
    localStorage.setItem('architect_block', currentState.value)
  }
)

const states = ref([
  markRaw(HomeView),
  markRaw(MapView),
  markRaw(OprosView),
  markRaw(OprosPopView),
  markRaw(ZonirovanieView),
  markRaw(DialogView),
  markRaw(EndingView),
])
</script>
