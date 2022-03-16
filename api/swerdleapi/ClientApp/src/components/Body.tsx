import Keyboard from "./Keyboard";
import GuessGrid from "./GuessGrid";
import React, { useEffect } from "react";
import { GameState } from "../types/GameState";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper/Paper";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { getEmptyGuessState, loadFromStorage, resetKeyboardCursor, saveToStorage, StorageObj } from "../utils/statePersistence";
import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid/Grid";
import NavBar from '../components/NavBar';
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";

const StackRow = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: "None"
  }));
  
export default function Body() {
    const [guesses, setGuesses] = React.useState(getEmptyGuessState());
    const [currentGuessIndex, setCurrentGuessIndex] = React.useState(0);
    const [gameState, setGameState] = React.useState(GameState.New);
    const [previousGameState, setPreviousGameState] = React.useState(GameState.New);
    const [correctWord, setCorrectWord] = React.useState("");
    const [saveMarker, setSaveMarker] = React.useState(0);
    const [loadMarker, setLoadMarker] = React.useState(0);
    const [resetKey, setResetKey] = React.useState(0);

    const saveState = () => {
        saveToStorage({
            guesses: guesses,
            correctWord: correctWord,
            turnIndex: currentGuessIndex,
            gameState: gameState
        } as StorageObj);
    };

    const reset = () =>{
        setGuesses(getEmptyGuessState());
        setCurrentGuessIndex(0);
        setGameState(GameState.New);
        setCorrectWord("");
        setSaveMarker(saveMarker + 1);
        setLoadMarker(loadMarker + 1);
        setResetKey(resetKey + 1);
        resetKeyboardCursor();
    };

    const updateGuesses = (newValue: string) => {
        let newGuessState = [...guesses.map(guess => ({...guess}))];
        newGuessState[currentGuessIndex].content = newValue;
        setGuesses(newGuessState);

        setSaveMarker(saveMarker + 1);
    };

    const commitGuessToGrid = () =>{
        let newGuessState = [...guesses.map(guess => ({...guess}))];
        newGuessState[currentGuessIndex].isCommitted = true;

        setGuesses(newGuessState);

        if (newGuessState[currentGuessIndex].content.toUpperCase() === correctWord.toUpperCase()){
            setGameState(GameState.Won);
        }else if(currentGuessIndex === 5){
            setGameState(GameState.Lost);
        }else{
            setCurrentGuessIndex(currentGuessIndex + 1);
        }

        setSaveMarker(saveMarker + 1);
    }

    useEffect(() => {
        if(saveMarker > 0){
            saveState();
        }
    }, [saveMarker]);

    useEffect(() => {
       loadFromStorage().then((sessionObj: StorageObj) => {
            setGuesses(sessionObj.guesses);
            setCurrentGuessIndex(sessionObj.turnIndex);
            setCorrectWord(sessionObj.correctWord);
            setGameState(sessionObj.gameState);
       });
    }, [loadMarker]);
    return (
        <>
            <Dialog sx={{marginTop: "-20vh"}} open={gameState !== GameState.InProgress && gameState !== GameState.Settings && gameState !== GameState.Help}>
                <DialogContent>
                    {gameState === GameState.New && 
                        <CircularProgress sx={{justifyContent: 'center'}} />
                    }
                    {gameState === GameState.Won && 
                        <>
                            <DialogContentText>
                                <Typography variant="h4">You Win!</Typography>
                            </DialogContentText>
                            <br/>
                            <Grid container justifyContent="center">
                                <Button variant="contained" color="success" onClick={() => {reset();}}>New Game</Button>
                            </Grid>
                        </>
                    }
                    {gameState === GameState.Lost && 
                        <>
                            <DialogContentText>
                                <Typography variant="h4">{correctWord.toUpperCase()}</Typography>
                            </DialogContentText>
                            <br/>
                            <Grid container justifyContent="center">
                                <Button variant="contained" color="success" onClick={() => {reset();}}>New Game</Button>
                            </Grid> 
                        </>
                    }
                </DialogContent>
            </Dialog>
            <Dialog open={gameState === GameState.Settings}>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Settings
                    <IconButton aria-label="close"
                        onClick={() => { setGameState(previousGameState); }}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 12,
                          color: "#000"
                        }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{marginBottom: "5px", marginTop:"10px"}}>Begin New Game:</Typography>
                    <Grid container justifyContent="center">
                        <Button variant="contained" color="success" onClick={() => {reset();}}>Reset</Button>
                    </Grid> 
                </DialogContent>
            </Dialog>
            <Dialog open={gameState === GameState.Help}>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Help
                    <IconButton aria-label="close"
                        onClick={() => { setGameState(previousGameState); }}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 12,
                          color: "#000"
                        }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>Wordle clone by <a target="_blank" href="https://github.com/KevinOneSixDotNet/swerdle">Kevin Menegay</a> <b>-</b> Play the <a target="_blank" href="https://www.nytimes.com/games/wordle/index.html">original</a></Typography>
                    <br/>
                    <Typography><i>You can begin a new game under the settings menu</i></Typography>
                </DialogContent>
            </Dialog>
            <Stack height={"calc(100vh - " + (window.outerHeight - window.innerHeight).toString() + "px - 25px)"} 
                spacing={{xs: 0, sm: .5, md: 1}} direction="column" justifyContent="space-between">
                <StackRow sx={{padding: 0}}>
                    <NavBar helpClickHandler={() => {
                        setPreviousGameState(gameState);
                        setGameState(GameState.Help);
                    }}
                    settingsClickHandler={() => {
                        setPreviousGameState(gameState);
                        setGameState(GameState.Settings);
                    }}/>
                </StackRow>
                <StackRow>
                    <GuessGrid guesses={guesses} correctWord={correctWord} />
                </StackRow>
                <StackRow>
                    <Keyboard currentGuess={guesses[currentGuessIndex]} 
                        resetKey={resetKey}
                        guessList={guesses} 
                        updateCurrentGuess={updateGuesses} 
                        commitGuess={commitGuessToGrid}
                        correctWord={correctWord} />
                </StackRow>
            </Stack>
        </>
        
    )
}