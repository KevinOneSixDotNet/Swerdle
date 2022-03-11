import Paper from "@mui/material/Paper/Paper";
import Stack from "@mui/material/Stack/Stack";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography/Typography";
import { Guess } from "../types/Guess";

export interface GuessRowProps
{
    currentGuess: Guess,
    correctWord: string,
    isCurrentGuess: boolean
};

const isMobile = window.innerWidth < 768;


const StackGuessRow = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: isMobile ? "6.5vh" : "7.5vh",
    height: isMobile ? "6.5vh" : "7.5vh",
    paddingTop: isMobile ? "0.25vh" : "1.5vh"
  }));

export default function GuessRow(props: GuessRowProps){
    var characters = props.currentGuess.content.split("");
    
    const getBackgroundColor = (currentLetter: string, letterIndex: number, guess: Guess) => {
        var correctWord = props.correctWord.toUpperCase();
        var currentGuessWord = guess.content.toUpperCase();
        var isCommitted = guess.isCommitted;

        if(!isCommitted){
            return "#fff";
        }

        if(currentLetter === correctWord.charAt(letterIndex)){
            return "#6aaa64";
        }else if (correctWord.indexOf(currentLetter.toUpperCase()) > -1){
            //Can only mark remaining occurrences not in the correct spot as yellow and only as many that remain
            let totalOccurencesOfGuessLetterInCorrectWord = correctWord.split(currentLetter).length - 1;
            let currentLetterOccurrenceCount = currentGuessWord.substring(0, letterIndex + 1).split(currentLetter).length - 1;
            let currentTotalCorrectOfGuessLetter = 0; 

            for (var correctOccurrenceIndex = 0; correctOccurrenceIndex < currentGuessWord.length; correctOccurrenceIndex ++){
                let letterToCheck = currentGuessWord.charAt(correctOccurrenceIndex);

                if(currentLetter === letterToCheck && currentGuessWord.charAt(correctOccurrenceIndex) === correctWord.charAt(correctOccurrenceIndex)){
                    currentTotalCorrectOfGuessLetter = currentTotalCorrectOfGuessLetter + 1;
                }
            }

            if (totalOccurencesOfGuessLetterInCorrectWord - currentTotalCorrectOfGuessLetter - currentLetterOccurrenceCount >= 0){
                return "#c9b458";
            }
        }
        
        return "#787c7e";
    };
    
    const getBorder = (currentGuess: Guess, index: number) => {
        if(!currentGuess.isCommitted && index === currentGuess.content.split(" ")[0].length && props.isCurrentGuess){
            return "#000000 solid 3.25px";
        }
        
        return "#979797 solid 2px";
    }

    const getColor = (isCommitted: boolean) => {
        return isCommitted ? "#fff" : "#000";
    };

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent="center">
                {characters.map((char, index) => {
                   return(
                    <StackGuessRow key={index} sx={{border: getBorder(props.currentGuess, index), color: getColor(props.currentGuess.isCommitted), backgroundColor: getBackgroundColor(char, index, props.currentGuess)}} >
                        <Typography textAlign="center" fontSize="4vh">{char.toUpperCase()}</Typography>
                    </StackGuessRow>
                    );
                })}
            </Stack>
        </>
    )
}