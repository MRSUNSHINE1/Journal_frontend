<template>
  <Header />
  <Loading v-if="state === 'loading'" />
  <Erreur
    v-else-if="state === 'error'"
    message="une erreur s'est produite lors du chargement"
  />
  <div v-else class="flex flex-col justify-center items-center p-10">
    <div
      class="card bg-base-300 rounded-box grid h-20 place-items-center w-[80%]"
    >
      <h1>{{ note.title }}</h1>
    </div>
    <div class="bg-base-100 border border-base-300 w-[80%]">
      <div class="grid h-80 p-5">
        <p>{{ note.body }}</p>
      </div>
    </div>
    <Erreur v-if="erreur.state" :message="erreur.message"/>
    <div class="p-8 flex justify-end-safe w-[100%]">
      <button class="btn btn-info mr-5">Modifier</button>
      <button class="btn btn-error ml-5" @click="deleteNote">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/header.vue";
import { onMounted, ref } from "vue";
import Loading from "@/components/loading.vue";
import Erreur from "@/components/erreur.vue";

const route = useRoute();
const router = useRouter()
const id = route.params.id;
const note = ref(null);
const state = ref("loading");
const erreur = ref({state: false, message:''})

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/note/${id}`);
    note.value = await res.json();
    state.value = "ok";
  } catch (error) {
    state.value = "error";
    console.error(error)
  }
});

async function deleteNote() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/note/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if(response.ok) {
    router.push('/')
  } else {
    throw new Error('erreur lors de la suppression')
  }
  } catch (error) {
    erreur.value.state = true;
    erreur.value.message = 'une erreur s\'est produite lors de la suppression. Veuillez reesayer plus tard'
  }
}
</script>
