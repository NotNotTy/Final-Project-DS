import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ICLogo from './assets/images/ICLogo.png'
import GuessesLogo from './assets/images/grey.png'
import './App.css'
import './startScreen.css'
import './gameScreen.css'
import { animated, useSpring } from "react-spring";
import React from 'react'
import {useEffect} from 'react'
import {getTheme, getField} from './DataRetriever.jsx'



function App() {
  const [count, setCount] = useState(0)
  const [startGame, updateStartGame] = useState(false);
  //your input, seperated by characters
  const [inputArray, updateInputState] = useState(Array(5).fill(null));
  //your input, NOT seperated by characters
  const [inputString, updateInputString] = useState("");
  //current guesses
  const[valueArrays, updateValueArrays] = useState(Array.from({length: 5},()=> Array.from({length: 5}, () => null)));
  //all the characters for the answers, in an array
  const[answerArrays, updateAnswerArrays] = useState(Array.from({length: 5},()=> Array.from({length: 5}, () => null)));
  //if the space is correct or not
  const[correctArray, updateCorrectArray] = useState(Array.from({length: 5},()=> Array.from({length: 5}, () => false)));
  //all answers, but in a string and not seperated by characters
  const[answerStringArray, updateAnswerStringArray] = useState(Array(5));

  const [currentRow, updateCurrentRow] = useState(0);
  const [currentColumn, updateCurrentColumn] = useState(0);
  const [displayPopup, updateDisplayPopup] = useState(false);
  const [displayPopupMessage, updateDisplayPopupMessage] = useState("");
  const[endgameMessage, updateEndgameMessage] = useState("");
  const [themeName, updateThemeName] = useState("");
  const[themeSelction, updateThemeSelection] = useState("0");
  const[gameOver, updateGameOver] = useState(false);
  const[guessesLeft, updateGuesssesLeft] = useState(8);
  const[lettersInCurrentWord, updateLettersInCurrentWord] = useState([]);
  const[wordsFoundInOtherRows, updateWordsFoundInOtherRows] = useState([]);
  //0: start, 1: end: 2: value to skip: 3: value to end skip. -1 means null
  const[inputPos, updateInputPos] = useState([0,5,-1,-1]);



  

  const RowOne = props => {
    
    return (
      <React.Fragment>
        <Square value = {inputArray[0]} rowNumber = {0} columnNumber = {0}/>
        <Square value = {inputArray[1]}rowNumber = {0} columnNumber = {1}/>
        <Square value = {inputArray[2]}rowNumber = {0} columnNumber = {2}/>
        <Square value = {inputArray[3]}rowNumber = {0} columnNumber = {3}/>
        <Square value = {inputArray[4]}rowNumber = {0} columnNumber = {4}/>
      </React.Fragment>
    )
  }
  const RowTwo = props => {
    return (
      <React.Fragment>
        <Square value = {inputArray[0]}rowNumber = {1} columnNumber = {0}/>
        <Square value = {inputArray[1]}rowNumber = {1} columnNumber = {1}/>
        <Square value = {inputArray[2]}rowNumber = {1} columnNumber = {2}/>
        <Square value = {inputArray[3]}rowNumber = {1} columnNumber = {3}/>
        <Square value = {inputArray[4]}rowNumber = {1} columnNumber = {4}/>
      </React.Fragment>
    )
  }
  const RowThree = props => {
    return (
      <React.Fragment>
        <Square value = {inputArray[0]}rowNumber = {2} columnNumber = {0}/>
        <Square value = {inputArray[1]}rowNumber = {2} columnNumber = {1}/>
        <Square value = {inputArray[2]}rowNumber = {2} columnNumber = {2}/>
        <Square value = {inputArray[3]}rowNumber = {2} columnNumber = {3}/>
        <Square value = {inputArray[4]}rowNumber = {2} columnNumber = {4}/>
      </React.Fragment>
    )
  }
  const RowFour = props => {
    return (
      <React.Fragment>
        <Square value = {inputArray[0]}rowNumber = {3} columnNumber = {0}/>
        <Square value = {inputArray[1]}rowNumber = {3} columnNumber = {1}/>
        <Square value = {inputArray[2]}rowNumber = {3} columnNumber = {2}/>
        <Square value = {inputArray[3]}rowNumber = {3} columnNumber = {3}/>
        <Square value = {inputArray[4]}rowNumber = {3} columnNumber = {4}/>
      </React.Fragment>
    )
  }
  const RowFive = props => {
    return (
      <React.Fragment>
        <Square value = {inputArray[0]}rowNumber = {4} columnNumber = {0}/>
        <Square value = {inputArray[1]}rowNumber = {4} columnNumber = {1}/>
        <Square value = {inputArray[2]}rowNumber = {4} columnNumber = {2}/>
        <Square value = {inputArray[3]}rowNumber = {4} columnNumber = {3}/>
        <Square value = {inputArray[4]}rowNumber = {4} columnNumber = {4}/>
      </React.Fragment>
    )
  }

  

  /* Game Functions */
  function GetCurrentDate(){
    const monthNames = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newDate = new Date()
    let date = newDate.getDate();
    let month = monthNames[newDate.getMonth()];
    let year = newDate.getFullYear();
    let day = newDate.getDay();

    return (
      <p id="dateName">{month} {date}, {year}</p>
    )
  
    }

  function Square({value, rowNumber, columnNumber}) {
    let copy = [...valueArrays]
    if (value === null){
      value = "";
    }
    if (correctArray[rowNumber][columnNumber] == true){ //IF IT HAS ALREADY BEEN PROVEN TRUE
      return (
        <button className="squareButton" id="greenSqaure">
          {answerArrays[rowNumber][columnNumber]}
        </button>
      )
    }

    // else if (correctArray[rowNumber][columnNumber] == "yellow"){
    //   return (
    //   <button className="squareButton" id="yellowSquare">
    //       {answerArrays[rowNumber][columnNumber]}
    //     </button>
    //   )
    // }
    
    else {

      if (rowNumber == currentRow){ //if we are currently on the row that needs to be updated
        return (
          <button className="squareButton">
            {value}
          </button>
        );
      }
      else if (currentRow > rowNumber){
      return ( //get the value from the previous row
        <button className="squareButton">{copy[rowNumber][columnNumber]}</button>
      )
      }
      else {
        return (<button className="squareButton"></button>)
      }
  }
    }


    function PopupSquare(){
      if (displayPopup){
        setTimeout(() => {updateDisplayPopup(false); updateDisplayPopupMessage("");}, 1500);
      return <p className="popupSquare"> <b>{displayPopupMessage} </b></p>
      }
      
      return;
    }


    function Guesses(){
      var amountOfGuesses = [];
        for (var i = 0; i < guessesLeft; i++) {
          amountOfGuesses.push(<img src={GuessesLogo} id="guessesCircle"></img>);
        }
      return (
        <>
        {amountOfGuesses.map((item) => item)}
        </>
      )
    }

    /* PAGE SETUP METHODS */
    function StartScreen(){
      
      // const transitions = useTransition(showLogin, null, {
      //   from: { position: "absolute", opacity: 0 },
      //   enter: { opacity: 1 },
      //   leave: { opacity: 0 }
      // });

      return (
        <>
      
      <div className='titleCard'>
      <p id="titleName"> <b>Inverse Connections</b> </p>
       <GetCurrentDate />
   
      </div>
      
      <div className='startCard'>
      <img src={ICLogo} id="logo"></img>
      <h1> Inverse Connections </h1>
      <p> Find words associated with the given theme </p>
      <button onClick={() => handlePlayButton()} id="playButton"> Play </button>
      </div>

      <div className='footerCard'>
      <p> By: Tyler Thach</p>
      <p> Not in association with the New York Times, obviously. </p>
      </div>
      
    </>
      )
    }

   

    function GameScreen(){
      if (!gameOver){
      useEffect(() => {
        function handleKeyDown(e) {
          let updateColumn = 0;
          
          if (e.key.length === 1 && isNaN(e.key)){ //if a valid key is pressed           
          for (let i = inputPos[0]; i < inputPos[1]; i++){ //this updates the unfixed array for processing
            if (i == inputPos[2] || i == inputPos[3]){ //skip these columns
              updateColumn++;
              continue;
            }
            if (inputArray[i] == null){
              inputArray[i] = (e.key).toUpperCase();           
              updateColumn++;   
              
              break;
            }
          }

          
          updateCurrentColumn(updateColumn);
      
          
          let copy = [...valueArrays] //make a copy of the current array
          for (let i = 0; i < valueArrays.length; i++){ //fill it
            if (i == currentRow){
              for (let j = 0; j < valueArrays[i].length; j++){
                copy[i][j] = inputArray[j];
              }
            }
          }
         
          updateValueArrays(copy); //set it
          


          const nextValue = inputArray.map((value, index) =>{ //this updates the rendering
            return inputArray[index];
          })
          updateInputState(nextValue);
        }

        if (e.key == "Backspace"){
          for (let i = inputArray.length; i >= 0; i--){ //this updates the unfixed array for processing
            if (inputArray[i] != null){
              inputArray[i] = null;
              let copy = [...valueArrays]
              copy[currentRow][i] = null;
              updateValueArrays(copy);
              updateCurrentColumn(currentColumn - 1);
              break;
            }
          }

          const nextValue = inputArray.map((value, index) =>{ //this updates the rendering
            return inputArray[index];
          })
         
          updateInputState(nextValue);
        }

        if(e.key == "Enter"){ //put logic here later to check
          let shouldUpdate = true;
       


          for (let i = inputPos[0]; i < inputPos[1]; i++){
            if (i == inputPos[2] || i == inputPos[3]){
              continue;
            }
            if (inputArray[i] == null){
              shouldUpdate = false;
              break;
            }
          }
          if (shouldUpdate){
            handleGameUpdate();
          }
          else {
            updateDisplayPopup(true);
            updateDisplayPopupMessage("Fill out the row first!");
          }


          //check if the game is over
          
          


          
        
        }
        

         
          console.log(e.key);
          console.log(inputArray);
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
      }, []);
    
      
      
      

      
      
      
     
      return (
        <>
      <div className="container">   
      <div className='titleCard'>
      <p id="titleName"> <b>Inverse Connections</b> </p>
       <GetCurrentDate />
      </div>
      <PopupSquare/>
      <div className="spacerDiv">
      <p> Theme </p>
      <h1 id="themeName">{themeName}</h1>
      </div>
       <div className="spaces">
       <div id="hintSpace">
          <p><u>Letters in current word:</u></p>
          {lettersInCurrentWord.map((item) => <p>{item}</p>)}
      
        </div>
          <div id="gameSpace">
          <RowOne/>
          <div>
          <RowTwo/>
          </div>
          <div>
          <RowThree/>
          </div>
          <div>
          <RowFour/>
          </div>
          <div>
          <RowFive/>
          </div>

          
          </div>

    
          <div className="guessesSpace">
          <p id ="guessesTag"> <u>Guesses Remaining: </u></p>
          <Guesses/>
          
        </div>
        </div>
       

       
        </div>
        </>
      )
    }
    else {
      return (
        <>
      <div className="container" id ="blur">   
      <div className='titleCard'>
      <p id="titleName"> <b>Inverse Connections</b> </p>
       <GetCurrentDate />
      </div>
      <PopupSquare/>
      <div className="spacerDiv">
      <p> Theme </p>
      <h1 id="themeName">{themeName}</h1>
      </div>
      <div className="spaces">
       <div id="hintSpace">
          <p><u>Letters in current word:</u></p>
          {lettersInCurrentWord.map((item) => <p>{item}</p>)}
        </div>
          <div id="gameSpace">
          <RowOne/>
          <div>
          <RowTwo/>
          </div>
          <div>
          <RowThree/>
          </div>
          <div>
          <RowFour/>
          </div>
          <div>
          <RowFive/>
          </div>

          
          </div>

    
          <div className="guessesSpace">
          <p id ="guessesTag"> <u>Guesses Remaining: </u></p>
          <Guesses/>
          
        </div>
        </div>
        </div>
        <div className="BlurryDisplayBox"> 
          <h1>{endgameMessage}</h1>
          <p> Guesses remaining: {guessesLeft}</p>
          <h2> Answers </h2>
            <p>{answerStringArray[0]}</p>
            <p>{answerStringArray[1]}</p>
            <p>{answerStringArray[2]}</p>
            <p>{answerStringArray[3]}</p>
            <p>{answerStringArray[4]}</p>
          
        </div>
        </>
      )

    }
    }

    /* HANDLIERS */
    async function handlePlayButton(){ //sets up all the neccessary data for the game
      let themeSelction = (Math.trunc(Math.random() * 5)).toString();
      updateThemeName(await getTheme(themeSelction));
      let copy = [...answerArrays];
      let item1 = await getField(themeSelction, "item1");
      let item2 = await getField(themeSelction, "item2");
      let item3 = await getField(themeSelction, "item3");
      let item4 = await getField(themeSelction, "item4");
      let item5 = await getField(themeSelction, "item5");

      for (let i = 0; i < copy.length; i++){
        for (let j = 0; j < copy[0].length; j++){
          switch(i){
            case 0:
              copy[i][j] = item1.charAt(j);
              continue;
            case 1:
              copy[i][j] = item2.charAt(j);
              continue;
            case 2:
              copy[i][j] = item3.charAt(j);
              continue;
            case 3:
              copy[i][j] = item4.charAt(j);
              continue;
            case 4:
              copy[i][j] = item5.charAt(j);
              continue;
          }
        }
      }
      updateAnswerStringArray([item1,item2,item3,item4,item5]);
      updateAnswerArrays(copy);
      console.log(answerArrays);
      updateStartGame(true);
      console.log(themeName);
    }

    function handleGameUpdate(){
      let copy = [...correctArray];
      let lettersInCurrentCopy = [...lettersInCurrentWord];
      let wordsFoundCopy = [...wordsFoundInOtherRows];
   
      // for (let i = 0; i < 5; i++){ //iterate through all the rows
    
        for (let j = inputPos[0]; j < inputPos[1]; j++){ //iterate through all of the columns in the current row
          if (j == inputPos[2] || j == inputPos[3]){ //these columns have already been solved
            continue;
          }
         for (let k = inputPos[0]; k < inputPos[1]; k++){
          if (inputArray[k] == null){
            continue;
          }
          if (answerArrays[currentRow][j].toLowerCase() == inputArray[k].toLowerCase() && j==k){ //if the character is in the same position
            copy[currentRow][j] = true;
          }
          else if (answerArrays[currentRow][j].toLowerCase() == inputArray[k].toLowerCase()){  //if they arent in the same position, but in the same word
            
            
            // console.log("Lettes in currentWord" + copy);
            let shouldContinue = true;
            for (let l = 0; l < lettersInCurrentCopy.length; l++){ //make sure we arent reporting back any copies
              if(lettersInCurrentCopy[l] == inputArray[k]){
                shouldContinue = false;
              }
            }
            if (shouldContinue){
              
            // lettersInCurrentCopy.concat([inputArray[k]]);
            lettersInCurrentCopy.push(inputArray[k]);
            
           
            // console.log("here" + lettersInCurrentWord);
          }
          }
         }
        }
      // }
      const resetInput = inputArray.map(() => {
        return null;
      });
      
      
      updateLettersInCurrentWord(lettersInCurrentCopy);
      updateCorrectArray(copy);

      //updates where to start/end as inputs
      let start = 0;
      let end = 5;
      let skipStart = -1;
      let skipEnd = -1;
      
      for (let i = 0; i < copy[0].length; i++){
        if (copy[currentRow][i] != true){
          start = i;
          break;
        }
      }

     
      for (let j = copy[0].length-1; j >= 0; j--){
        if (copy[currentRow][j] != true){
          end = j+1;
          break;
        }
      }
   
      for (let k = start; k < end; k++){
        if (copy[currentRow][k] == true){
          skipStart = k;
        }
      }

      for (let l = end; l > start; l--){
        if (copy[currentRow][l] == true){
          skipEnd = l;
        }
      }

      //logic to check if the row is completely right. If it isn't, try again
      let copy2 = [...valueArrays];
      let rowCompleted = true;
      for (let i = 0; i < 5; i++){
        if (copy[currentRow][i] != true){// the row isnt done 
          copy2[currentRow][i] = null;
          rowCompleted = false;
        }
      }

      //if the user guessed a word thats in a different row
      let tempInputString = "";
      let copyCorrectArray = [...correctArray];
      
      for (let i = 0; i < inputArray.length; i++){ //builds the string
        tempInputString += inputArray[i];
      }

      for (let j = 0; j < answerStringArray.length; j++){
        if (tempInputString.toUpperCase() == answerStringArray[j]){ //if the word has been found in another row
          for (let k = 0; k < correctArray.length; k++) {
            copyCorrectArray[j][k] = true;
          }
          let doContinue = true;
         
          for (let k =0; k <= wordsFoundCopy.length; k++){ // checks for dupes
            if (wordsFoundCopy[k] == answerStringArray[j] || rowCompleted || j < currentRow){
              doContinue = false;
            }
          }

      
          if (doContinue){ //the word has been found in a differen trow
          wordsFoundCopy.push(answerStringArray[j])
          updateCorrectArray(copyCorrectArray)
          updateWordsFoundInOtherRows(wordsFoundCopy);
          updateDisplayPopup(true);
          updateDisplayPopupMessage("Nice!");
          // updateGuesssesLeft(guessesLeft + 2);
        }
        }
      }

      //game was too hard

      // wordsFoundCopy.push(answerStringArray[j])
      // updateWordsFoundInOtherRows(wordsFoundCopy);
      // updateDisplayPopup(true);
      // updateDisplayPopupMessage("Nice!");
      // console.log(wordsFoundInOtherRows);
      


      if (rowCompleted){
        console.log("Row completed. Next Row:" + (currentRow + 1));
        
        let current = currentRow + 1;
        let toAdd = 0;
        for (let i = 1; i < correctArray.length - currentRow; i++){
          let shouldUpdate = true;
          console.log("run");
          for (let j = 0; j < correctArray.length; j++) {
          console.log(correctArray[currentRow+i][j])
          if (correctArray[currentRow+i][j] == true){ //if any of the next term is true
            continue;
          }
          else {
            shouldUpdate = false;
          }
        }
        if (shouldUpdate){
          toAdd++;
        }
        else {
          break;
        }
      }
       updateCurrentRow(current + toAdd);
      let temp = [0,5,-1,-1];
      updateInputPos(temp);
      updateLettersInCurrentWord([]);
      }
      else {
        updateGuesssesLeft(guessesLeft - 1);
        
        updateInputPos([start,end,skipStart,skipEnd]);
      }

       //check if the game is over
      if (guessesLeft <= 1 ){ //if there are no more guesses left
        updateEndgameMessage("Game Over!")
        updateGameOver(true);
      }
      updateValueArrays(copy2);
      updateInputState(resetInput);

     
      //if all the rows are completed
      let temp = true; //great variable naming convention
      for (let i = 0; i < correctArray.length; i++){
        for (let j = 0; j < correctArray[0].length; j++){
        if (!correctArray[i][j]){ //loops through all of the first columns.
            temp = false;
        }
      }
       
      }
      if (temp) {
        switch (guessesLeft){
          case 1:
            updateEndgameMessage("Phew!");
          case 2:
            updateEndgameMessage("Close!")
            break;
          case 3:
            updateEndgameMessage("Okay!")
            break;
          case 4:
            updateEndgameMessage("Congrats!")
            break;
          case 5:
            updateEndgameMessage("Nice!")
            break;
          case 6:
            updateEndgameMessage("Good!")
            break;
          case 7:
            updateEndgameMessage("Aweseome!")
            break;
          case 8:
            updateEndgameMessage("Perfect!")
            break;
          

        }
        updateGameOver(true);
      }


     

   

    

    }

  



  /* Return methods */
  if (!startGame){
  return (
    <StartScreen />
  )
  }
  else if (startGame){
    return (
        <GameScreen />
    )
  }
}

export default App;
