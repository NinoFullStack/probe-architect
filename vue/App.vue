<script setup>
import { provide } from 'vue'

import Body from './lib/components/Body.vue'

provide('media', path => {
  return path
})

provide('log', (type, action, block_id = 0, btn_id = 0) => {
  console.log({
    type: type,
    action: action,
    user_id: 1,
    created_at: new Date().toISOString(),
    probe_id: 2,
    block_id: block_id,
    btn_id: btn_id,
  })
})

provide('translate', key => {
  return key
})
</script>

<template>
  <Body />
</template>
