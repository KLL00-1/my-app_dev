import { dalApi } from "./dal.api";

export const combineStringFunction =
    async (str, sessionId) => {

        function getIndicesOf(searchStr, str) {
            var startIndex = 0,
                searchStrLen = searchStr.length;
            var index,
                indices = [];

            while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                indices.push(index);
                startIndex = index + searchStrLen;
            }
            return indices;
        }

        let subStr = '';
        let result = str

        let mobile = null
        let email = null
        let name = null


        if (str.includes("📞")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("📞", str)[0],
                getIndicesOf("📞", str)[1] + 2
            );
            // console.log('📞')
            result = result.replace(subStr, "")
            mobile = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("📞", str)[0] + 2,
                getIndicesOf("📞", str)[1]
            )
            // console.log(mobile);
            // далее можно совершать действия с номером телефона, например отправлять на сервер
        }
        if (str.includes("✉️")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("✉️", str)[0],
                getIndicesOf("✉️", str)[1] + 2
            );
            // console.log('✉️')
            result = result.replace(subStr, "")
            email = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("✉️", str)[0] + 2,
                getIndicesOf("✉️", str)[1]
            )
            // console.log(email);
        }
        if (str.includes("👤")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("👤", str)[0],
                getIndicesOf("👤", str)[1] + 2
            );
            // console.log('👤')
            result = result.replace(subStr, "")
            name = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("👤", str)[0] + 2,
                getIndicesOf("👤", str)[1]
            )

            // console.log(name);
        }
        if (str.includes("📞") || str.includes("✉️") || str.includes("👤"))
            await dalApi.addUserContacts(sessionId, email, mobile, name)

        if (!subStr) return str
        else
            return result

    }
export const validate = (formState, setError) => {
    const { name, phone, email } = formState;
    if (!name.trim() || !phone.trim() || !email.trim()) {
        setError("Пожалуйста, заполните все поля");
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("Введите корректный email");
        return false;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
        setError("Введите корректный телефон");
        return false;
    }
    setError("");
    return true;
};

