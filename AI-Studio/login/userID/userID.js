document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile page JS loaded");


  const avatars = document.querySelectorAll(".avatar");
  const selectedAvatarImg = document.getElementById("selectedAvatarImg");
  const usernameInput = document.getElementById("usernameInput");
  const selectedAvatar = document.querySelector(".selected-avatar");
  const colorInput = document.getElementById("background-color");
  const nextButton = document.getElementById("nextButton");

  if (!avatars.length || !nextButton || !usernameInput) {
    console.error("Critical DOM elements missing");
    return;
  }

 
  const adjectives = [
    "Bouncy","Zippy","Snappy","Wiggly","Sparkly",
    "Chunky","Fizzy","Speedy","Goofy","Spooky",
    "Flashy","Slinky","Loopy","Cheeky","Buzzy"
  ];

  const nouns = [
    "Orb","Boost","Zap","Token","Pad",
    "Bar","Ring","Beam","Tile","Dash",
    "Loop","Meter","Core","Chip","Pulse"
  ];

  let usernameAssigned = false;
  let isEditingUsername = false;
  const usedUsernames = new Set();
  let bannedWords = [];

  
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const isValidUsername = (name) =>
    /^[a-zA-Z0-9_]{3,16}$/.test(name);

  const generateUsername = () => {
    let name;
    do {
      name =
        adjectives[getRandomInt(0, adjectives.length - 1)] +
        nouns[getRandomInt(0, nouns.length - 1)] +
        getRandomInt(0, 9);
    } while (usedUsernames.has(name));

    usedUsernames.add(name);
    return name;
  };


  fetch("./words.json")
    .then(res => res.json())
    .then(data => bannedWords = data.map(w => w.toLowerCase()))
    .catch(() => console.warn("Profanity list failed to load", bannedWords.length));

  const containsProfanity = name =>
    bannedWords.some(w => name.toLowerCase().includes(w));

  const validateAndLockUsername = () => {
    if (!isEditingUsername) return true;

    const name = usernameInput.value.trim();

    if (!isValidUsername(name)) {
      alert("Username must be 3–16 characters");
      usernameInput.value = sessionStorage.getItem("username") || "";
      return false;
    }

    if (containsProfanity(name)) {
      alert("Please choose a different username");
      usernameInput.value = sessionStorage.getItem("username") || "";
      return false;
    }

    sessionStorage.setItem("username", name);
    usernameInput.readOnly = true;
    isEditingUsername = false;
    updateNextButtonState();
    return true;
  };

  avatars.forEach(avatar => {
    avatar.addEventListener("click", () => {
      avatars.forEach(a => a.classList.remove("selected"));
      avatar.classList.add("selected");

      const img = avatar.querySelector("img");
      if (!img) return;

      selectedAvatarImg.src = img.src;
      selectedAvatarImg.style.display = "block";
      sessionStorage.setItem("selectedAvatar", img.src);
 

      if (!usernameAssigned) {
        const name = generateUsername();
        usernameInput.value = name;
        sessionStorage.setItem("username", name);
        usernameAssigned = true;

      }

      updateNextButtonState();
    });
  });


  usernameInput.addEventListener("focus", () => {
    if (!usernameAssigned) {
      usernameInput.blur();
      return;
    }
    isEditingUsername = true;
    usernameInput.readOnly = false;
  });

  usernameInput.addEventListener("blur", validateAndLockUsername);

  usernameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      validateAndLockUsername();
      usernameInput.blur();
    }
  });


  colorInput.addEventListener("input", () => {
    selectedAvatar.style.backgroundColor = colorInput.value;
    sessionStorage.setItem("avatarBgColor", colorInput.value);
    updateNextButtonState();
  });


  nextButton.addEventListener("click", e => {
    e.preventDefault();

    if (nextButton.disabled) return;

    window.location.href = "../chatbox/chatbox.html";
  });

  function updateNextButtonState() {
    const hasAvatar = !!sessionStorage.getItem("selectedAvatar");
    const hasUsername = !!sessionStorage.getItem("username");
    const hasBg = !!sessionStorage.getItem("avatarBgColor");

    nextButton.disabled = !(hasAvatar && hasUsername && hasBg);
  }
});
