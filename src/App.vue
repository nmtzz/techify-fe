<template>
  <Header v-if="!isAdminPage"/>
  <RouterView></RouterView>
  <Footer v-if="!isAdminPage"/>
</template>
<script setup>
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const isAdminPage = computed(() => route.path.includes("admin"));
</script>