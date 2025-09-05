<template>
    <tr>
        <th>{{ index }}</th>
        <td>{{ item.title }}</td>
        <td>{{ apercu }}</td>
        <td>{{ item.date }}</td>
        <td>
            <router-link :to="{name: 'Note', params: {id: item.id}}">
                <button class="btn">voir</button>
            </router-link>
        </td>
      </tr>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    });

    const apercu = computed(() => {
       return props.item.body.substring(0,50) + '...'
    })
</script>