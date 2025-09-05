<template>
  <Header />
  <div class="flex h-screen w-ful justify-center items-center flex-col pt-5">
    <div class="home">
      <router-link to="/create">
        <button class="btn btn-primary">Ajouter une note</button>
      </router-link>
      <button class="btn btn-soft btn-primary" @click="isSort = !isSort">
        Trier par date
      </button>
    </div>
    <tableau v-if="isOk" :data="data" />
    <p v-else class="p-50">Vous n'avez aucune note</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { trierC, trierD } from "@/components/composable/array";
import tableau from "../components/tableau.vue";
import Header from "../components/header.vue";

const data = ref(null);
const isSort = ref(false);
const isOk = ref(false);


onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
  data.value = await response.json();
 if(data.value.length>0){
  isOk.value = true;
 }
  watch(isSort, async () => {
    if (isSort.value) {
      trierD(data.value);
      console.log("d");
    } else {
      trierC(data.value);
      console.log("c");
    }
  });
});
</script>

<style scoped>
.home button {
  margin: 5px;
}
</style>
