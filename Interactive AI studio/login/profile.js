document.getElementById("toggleDarkMode")
document.addEventListener("click", function (){
    document.body.classList.toggle("dark-mode");
});

/* need to impelemnt the above*/

const avatars = document.querySelectorAll('.avatar');
const selectedAvatarImg = document.getElementById('selectedAvatarImg');

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
    });
});
