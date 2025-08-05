<template>
    <div class="contact_container">
        <router-link to="/" class="back_button">
            <img src="@/assets/icons/arrow_right.svg" alt="">
        </router-link>
        <div class="text_container">
            <h1>{{ t('contact.title') }}</h1>
        </div>
        <div class="form_container">
            <form @submit.prevent="handleSubmit">

                <!-- Nombre -->
                <div class="input_container">
                    <label for="name" class="block font-semibold">{{ t('contact.name') }}</label>
                    <input id="name" v-model="name" type="text" class="border p-2 w-full rounded" />
                </div>
                <!-- Email -->
                <div class="input_container">
                    <label for="email" class="block font-semibold">{{ t('contact.email') }}</label>
                    <input id="email" v-model="email" type="email" class="border p-2 w-full rounded"
                        :class="{ 'border-red-500': emailError }" />
                    <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
                </div>

                <!-- Mensaje -->
                <div class="input_container">
                    <label for="message" class="block font-semibold">{{ t('contact.message') }}</label>
                    <textarea id="message" v-model="message" class="border p-2 w-full rounded" rows="4"></textarea>
                </div>

                <!-- Botón de enviar -->
                <button type="submit" class=" text-white px-4 py-2 rounded hover:bg-blue-700">
                    {{ t('contact.send') }}
                </button>
            </form>
        </div>

    </div>

</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import router from '@/router'

const email = ref('')
const dataStore = useDataStore()
const message = ref('')
const emailError = ref('')
const name = ref('')
const { t } = useI18n();

function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
}


async function handleSubmit() {
    emailError.value = ''

    if (!validateEmail(email.value)) {
        emailError.value = t('contact.errorEmailMessage')
        return
    } else {
        const res = await dataStore.sendEmail(email.value, message.value, name.value)
        if (res) {
            t('contact.succes')
            router.push('/')
        } else {
            t('contact.error')
        }
    }
}

</script>

<style lang="stylus">

.contact_container
    display: flex
    height: 100vh
    .back_button
        width 3rem
        height: 3rem
        position: absolute
        left: 4rem
        transform: rotate(180deg);
        top: 1.6rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover
            color: $pinkColor
            scale: 1.1
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
                border: 1px solid #92daff;
                border-radius: 0.5rem
                font-size: 2rem;
                cursor pointer
                transition: all 0.3s ease-in-out;
                &:hover
                        scale: 1.1
    .text_container
        width 50%
        padding: 8rem 6rem;

@media screen and (max-width: 768px)
    .contact_container
        flex-direction: column;
        height: 100vh;
        .back_button
            left: 2rem;
        .form_container
            width: 100%;
            padding: 2rem;
            form
                padding: 0
                gap: 3rem
        .text_container
            width: 100%;
            text-align: center;
            padding: 8rem 1rem 0rem 1rem;
            h1
                font-size: 2rem;
                margin-bottom: 1rem;
</style>