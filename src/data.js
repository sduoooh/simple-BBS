import { ref } from "vue"
import { useStorage } from '@vueuse/core'

export const useUserState = () =>
    useStorage('user', { isLoggedIn: false }, localStorage, {
        mergeDefaults: true
    })

export function handleLogout(){
    const user = useUserState()
    user.value.isLoggedIn = false
}

export const beforePage = ref(false)