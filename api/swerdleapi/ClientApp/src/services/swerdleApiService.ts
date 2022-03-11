export function checkWord(wordToCheck: string, successCallback: Function, errorCallback?: Function){
    return fetch("/word/checkWord?wordToCheck=" + wordToCheck, { method: "POST"})
            .then(result => result.json())
            .then((result) => {
                if(successCallback){
                    successCallback(result);
                }
            })
            .catch((error) => {
                if(errorCallback){
                    errorCallback(error);
                }
            });
}

export function getNewWord(successCallback: Function, errorCallback?: Function){
    return fetch("/word/newWord")
            .then(result => result.json())
            .then((result) => {
                if(successCallback){
                    successCallback(result);
                }
            })
            .catch((error) => {
                if(errorCallback){
                    errorCallback(error);
                }
            });
}