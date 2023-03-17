const apiUrl = "https://api.artic.edu/api/v1/artworks?limit=60";
const view = document.getElementById("output");
const refreshButton = document.getElementById("refresh");
const rounds = document.getElementById("round-count");


let count = 0;
let imgUrlArray = [];
let artistName = [];
let artTitle = [];

//fetching the images from the API  
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

    })
    // console.log(imgUrlArray)
  });

// creating images for the Art API 
const artImg = async() => {
    view.innerHTML = '';
for(let i = 0; i <4; i++) {
    refreshButton.innerText = "Next"
    const div = document.createElement('div');
    div.className = 'art-img';
    const artPiece = document.createElement('img');
    let url = await imgUrlArray[i];
    artPiece.src = url;    
    div.append(artPiece);
    view.append(div); 

    artPiece.addEventListener('click', () => {
        console.log(artistName[i])
    })
    shufflePicture();
    // console.log(url)
}};

// shuffling images for the refresh button
const shufflePicture = () => {
    for(let i = 0; i <imgUrlArray.length; i++) {
        let random = Math.floor(Math.random()* imgUrlArray.length);
        let temp = imgUrlArray[i];
        imgUrlArray[i] = imgUrlArray[random];
        imgUrlArray[random] = temp;
    }
}

//function for counting rounds 
// function countingRound() {
//     if (count >= 0) {
//       roundCount.innerText = `Round ${count + 1}`
//     }
//   }

refreshButton.addEventListener('click', artImg)
