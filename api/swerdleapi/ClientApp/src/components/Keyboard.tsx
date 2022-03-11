import React, { useEffect } from "react";
import { Guess } from "../types/Guess";
import {checkWord} from "../services/swerdleApiService"
import KeyboardItem from "./KeyboardItem";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper/Paper";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Stack from "@mui/material/Stack/Stack";

const KeyboardRow = styled(Paper)(({ theme }) => ({
    boxShadow: "none"
  }));

export interface KeyboardProps {
    currentGuess: Guess,
    guessList: Guess[],
    updateCurrentGuess: Function,
    commitGuess: Function
    correctWord: string
}

export default function Keyboard(props: KeyboardProps){
    const [currentGuessIndex, setCurrentGuessIndex] = React.useState(0);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarVisibility, setSnackbar] = React.useState(false);

    const keyboardCursorHandler = (cursor: number) => {
        setCurrentGuessIndex(cursor);
        let cursorJson = JSON.stringify(cursor);
        localStorage.setItem("swerdlekeyboard", cursorJson);
    }

    useEffect(() => {
        let storedKeyboardCursor = localStorage.getItem("swerdlekeyboard");

        if (storedKeyboardCursor){
            let storedKeyboardCursorObj = JSON.parse(storedKeyboardCursor) as number;
            setCurrentGuessIndex(storedKeyboardCursorObj)
        }
    }, [])

    const replaceAt = (base: string, index:number, replacement: string) => {
        return base.substr(0, index) + replacement + base.substr(index + replacement.length);
    }

    const letterPress = (letter?: string) => {
        if(!letter && currentGuessIndex > 0){
            let newGuessValue = replaceAt(props.currentGuess.content, currentGuessIndex - 1, " ");
            props.updateCurrentGuess(newGuessValue);
            keyboardCursorHandler(currentGuessIndex - 1);
        }
        
        if(letter && currentGuessIndex < 5){
            let newGuessValue = replaceAt(props.currentGuess.content, currentGuessIndex, letter);
            props.updateCurrentGuess(newGuessValue);
            keyboardCursorHandler(currentGuessIndex + 1);
        }
    }

    const enterPress = () => {
        if(currentGuessIndex < 5){
            toggleSnackbar("Enter a full word");
        }
        
        if(currentGuessIndex === 5){
            checkWord(props.currentGuess.content, (result: any) => {
                if(result.validationResult){
                    props.commitGuess();
                    keyboardCursorHandler(0);
                }else{
                    toggleSnackbar("Not a valid word");
                }
            });
        }
    }

    const toggleSnackbar = (message?: string) => {
        setSnackbar(!snackbarVisibility);
        if(message){
            setSnackbarMessage(message);
        }
    };

    const row1Letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const row2Letters = ["A", "S", "D", "F" , "G", "H", "J", "K", "L"];
    const row3Letters = ["Z", "X", "C", "V", "B", "N", "M"];
    
    let keyboardItemXsColSpacing = 0.75;

    return (
        <>
            <Snackbar
              anchorOrigin={{vertical: "top", horizontal: "center"}}
              open={snackbarVisibility}
              onClose={() => { toggleSnackbar(); }}
              message={snackbarMessage}
              key={"center top"}
              autoHideDuration={2500}
            />
            <Stack direction="column" spacing={{xs:1.75}}>
                <KeyboardRow>
                    <Stack direction="row" spacing={{xs: keyboardItemXsColSpacing}} justifyContent="center">
                        {row1Letters.map((letter, index) => {
                            return (<KeyboardItem key={index} index={index} letter={letter} onClickHandler={() => letterPress(letter)} 
                                correctWord={props.correctWord} guessList={props.guessList} />);
                        })}
                    </Stack>
                </KeyboardRow>
                <KeyboardRow>
                    <Stack direction="row" spacing={{xs: keyboardItemXsColSpacing}} justifyContent="center">
                        {row2Letters.map((letter, index) => {
                            return (<KeyboardItem key={index} index={index} letter={letter} onClickHandler={() => letterPress(letter)} 
                                correctWord={props.correctWord} guessList={props.guessList} />);
                        })}

                    </Stack>
                </KeyboardRow>
                <KeyboardRow>
                    <Stack direction="row" spacing={{xs: keyboardItemXsColSpacing}} justifyContent="center">
                        <KeyboardItem key={100} index={100} letter={""} onClickHandler={() => enterPress()} 
                            correctWord={props.correctWord} guessList={props.guessList} isEnter={true} />
                        {row3Letters.map((letter, index) => {
                            return (<KeyboardItem key={index}  index={index} letter={letter} onClickHandler={() => letterPress(letter)} 
                            correctWord={props.correctWord} guessList={props.guessList} />);
                        })}
                        <KeyboardItem key={101} index={101} letter={""} onClickHandler={() => letterPress()} 
                            correctWord={props.correctWord} guessList={props.guessList} isBackspace={true} />
                    </Stack>
                </KeyboardRow>
            </Stack>
        </>
    )
}