document.querySelectorAll(".carousel").forEach((carousel) =>
{
    const track = carousel.querySelector(".carousel-track");

    const items = track.querySelectorAll(".carousel-item");
    items.forEach((item) => 
    {
        const card = item.querySelector(".carousel-card");
        const dialog = item.querySelector(".carousel-dialog");
        // const dialogButton = dialog.querySelector(".carousel-dialog-button");
        
        card.addEventListener("click", () => { dialog.showModal(); });
        // dialogButton.addEventListener("click", () => { dialog.close(); });
    });

    const buttonPrev = carousel.querySelector(".carousel-button.prev");
    buttonPrev.addEventListener("click", () => { paging(-1); });

    const buttonNext = carousel.querySelector(".carousel-button.next");
    buttonNext.addEventListener("click", () => { paging(+1); });
    


    setButtonsVisibility();

    console.log("items.length: " + items.length);



    function paging(direction) 
    {
        let trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));

        trackIndex += direction;

        track.style.setProperty("--carousel-track-index", trackIndex);

        setButtonsVisibility();
    }



    function setButtonsVisibility()
    {
        const trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
        const itemsPerScreen = parseInt(getComputedStyle(track).getPropertyValue("--carousel-items-per-screen"));

        console.log("itemsPerScreen: " + itemsPerScreen);

        const screenCount = Math.ceil(items.length / itemsPerScreen);
        console.log("screenCount: " + screenCount);

        if (trackIndex > 0)
        {
            buttonPrev.removeAttribute("hidden");
            // buttonPrev.hidden = false;
            // buttonPrev.style.display = "flex";
        }
        else
        {
            buttonPrev.setAttribute("hidden", "");
            // buttonPrev.hidden = true;
            // buttonPrev.style.display = "none";
        }

        if (trackIndex < screenCount - 1)
        {
            buttonNext.removeAttribute("hidden");
            // buttonNext.hidden = false;
            // buttonNext.style.display = "flex";
        }
        else
        {
            buttonNext.setAttribute("hidden", "");
            // buttonNext.hidden = true;
            // buttonNext.style.display = "none";
        }
    }

    
});
