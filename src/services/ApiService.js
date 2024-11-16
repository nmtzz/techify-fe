import {computed, ref} from "vue";
import axios from "axios";

const baseApi = 'http://localhost:8080/api/'
const token = computed(() => localStorage.getItem('token'))
const api = axios.create({
    baseURL: baseApi,
    headers: {
        'Authorization': token.value ? `Bearer ${token.value}` : null
    }
})
export default api

export function generateFormData(elementId) {
    const formElement = document.getElementById(elementId)
    return new FormData(formElement)
}

export function resetForm(elementId) {
    const formElement = document.getElementById(elementId)
    formElement.reset()
}