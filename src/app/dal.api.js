import axios from "axios";



export const URL = "http://localhost:8080/";
// export const URL = "https://notification.pep-server.ru/";


const instance = axios.create({
    baseURL: URL,
    withCredentials: true
});

export const dalApi = {
    askBot: async (message) => {
        return instance.post("api/ask", { message }).then(res => res.data.content)
    },
    createNewSessionOrUpdateChat: async (sessionId, chat) => {
        return instance.post("api/add-session", { sessionId, chat }).then(res => res.data)
    },
    addUserContacts: async (sessionId, email = null, phone = null, name = null) => {
        return instance.post("api/add-contacts", { sessionId, email, phone, name }).then(res => res.data)
    }
}
