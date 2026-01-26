document.addEventListener("DOMContentLoaded", function () {
    const pollForm = document.getElementById("poll-form");
    const dewdrop = document.getElementById("dewdrop-count");
    const pebble = document.getElementById("pebble-count");
    const twinkle = document.getElementById("twinkle-count");
    const whimsy = document.getElementById("whimsy-count");

    let dewdropvotes = 0; 
    let pebbelevotes = 0; 
    let twinklevotes = 0; 
    let whimsyvotes = 0; 

    pollForm.addEventListener("submit", function (e) {
        // help prevent the submission of form, so that following code can execute. 
        e.preventDefault();
        const formData = new FormData(pollForm);
        const userVote = formData.get("vote");

        if(userVote == "yes")
    })
})