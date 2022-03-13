import Container from "@mui/material/Container/Container";
import Stack from "@mui/material/Stack/Stack";
import { Guess } from "../types/Guess";
import GuessRow from "./GuessRow";

export interface GuessGridProps {
    guesses: Guess[],
    correctWord: string
};

export default function GuessGrid(props: GuessGridProps){
    // let windowHeight = window.innerHeight;
    // let spacing = windowHeight < 700 ? 1.75 : 2.25;
    // spacing = windowHeight < 745 ? spacing : 2.5;
    // spacing = windowHeight < 850 ? spacing : 2.75;

    let currentGuessIndex = props.guesses.filter((guess: Guess) => { return guess.isCommitted }).length;

    return (
        <Container fixed>
            <Stack direction="column" spacing={{xs: .55, sm: 2}}>
                {props.guesses.map((guess, index) => {
                    return (
                        <GuessRow key={index} isCurrentGuess={currentGuessIndex === index} currentGuess={guess} correctWord={props.correctWord} />
                    );
                })}
            </Stack>
        </Container>
    )
}