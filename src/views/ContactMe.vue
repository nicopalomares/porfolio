<template>
    <div class="contact_container">
        <div class="text_container">
            <h1>CONTACT ME</h1>
        </div>
        <div class="form_container">
            <form @submit.prevent="handleSubmit">
                <!-- Email -->
                <div class="input_container">
                    <label for="email" class="block font-semibold">Email</label>
                    <input id="email" v-model="email" type="email" class="border p-2 w-full rounded"
                        :class="{ 'border-red-500': emailError }" />
                    <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
                </div>

                <!-- Mensaje -->
                <div class="input_container">
                    <label for="message" class="block font-semibold">Mensaje</label>
                    <textarea id="message" v-model="message" class="border p-2 w-full rounded" rows="4"></textarea>
                </div>

                <!-- Botón de enviar -->
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Enviar
                </button>
            </form>
        </div>

    </div>

</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from "@/stores/useDataStore.js"

const email = ref('')
const message = ref('')
const emailError = ref('')

function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
}

function handleSubmit() {
    emailError.value = ''

    if (!validateEmail(email.value)) {
        emailError.value = 'Por favor ingrese un email válido.'
        return
    }

    // Aquí iría la lógica para enviar los datos
    alert('Formulario enviado correctamente 🎉')
}


onMounted(async () => {
    setData()
})

// watch(() => route.params.id, () => {
//     setData()
// })

</script>

<style lang="stylus">

.contact_container
    display: flex
    height: 100vh
    background-color: $blackColor
    color: $blueColor
    .form_container
        width 50%
        form
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 5rem;
            padding: 10rem 4rem;
            .input_container
                display: flex;
                flex-direction: column;
                width 100%
                label
                    font-size: 1.2rem
                    margin-bottom: 0.5rem
                input, textarea
                    color: $blueColor
                    padding: 1rem
                    border-radius: 0.5rem
                    border: 1px solid #92daff;
                    background-color: transparent;
                    &:focus
                        outline: none
                        border-color: none


            button
                width: 100%;
                height: 3rem;
                background: transparent;
                border: none;
                color: $blueColor;
                font-size: 2rem;
                cursor pointer
                transition: all 0.3s ease-in-out;
                &:hover
                        scale: 1.1
    .text_container
        width 50%
        padding: 8rem 6rem;


</style>