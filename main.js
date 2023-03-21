
const apiUrl = "https://api.artic.edu/api/v1/artworks?limit=40";
    const view = document.getElementById("output");
    const refreshButton = document.getElementById("refresh");
    const rounds = document.getElementById("round-count");

    let count = 1;
    let imgUrlArray = [];
    let artistName = [];
    let artTitle = [];



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

        
      
      // check if we've reached the maximum number of rounds

      if (count >= 10) {
        refreshButton.innerText = "Game Over";
        return;
      }else {
        count++ // increment the round count
      }
      //console.log(imageUrl);
      // update the round count in the UI
      //rounds.innerText = `Round ${count + 1}`;

      // clear the output container and shuffle the image URLs
      view.innerHTML = "";
      shufflePicture();

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

        // add event listener to log artist name and title to console
        artPiece.addEventListener("click", () => {
          console.log(`Artist: ${artPiece.dataset.artist} Title: ${artPiece.dataset.title}`);
        });
      }

      
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

    refreshButton.addEventListener("click", artImg);
    const progressBoxes = document.querySelectorAll(".progress-box");

const updateProgressTracker = () => {
  progressBoxes.forEach((box, index) => {
    if (index < count) {
      box.style.backgroundColor = "green"; // set the color for completed rounds
    } else {
      box.style.backgroundColor = "red"; // set the color for incomplete rounds
    }
  });
};

// call the updateProgressTracker function after each round
  // ...
  updateProgressTracker();
