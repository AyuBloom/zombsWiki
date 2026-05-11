<template>
  <div style=" display:flex; justify-content:center; text-align:center; margin:10px 0;">
    <div style="display:flex; border:1px solid #666; padding:10px; flex-direction:column; gap:10px;">
      <!-- unideal to have to use `/zombsWiki` here, but there's no other way ¯\_(ツ)_/¯ -->
      <img :src="`/zombsWiki${image}`" style="display:block; margin:0 auto;">
      <div>{{ description }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image:       { type: String, required: true },
  description: { type: String, required: true },
});
</script>
