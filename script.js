document.querySelectorAll(".carousel").forEach((carousel) => 
{
	const container = carousel.querySelector(".carousel-container");
	const track = carousel.querySelector(".carousel-track");
	const items = track.querySelectorAll(".carousel-item");
	const buttonPrev = carousel.querySelector(".carousel-button.prev");
	const buttonNext = carousel.querySelector(".carousel-button.next");
	const indicatorContainer = carousel.querySelector(".carousel-indicator-container");





	items.forEach((item) => 
    {
		const card = item.querySelector(".carousel-card");
		const modal = item.querySelector(".carousel-modal");
		const modalImage = modal.querySelector(".carousel-modal-image");
        const modalButton = modal.querySelector(".carousel-modal-button");

		card.addEventListener("click", () => 
        {
			modal.showModal();
			setSize();
		});

		function setSize() 
        {
			modalImage.style.width = "";
			modalImage.style.height = "";
			modal.style.width = "";

			const pixelSize = 1 / window.devicePixelRatio;

			const originalImageWidth = Math.floor(modalImage.naturalWidth * pixelSize);
			const originalImageHeight = Math.floor(modalImage.naturalHeight * pixelSize);

			const modalStyle = modal.currentStyle || window.getComputedStyle(modal);
			const paddingHorizontal = parseInt(modalStyle.paddingLeft) + parseInt(modalStyle.paddingRight);
			const paddingVertical = parseInt(modalStyle.paddingTop) + parseInt(modalStyle.paddingBottom);

			const maxImageWidth = modal.clientWidth - paddingHorizontal;
			const maxImageHeight = modal.clientHeight - paddingVertical;

			let imageWidth = originalImageWidth;
			let imageHeight = originalImageHeight;
			if (imageWidth > maxImageWidth) 
            {
				imageWidth = maxImageWidth;
				imageHeight = imageWidth * (originalImageHeight / originalImageWidth);
			}

			modalImage.style.width = imageWidth + "px";
			modalImage.style.height = imageHeight + "px";
			modal.style.width = imageWidth + paddingHorizontal + "px";

			imageHeight -= (modal.scrollHeight - modal.clientHeight);
			while ((modal.scrollHeight > modal.clientHeight) && (imageHeight > maxImageHeight * 0.7))
            {
				imageWidth = imageHeight * (originalImageWidth / originalImageHeight);

				modalImage.style.width = imageWidth + "px";
				modalImage.style.height = imageHeight + "px";
				modal.style.width = imageWidth + paddingHorizontal + "px";

				imageHeight -= (modal.scrollHeight - modal.clientHeight);
			}
		}
        
		modalButton.addEventListener("click", () => { modal.close(); });

		window.addEventListener("resize", () => { if (modal.open) setSize(); });
	});

 



	setIndicators();

	function setIndicators()
    {
        indicatorContainer.innerHTML = "";

	    const trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
	    const itemsPerScreen = parseInt(getComputedStyle(track).getPropertyValue("--carousel-items-per-screen"));
        const screenCount = Math.ceil(items.length / itemsPerScreen);

        // if (trackIndex > screenCount - 1)
        // {
        //     trackIndex = screenCount - 1;
        //     track.style.setProperty("--track-index", trackIndex);
        // }

		if (screenCount > 1)
		{
			for (let i = 0; i < screenCount; i++)
			{
				let indicator = document.createElement("div");
				indicator.classList.add("carousel-indicator");
				if (i === trackIndex)
				{
					indicator.classList.add("selected");
				}

				indicator.addEventListener("click", () => 
				{ 
					const index = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
					indicatorContainer.children[index].classList.remove("selected");

					indicatorContainer.children[i].classList.add("selected");
					track.style.setProperty("--carousel-track-index", i);

					setButtonsVisibility();
				});

				indicatorContainer.append(indicator);
			}
		}
        setButtonsVisibility();
    }





	buttonPrev.addEventListener("click", () => { paging(-1); });

	buttonNext.addEventListener("click", () => { paging(+1); });

	function paging(direction) 
	{
		let trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
		trackIndex += direction;
		track.style.setProperty("--carousel-track-index", trackIndex);
		
		indicatorContainer.children[trackIndex - direction].classList.remove("selected");
		indicatorContainer.children[trackIndex].classList.add("selected");

		setButtonsVisibility();
	}





	let isDragging = false;

	container.addEventListener("dragstart", (event) => { event.preventDefault(); });
	
	container.addEventListener("touchstart", touchStart);
	container.addEventListener("touchmove", touchMove);
	container.addEventListener("touchend", touchEnd);

	container.addEventListener("mousedown", touchStart);
	container.addEventListener("mousemove", touchMove);
	container.addEventListener("mouseup", touchEnd);
	container.addEventListener("mouseleave", touchEnd);

	function touchStart()
	{
		if (!isDragging)
		{
			console.log("start");
			isDragging = true;
		}
	}

	function touchMove()
	{
		if (isDragging)
		{
			console.log("move");
		}
	}

	function touchEnd()
	{
		if (isDragging)
		{
			console.log("end");
			isDragging = false;
		}
	}

	// disable context menu
	window.oncontextmenu = (event) =>
	{
		event.preventDefault();
		event.stopPropagation();
		return false;
	}





	setButtonsVisibility();

	function setButtonsVisibility()
	{
	    const buttonWidth = parseInt(getComputedStyle(track).getPropertyValue("--carousel-button-width"));

	    const trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
	    const itemsPerScreen = parseInt(getComputedStyle(track).getPropertyValue("--carousel-items-per-screen"));

	    const screenCount = Math.ceil(items.length / itemsPerScreen);

	    if (trackIndex > 0)
	    {
	        buttonPrev.style.display = "flex";
			container.style.paddingLeft = 0;
	    }
	    else
	    {
	        buttonPrev.style.display = "none";
			container.style.paddingLeft = buttonWidth + "%";
	    }

	    if (trackIndex < screenCount - 1)
	    {
	        buttonNext.style.display = "flex";
			container.style.paddingRight = 0;
		}
	    else
	    {
	        buttonNext.style.display = "none";
			container.style.paddingRight = buttonWidth + "%";
		}
	}
});





/* https://www.youtube.com/watch?v=yq4BeRtUHbk&t=11s&ab_channel=WebDevSimplified */

/* https://pqina.nl/blog/fade-out-overflow-using-css-mask-image/ */

// https://www.youtube.com/watch?v=yq4BeRtUHbk&t=11s&ab_channel=WebDevSimplified

// https://www.youtube.com/watch?v=XtFlpgaLbZ4&ab_channel=dcode

// https://www.youtube.com/watch?v=5bxFSOA5JYo&t=6s&ab_channel=TraversyMedia
