// Reusable random number helper
// Returns a random integer between min and max (inclusive)

const avatars = document.querySelectorAll(".avatar");
const selectedAvatarImg = document.getElementById("selectedAvatarImg");
const usernameInput = document.getElementById('usernameInput');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fun game-style adjectives (15)
const adjectives = [
  "Bouncy", "Zippy", "Snappy", "Wiggly", "Sparkly",
  "Chunky", "Fizzy", "Speedy", "Goofy", "Spooky",
  "Flashy", "Slinky", "Loopy", "Cheeky", "Buzzy"
];

// Game-style nouns (15)
const nouns = [
  "Orb", "Boost", "Zap", "Token", "Pad",
  "Bar", "Ring", "Beam", "Tile", "Dash",
  "Loop", "Meter", "Core", "Chip", "Pulse"
];

const usedUsernames = new Set();

function generateUsernameForAvatar(){
    let username; 

    do{
        const adj = adjectives[getRandomInt(0, adjectives.length - 1)];
        const noun =  nouns[getRandomInt(0, nouns.lenght - 1)];
        const number = getRandomInt(0,9);

        username = `${adj}${noun}${number}`;
    } while (usedUsernames.has(username));

        usedUsernames.add(username);
        return username;
    }



//avatar selection

avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        //remove previous selection
        avatars.forEach(a => a.classList.remove('selected'));
        avatar.classList.add('selected');

        //get image inside clicked avatar
        const img = avatar.querySelector('img');

        // copy image into bottom bar
        if (img && selectedAvatarImg){
            selectedAvatarImg.src = img.src;
            selectedAvatarImg.style.display = 'block';
        }

        //store for next page
        sessionStorage.setItem('selectedAvatar', img.src);

        // generate username AFTER avatar selection 
        const username = generateUsernameForAvatar();

        // fill username input
        usernameInput.value = username; 
        usernameInput.disabled = true; 

        //store username for next page
        sessionStorage.setItem("username", username);
    });
});



