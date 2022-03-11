import { Guess } from "../types/Guess";
import BackspaceIcon from '@mui/icons-material/Backspace';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import Button from "@mui/material/Button/Button";
import styled from "@mui/material/styles/styled";

const Item = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    backgroundColor: "#C5C5C5",
    textAlign: 'center',
    width: "57px",
    height: "57px",
    fontSize: "30px",
    minWidth: "0px",
    border: "1px #C5C5C5 solid",
    "&:hover": {
        color: "#000"   
    }
  }));

export interface KeyboardItemProps {
    correctWord: string,
    index: number,
    letter: string,
    guessList: Guess[],
    isBackspace?: boolean,
    isEnter?: boolean,
    onClickHandler(event?: any): void,
};

export default function KeyboardItem(props: KeyboardItemProps){
    const getBackgroundColor = (currentLetter: string, guesses:Guess[]) => {
      let correctWord = props.correctWord;
      let letterIsFoundOnceInRightSpot = false;
      let letterIsFoundInGuessOnce = false;
      let letterIsNotInWordAtAllAndUsedOnce = false;
      let currentLetterUpper = currentLetter.toUpperCase();
      guesses.filter(guess => guess.isCommitted).forEach(guess => {
          guess.content.split("").forEach((guessLetter, guessLetterIndex) => {
              let guessLetterUpper = guessLetter.toUpperCase();
              if(currentLetterUpper === guessLetterUpper && currentLetterUpper === correctWord.toUpperCase().charAt(guessLetterIndex)){
                  letterIsFoundOnceInRightSpot = true;
              }else{
                  if (guess.content.toUpperCase().indexOf(currentLetterUpper) > -1){
                      if (correctWord.toUpperCase().indexOf(currentLetterUpper) > -1){
                          letterIsFoundInGuessOnce = true;
                      }else{
                          letterIsNotInWordAtAllAndUsedOnce = true;
                      }
                  }
              }
          });
      });
      if(letterIsFoundOnceInRightSpot){
          return "#6aaa64";
      }else if (letterIsFoundInGuessOnce){
          return "#c9b458";
      }else if (letterIsNotInWordAtAllAndUsedOnce){
          return "#787c7e";
      }else{
          return "#C5C5C5";
      }
  };  

  const getColor = (currentLetter: string, guesses: Guess[]) => {
      let letterIsUsed = false;
      guesses.filter(guess => guess.isCommitted).forEach(guess => {
          if(guess.content.toUpperCase().indexOf(currentLetter.toUpperCase()) > -1){
              letterIsUsed = true;
          }
      });
      if(letterIsUsed){
          return "#fff";
      }else{
          return "#000";
      }
  };

  return (
      <>
        {props.isEnter && <Item key={props.index} onClick={props.onClickHandler}><KeyboardTabIcon/></Item>}
        {props.isBackspace && <Item key={props.index} onClick={props.onClickHandler}><BackspaceIcon/></Item>}
        {!props.isEnter && !props.isBackspace && <Item key={props.index} onClick={props.onClickHandler}
              sx={{backgroundColor: getBackgroundColor(props.letter, props.guessList), 
                  color: getColor(props.letter,props.guessList)}}>
                  {props.letter}
            </Item>
        }
      </>
  );
}