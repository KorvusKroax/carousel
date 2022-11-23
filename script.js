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







	// let isDragging = false;
	// let startPos;
	// let currPos;

	// track.addEventListener("dragstart", (event) => { event.preventDefault(); });
	
	// track.addEventListener("touchstart", touchStart);
	// track.addEventListener("touchmove", touchMove);
	// track.addEventListener("touchend", touchEnd);

	// track.addEventListener("mousedown", touchStart);
	// track.addEventListener("mousemove", touchMove);
	// track.addEventListener("mouseup", touchEnd);
	// track.addEventListener("mouseleave", touchEnd);

	// function touchStart()
	// {
	// 	console.log("start");

	// 	isDragging = true;
	// 	startPos = getPosX(event);
	// }

	// function touchMove(event)
	// {
	// 	if (isDragging)
	// 	{
	// 		currPos = getPosX(event);

	// 		let deltaPos = startPos - currPos;
	// 		let movement = deltaPos / track.offsetWidth; // track.offsetWidth = 100%
			
	// 		console.log("move by: " + (movement * 100) + "%");

	// 		let trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
	// 		trackIndex += movement;
	// 		track.style.setProperty("--carousel-track-index", trackIndex);
	// 	}
	// }

	// function touchEnd()
	// {
	// 	if (isDragging)
	// 	{
	// 		console.log("end");

	// 		isDragging = false;
	// 	}
	// }

	// function getPosX(event)
	// {
	// 	return event.type.includes("mouse") ? event.pageX : event.touches[0].clinetX;
	// }

	// // disable context menu
	// window.oncontextmenu = (event) =>
	// {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	return false;
	// }

});





/* https://www.youtube.com/watch?v=yq4BeRtUHbk&t=11s&ab_channel=WebDevSimplified */

/* https://pqina.nl/blog/fade-out-overflow-using-css-mask-image/ */

// https://www.youtube.com/watch?v=yq4BeRtUHbk&t=11s&ab_channel=WebDevSimplified

// https://www.youtube.com/watch?v=XtFlpgaLbZ4&ab_channel=dcode

// https://www.youtube.com/watch?v=5bxFSOA5JYo&t=6s&ab_channel=TraversyMedia

// https://css-tricks.com/using-requestanimationframe/
