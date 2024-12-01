// -------------------------------------------------------------
// This is my Adventure Game. Enjoy the creepy journey. Hopefully, you won't make it.
// By Wendy Diaz-Wilson (:
// -------------------------------------------------------------

// Variables
let gameState = "home";  // Game starts at the home screen
let message = "";        // Message that will update based on the game state
let gameEnded = false;   // Keeps track if the game is over or should start again

// Declare assets like images and sounds
var fogimg;       // Background image for the foggy forest
var screamSound;  // Sound that plays for a scream event
var woodsound;    // Background creepy woods sound effect
var startButton;  // Button to start the game
var soundButton;  // Button to trigger and loop sound

// -------------------------------------------------------------
// Preload assets like sounds and images
// -------------------------------------------------------------
function preload() {
  fogimg = loadImage("fog.webp");  // Fog image
  screamSound = loadSound('scream.mp3');  // Scream sound
  woodsound = loadSound('woodssound.mp3');  // Creepy woods sound
}

// -------------------------------------------------------------
// Setup: Initialize the canvas and create buttons
// -------------------------------------------------------------
function setup() {
  createCanvas(800, 500);  // Set the canvas size
  print("Hello, welcome to my creepy adventure story.\nLet's see if you can get out alive (:\n- Wendy");

  textSize(24);  // Set text size for messages

  // Create buttons on the home screen
  startButton = createButton('Start Game');  // Button to start the adventure
  startButton.position(width / 2 - 60, height / 2 + 50);  // Position the button at the center of the canvas
  startButton.style('font-size', '20px');  // Increase button font size
  startButton.style('padding', '10px 20px');  // Add padding to make the button larger
  startButton.mousePressed(startGame);  // Calls startGame function when clicked
  
}

// -------------------------------------------------------------
// Draw function: Main game logic and conditional rendering of different game states
// -------------------------------------------------------------
function draw() {
  background(0, 0, 120);  // Background color to a dark blue for the night time effect

  // Game home screen
  if (gameState === "home") {
    // Display welcome message
    fill(250);  // Set text color to white
    textAlign(CENTER);  // Center-align the text
    text("Welcome to the Creepy Adventure!", width / 2, height / 2 - 20);  // Display welcome message
    text("By: Wendy", width / 2, height / 2 + 20);  // Display my name

    // Custom art: Moon drawing in the top-right corner (Requirement: custom art in P5.js)
    fill(255, 200, 153);  // Light pink color for the moon
    noStroke();  // Remove stroke for the moon
    ellipse(650, 98, 80, 80);  // Draw the moon at the top-right corner
    
    fill(255, 255, 153);  // Light yellow color for the moon
    noStroke();  // No stroke for the moon
    ellipse(652, 101, 80, 80);  // Layering to give moon more color depth
    
    // Cheese-like moon effect using smaller circles
    fill(255, 200, 153);  
    ellipse(650, 120, 10, 10);  // Small circles
    ellipse(630, 100, 20, 20);  // Larger circle
    ellipse(655, 100, 12, 12);  // Small circle for craters
    
    // Drawing stars using a loop
    for (let i = 0; i < 6; i++) {
    fill(255);
    noStroke();
    let x = random(width);  // Random x position
    let y = random(height / 3);  // Random y position (upper half of the canvas)
    ellipse(x, y, 2, 2);  // Draw tiny stars
  }

    // Show button on the home screen
    startButton.show();  // Show the start button

  } else {
    // Hide button during gameplay
    startButton.hide();  // Hide the start button after game starts

    // Display foggy forest background (Requirement: custom art image)
    image(fogimg, 0, 0);  // Draw fog image over the entire canvas

    // Display message text in the game
    fill(250);  // Set text color to white
    textAlign(CENTER);  // Center-align the text
    text(message, width / 2, height / 2);  // Display the current game message

    textSize(20);  // Set text size for messages
    
    // Conditional checks to display game events based on player's choices (Requirement: if   statements)
    if (gameState === "start") {
      message = "You just woke up in a dark foggy forest with no recollection of how you got here.\nTo your left, you hear the faint sound of rushing water.\nTo your right, you see flickering lights in the distance.\n\nWhich direction do you go?\nLeft (L) for water or Right (R) for light";

    } else if (gameState === "left") {
      message = "You follow the sounds of the water until you find yourself standing\nat the edge of a fast-moving river with a narrow, swinging wooden bridge.\n\nWhich direction do you go?\nLeft (L) cross the bridge or Right (R) to go back to the light";

    } else if (gameState === "leftagain") {
      message = "YOU DIED!\n\nYou decided to go across the obviously dangerous bridge\nand fell right through the weak wooden planks and perished.\nWho would have guessed.\n\nPress Space to start over";

    } else if (gameState === "leftRight") {
      message = "You decide not to cross the bridge and head back toward the lights.\nAs you approach the flickering lights, you find a small campfire\nwith a mysterious man sitting by it.\n\nWhat do you do?\nLeft (L) to approach the man or Right (R) to head back and cross the bridge?";

    } else if (gameState === "figureLeft") {
      message = "YOU SURVIVED!\n\nYou walked up to the figure and realized it was your best friend.\nHe yells in excitement 'I've been looking for you for three days.'\nHe guides you back to the vehicle and you both head home.\n\n Yay. \nPress Space to start over";

    } else if (gameState === "right") {
      message = "You follow the flickering light and find a kerosene lamp next to a cave.\n\nPick Grab (G) to grab the lamp before entering the cave or Right (R)\nto enter the cave with no light";

    } else if (gameState === "grab") {
      message = "YOU DIED!\n\nYou grabbed the lamp and entered the cave filled with deadly\ncreatures attracted to light. You were eaten alive and perished.\n\n Press Space to start over";

    } else if (gameState === "rightAgain") {
      message = "YOU WON!\n\n You enter the dark cave, surrounded by sleeping glowing creatures.\nDeeper in, you find a pile of diamonds. Grabbing them, you find an exit\non the other end of the cave and find your car. You drive home with your treasure.\n\n Yay? You thief...\n Press Space to play again!";
    }
  }
}

// -------------------------------------------------------------
// Function to start the game when the button is pressed
// -------------------------------------------------------------
function startGame() {
  gameState = "start";  // Change the game state to start the game
  playWoodSound();      // Play the background sound when game starts
}

// -------------------------------------------------------------
// Function to play or stop the background sound (Requirement: audio element)
// -------------------------------------------------------------
function playWoodSound() {
  if (!woodsound.isPlaying()) {
    woodsound.loop();  // Play the sound in a loop if it's not already playing
  }
}

// -------------------------------------------------------------
// Detect key presses during the game for making choices
// -------------------------------------------------------------
function keyPressed() {
  if (gameState === "start") {
    if (key === 'L' || key === 'l') {
      gameState = "left";  // Go left to the water
    } else if (key === 'R' || key === 'r') {
      gameState = "right";  // Go right to the light
    }
  } else if (gameState === "left") {
    if (key === 'L' || key === 'l') {
      gameState = "leftagain";  // Go left across the bridge
    } else if (key === 'R' || key === 'r') {
      gameState = "leftRight";  // Go right back to the light
    }
  } else if (gameState === "leftRight") {
    if (key === 'L' || key === 'l') {
      gameState = "figureLeft";  // Approach the man by the fire
    } else if (key === 'R' || key === 'r') {
      gameState = "left";  // Go back to the water
    }
  } else if (gameState === "right") {
    if (key === 'G' || key === 'g') {
      gameState = "grab";  // Grab the lamp
    } else if (key === 'R' || key === 'r') {
      gameState = "rightAgain";  // Enter the cave without the lamp
    }
  }

  // Restart the game if it's over
  if (gameState === "leftagain" || gameState === "grab" || gameState === "figureLeft" || gameState === "rightAgain") {
    if (key === ' ') {
      gameState = "home";  // Reset to the home screen
      gameEnded = false;  // Set gameEnded back to false
    }
  }
}



