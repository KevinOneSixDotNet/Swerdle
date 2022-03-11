import { getNewWord } from "../services/swerdleApiService";
import { GameState } from "../types/GameState";
import { Guess } from "../types/Guess";

export interface StorageObj {
    guesses: Guess[];
    correctWord: string;
    turnIndex: number;
    gameState: GameState;
}

export function getEmptyGuessState(){
    let rows = [1,2,3,4,5,6];
    return rows.map((rowNumber) => {
        return ({content:"     ", index:rowNumber, isCommitted: false } as Guess);
    });
}

export function loadFromStorage() : Promise<StorageObj>{
    let session =  localStorage.getItem("swerdlesession");

    if(session){
        let sessionObj = JSON.parse(session);

        if(sessionObj.correctWord.length){
            return new Promise(resolve =>{
                resolve(sessionObj as StorageObj);
            });
        }
        
    }
    
    return new Promise(resolve =>{
        getNewWord((result: any) => {
            resolve({
                guesses: getEmptyGuessState(),
                correctWord: result.newWord,
                turnIndex: 0,
                gameState: GameState.InProgress
            } as StorageObj)
        });
    });
}

export function saveToStorage(obj: StorageObj){
    let session = JSON.stringify(obj);

    localStorage.setItem("swerdlesession", session);
}