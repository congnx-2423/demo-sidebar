<template>
  <main-directory />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MainDirectory from './components/MainDirectory.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainDirectory,
  }
})

</script>

<style>
</style>
