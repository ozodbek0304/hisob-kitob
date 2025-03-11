import { TOKEN } from "./localstorage-keys"


export const setAccessToken = (token: string) => {
    localStorage.setItem(TOKEN, token)
}