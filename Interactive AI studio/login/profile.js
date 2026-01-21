
const avatars = document.querySelectorAll(".avatar");
const selectedAvatarImg = document.getElementById("selectedAvatarImg");
const usernameInput = document.getElementById("usernameInput");



// Returns a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidUsername(name){
    
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
      usernameInput.readOnly = true; // locked but still selectable
      sessionStorage.setItem("username", username);

      usernameAssigned = true;

      usernameInput.addEventListener("focus", () => {
        usernameInput.readOnly = false; 
      })
    }
  });
});
