<template>
    <Waline :serverURL="serverURL" :path="path" />
  </template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed, onMounted } from 'vue';

  
import '@waline/client/dist/waline.css';
  
const serverURL = 'https://waline-eight-gules.vercel.app';


onMounted(()=>{
  let path = computed(() => window.location.path);
})
</script>
  