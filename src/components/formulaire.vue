<template>
  <form
    class="w-screen h-screen flex items-center flex-col"
    @submit.prevent="enregistrer"
  >
    <fieldset class="fieldset w-[50%]">
      <legend class="fieldset-legend">Titre de la note</legend>
      <input type="text" class="input" placeholder="Titre" v-model="title" />
    </fieldset>
    <fieldset class="fieldset h-[70%] w-[50%]">
      <legend class="fieldset-legend">Contenu de la note</legend>
      <textarea
        placeholder="Contenu..."
        class="textarea w-full h-[500%]"
        v-model="body"
      ></textarea>
    </fieldset>
    <Erreur v-if="erreur.status" :message="erreur.message" />
    <button type="submit" class="btn btn-primary mt-5">Enregistrer</button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import Erreur from "./erreur.vue";

const router = useRouter();

const title = ref(null);
const body = ref(null);
const erreur = ref({ status: false, message: "" });

async function enregistrer() {
  if (!title.value || !body.value) {
    alert("veuillez remplire tous les champs");
    return;
  }
  try {
    const data = {
      title: title.value,
      body: body.value,
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/");
    } else {
      throw new Error("erreur lors de l'enregistrement");
    }
  } catch (error) {
    erreur.value.status = true;
    erreur.value.message =
      "erreur lors de l'enregistrement veuillez reessayer plus tard";
  }
}
</script>
