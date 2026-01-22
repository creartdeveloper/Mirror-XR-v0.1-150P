
const avatars = document.querySelectorAll(".avatar");
const selectedAvatarImg = document.getElementById("selectedAvatarImg");
const usernameInput = document.getElementById("usernameInput");
const selectedAvatar = document.querySelector('selected-avatar');
const colorInput = document.getElementById('background-color');
const defaultAvatars = [
    "./images/iPad-IU-Dewdrop.png",
    "./images/iPad-IU-Pebble.png",
    "./images/iPad-IU-Twinkle.png",
    "./images/iPad-IU-Whimsy.png"
];


// Returns a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Username rules: 3–16 chars, letters, numbers, underscore
function isValidUsername(name) {
  return /^[a-zA-Z0-9_]{3,16}$/.test(name);
}

//profanity list 
let bannedWords = [];

fetch("./words.json")
  .then(res => res.json())
  .then(data => {
    bannedWords = data.map(w => w.toLowerCase());
    console.log("Profanity list loaded:", bannedWords.length);

    if (bannedWords.length === 0) {
      console.warn("Profanity list is empty");
    }
  })
  .catch(err => console.error("Failed to load profanity list", err));

function containsProfanity(username) {
  const lower = username.toLowerCase();
  return bannedWords.some(word => lower.includes(word));
}

// 15 adjectives 
const adjectives = [
  "Bouncy", "Zippy", "Snappy", "Wiggly", "Sparkly",
  "Chunky", "Fizzy", "Speedy", "Goofy", "Spooky",
  "Flashy", "Slinky", "Loopy", "Cheeky", "Buzzy"
];

// 15 nouns
const nouns = [
  "Orb", "Boost", "Zap", "Token", "Pad",
  "Bar", "Ring", "Beam", "Tile", "Dash",
  "Loop", "Meter", "Core", "Chip", "Pulse"
];


let usernameAssigned = false;
const usedUsernames = new Set();


function generateUsernameForAvatar() {
  let username;

  do {
    const adj = adjectives[getRandomInt(0, adjectives.length - 1)];
    const noun = nouns[getRandomInt(0, nouns.length - 1)];
    const number = getRandomInt(0, 9);

    username = `${adj}${noun}${number}`;
  } while (usedUsernames.has(username));

  usedUsernames.add(username);
  return username;
}


avatars.forEach(avatar => {
  avatar.addEventListener("click", () => {

    // Remove previous selection
    avatars.forEach(a => a.classList.remove("selected"));
    avatar.classList.add("selected");

    // Get avatar image
    const img = avatar.querySelector("img");
    if (!img) return;

    // Update avatar preview in bottom bar
    selectedAvatarImg.src = img.src;
    selectedAvatarImg.style.display = "block";

    // Store avatar for next page
    sessionStorage.setItem("selectedAvatar", img.src);

    // Generate username ONLY ON FIRST SELECTION
    if (!usernameAssigned) {
      const username = generateUsernameForAvatar();

      usernameInput.value = username;
      usernameInput.readOnly = false; // locked but still selectable
      sessionStorage.setItem("username", username);

      usernameAssigned = true;
    }
  });
});

let isEditingUsername = false;

 // enable user to edit username after username is randomly generated 
usernameInput.addEventListener("focus", () => {
  if (!usernameAssigned) {
    usernameInput.blur();
    return;
  }
  isEditingUsername = true;
  usernameInput.readOnly = false;
});


// validate and lock username
function validateAndLockUsername() {
  if (!isEditingUsername) return;

  const name = usernameInput.value.trim();

  // Rule check
  if (!isValidUsername(name)) {
    alert("Username must be 3–16 characters and use only letters, numbers, or _");
    usernameInput.value = sessionStorage.getItem("username");
    usernameInput.readOnly = true;
    isEditingUsername = false;
    return;
  }

  // Profanity check
  if (containsProfanity(name)) {
    alert("Please choose a different username");
    usernameInput.value = sessionStorage.getItem("username");
    usernameInput.readOnly = true;
    isEditingUsername = false;
    return;
  }


  usernameInput.readOnly = true;
  sessionStorage.setItem("username", name);
  isEditingUsername = false;
}

// if user clicks anywhere else  = blur or when user clicks away blur
usernameInput.addEventListener("blur", validateAndLockUsername);

//lock on enter
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    validateAndLockUsername();
    usernameInput.blur();
  }
});

// continue button 
document.getElementById("nextbutton").addEventListener("click", () => {
  validateAndLockUsername();

  const username = sessionStorage.getItem("username");
  const avatar = sessionStorage.getItem("selectedAvatar");

  if (!username || !avatar) {
    alert("Please select an avatar and username");
    return;
  }


});


colorInput.addEventListener('input', () => {
    selectedAvatar.style.backgroundColor = colorInput.value;

});

// get img element displays default avatar
// this lets us change the avatar image dynamically

const defaultAvatarImg =document.getElementById("defaultAvatarImg");

//generate random number between 0 and (number of defaults -1)
//math.random gives number between 0 and 0.999
// multiply default avatars lenght scales it to array size
// math.floor() rounds it down to a whole number (array index)
const randomIndex=Math.floor(Math.random() * defaultAvatars.length);

//use random index to select one avatar from the array
//default avatars is array link
const chosenDefault = defaultAvatars[randomIndex];

//set src of image element to chosen avatar

defaultAvatarImg.src = chosenDefault; 

//save chosen avatar in session storage
//allows avatar to stay same if page reloads
//sessionStorage lasts for browser session
sessionStorage.setItem("defaultAvatar", chosenDefault);