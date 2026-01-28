document.addEventListener("DOMContentLoaded", () => {
    const avatarImg = document.getElementById("selectedAvatarImg");
    const savedAvatar = sessionStorage.getItem("selectedAvatar");

    console.log("Avatar from session:", savedAvatar);

    if(savedAvatar && avatarImg) {
        avatarImg.src = savedAvatar;
        avatarImg.style.display = "block";
    }
});


