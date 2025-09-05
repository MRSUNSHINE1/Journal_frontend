<template>
    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Titre</th>
        <th>Aperçu</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      <Ligne v-for="(item, index) in data" :key="index" :item="item" :index="index + 1"/>
    </tbody>
  </table>
</div>
</template>

<script setup>
import Ligne from './ligne.vue';

    const props = defineProps({
        data: {
            type: Array,
            required: true
        }
    });
</script>