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

        if (str.includes("📞")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("📞", str)[0],
                getIndicesOf("📞", str)[1] + 2
            );
            // console.log('📞')
            result = result.replace(subStr, "")
            const mobile = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("📞", str)[0] + 2,
                getIndicesOf("📞", str)[1]
            )
            await dalApi.addUserContacts(sessionId, null, mobile, null)
            console.log(mobile);
            // далее можно совершать действия с номером телефона, например отправлять на сервер
        }
        if (str.includes("✉️")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("✉️", str)[0],
                getIndicesOf("✉️", str)[1] + 2
            );
            // console.log('✉️')
            result = result.replace(subStr, "")
            const email = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("✉️", str)[0] + 2,
                getIndicesOf("✉️", str)[1]
            )
            await dalApi.addUserContacts(sessionId, email, null, null)
            console.log(email);
        }
        if (str.includes("👤")) {
            subStr = str.substring( // извлекаем целую подстроку вместе с триггер символами для ее дальнейшего удаления
                getIndicesOf("👤", str)[0],
                getIndicesOf("👤", str)[1] + 2
            );
            // console.log('👤')
            result = result.replace(subStr, "")
            const name = str.substring( // извлекаем только номер телефона из подстроки
                getIndicesOf("👤", str)[0] + 2,
                getIndicesOf("👤", str)[1]
            )
            await dalApi.addUserContacts(sessionId, null, null, name)
            console.log(name);
        }
        if (!subStr) return str
        else
            return result

    }