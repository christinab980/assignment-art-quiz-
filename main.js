const apiUrl = "https://api.artic.edu/api/v1/artworks?limit=40";
const startButton = document.getElementById("start");
const rounds = document.getElementById("round-count");
const thePrompt = document.getElementById("question");
const tryAgain = document.getElementById("feedback");
const view = document.getElementById("output");
const yourScore = document.getElementById("your-score");

let artistName = [];
let artTitle = [];
let imgUrlArray = [];
let randomAnswer 

let canAnswer = true;

let count = 1;
let score = 0;

// fetching the images from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.data.forEach(imgObject => {
      const imageId = imgObject.image_id;
      const artist = imgObject.artist_titles;
      const title = imgObject.title;
      const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

      imgUrlArray.push(imageUrl);
      artistName.push(artist);
      artTitle.push(title);
      });
    });

// creating images for the Art API
const artImg = () => {
  //switching the start button to a next button
  startButton.innerText = "Next";

  //clearing the prompt for the next question
  thePrompt.innerHTML = '';   

  //clearing the feedback div for the next queston 
  tryAgain.innerHTML = '';

  canAnswer = true;

// check if we've reached the maximum number of rounds
  if (count >= 10) {
    startButton.innerText = "Game Over";
    return;
  } else {
    count++ // increment the round count
  }
    // update the round count in the UI
    //rounds.innerText = `Round ${count + 1}`;

  // clear the output container and shuffle the image URLs
  view.innerHTML = " ";
  shufflePicture();
  randomAnswer = artistName[Math.floor(Math.random()* 4)];
  setRandomAnswer(randomAnswer);  

// create and display the images
for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.className = "art-img";
    const artPiece = document.createElement("img");
    let url = imgUrlArray[i];
    artPiece.src = url;
    artPiece.setAttribute("data-artist", artistName[i]);
    artPiece.setAttribute("data-title", artTitle[i]);
    div.append(artPiece);
    view.append(div);
    // console.log(artPiece.dataset.artist)

    // add event listener to log artist name and title to console
    artPiece.addEventListener("click", (e) => {
      handleSelection(e);
      console.log(`Artist: ${artPiece.dataset.artist} Title: ${artPiece.dataset.title}`);
    });

  }
  // const randomAnswer = artistName[Math.floor(Math.random()* 4)];
  // setRandomAnswer(randomAnswer);  
};

// shuffling images for the refresh button
const shufflePicture = () => {
  for (let i = 0; i < imgUrlArray.length; i++) {
    let random = Math.floor(Math.random() * imgUrlArray.length);
    let temp = imgUrlArray[i];
    imgUrlArray[i] = imgUrlArray[random];
    imgUrlArray[random] = temp;
  }
};

//creates the prompt for the correct art piece 
function setRandomAnswer(randomAnswer) {
  const prompt = document.createElement('div');
  prompt.innerText = `Which image shows ${randomAnswer} work?`
  thePrompt.append(prompt);
}

//Tells user if they are correct/incorrect 
function giveFeedback(isCorrect) {
  const feedback = document.createElement('div');
  const message = isCorrect ? 'CORRECT' : 'INCORRECT'
  if (isCorrect) {
    // calculateScore()
    feedback.innerText = `That is ${message}!`;
    thePrompt.append(feedback)
  } else {
    tryAgain.innerHTML = "Sorry, wrong answer!";
  //   yourScore.innerText = `Your score is ${score} out of 10`
  }
}

//eventlistener function - handles whether or not the user is getting the correct answer and can answer. 
function handleSelection(e) {
  if(canAnswer) {
    canAnswer = false;
    const artistName = e.target.getAttribute("data-artist");
    console.log(artistName)
    console.log(randomAnswer)
  if (artistName) {
    giveFeedback(artistName === randomAnswer[0])
    }  
  } 
}

// calculating the score 
function calculateScore() { 
    score++;
    yourScore.innerText = `Your score is ${score} out of 10`
}

startButton.addEventListener("click", artImg);