// store.js
import {computed, reactive} from 'vue'

const token = computed(() => localStorage.getItem('token'))
export const authService = reactive({
    userFullName: '',
    role: '',
    getUserInfo() {
        fetch('http://localhost:8080/api/auth', {
            method: 'GET',
            headers: {
                authorization: token.value ? `Bearer ${token.value}` : null
            }
        }).then(response => response.json())
            .then(data => {
                this.userFullName = data.fullName
                this.role = data.role
            })
    }
})