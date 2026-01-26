document.addEventListener("DOMContentLoaded", () => {
    const avatarImg = document.getElementById("selectedAvatarImg");
    const savedAvatar = sessionStorage.getItem("selectedAvatar");

    if(savedAvatar && avatarImg) {
        avatarImg.src = savedAavatar;
        avatarImg.style.display = "block";
    }
});