import { createRouter, createWebHistory } from "vue-router";

//importation des pages 
import Home from "@/views/home.vue";
import Create from "@/views/create.vue";
import Note from "@/views/note.vue";

const routes  = [
    {path: '/', name: 'Home', component: Home},
    {path: '/create', name: 'Create', component: Create},
    {path: '/note/:id', name: 'Note', component: Note}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router