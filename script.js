document.querySelectorAll(".carousel").forEach((carousel) => 
{
	const track = carousel.querySelector(".carousel-track");

	const items = track.querySelectorAll(".carousel-item");
	items.forEach((item) => 
    {
		const card = item.querySelector(".carousel-card");
		const modal = item.querySelector(".carousel-modal");
		const modalImage = modal.querySelector(".carousel-modal-image");

		card.addEventListener("click", () => 
        {
			modal.showModal();
			setSize();
		});

		function setSize() 
        {
			const pixelSize = 1 / window.devicePixelRatio;

			modalImage.style.width = "";
			modalImage.style.height = "";

			modal.style.width = "";
			modal.style.height = "";

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
			modal.style.width = imageWidth + paddingHorizontal + 1 + "px";



			while (modal.scrollHeight > modal.clientHeight) 
            {
				const textHeight = modal.scrollHeight - imageHeight;

				imageHeight = maxImageHeight - textHeight;
				imageWidth = imageHeight * (originalImageWidth / originalImageHeight);

				modalImage.style.width = imageWidth + "px";
				modalImage.style.height = imageHeight + "px";
				modal.style.width = imageWidth + paddingHorizontal + 1 + "px";

				if (imageHeight < maxImageHeight * 0.7) 
                {
					imageHeight = maxImageHeight * 0.7;
					imageWidth = imageHeight * (originalImageWidth / originalImageHeight);

					modalImage.style.width = imageWidth + "px";
					modalImage.style.height = imageHeight + "px";
					modal.style.width = imageWidth + paddingHorizontal + 1 + "px";

					console.log("too large text for clientHeight");
					break;
				}
			}
		}
        
        const modalButton = modal.querySelector(".carousel-modal-button");
		modalButton.addEventListener("click", () => { modal.close(); });

		window.addEventListener("resize", () => { if (modal.open) setSize(); });
	});





	const buttonPrev = carousel.querySelector(".carousel-button.prev");
	buttonPrev.addEventListener("click", () => {
		paging(-1);
	});

	const buttonNext = carousel.querySelector(".carousel-button.next");
	buttonNext.addEventListener("click", () => {
		paging(+1);
	});

	function paging(direction) {
		let trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
		trackIndex += direction;
		track.style.setProperty("--carousel-track-index", trackIndex);

		// setButtonsVisibility();
	}

	// setButtonsVisibility();

	// function setButtonsVisibility()
	// {
	//     const trackIndex = parseInt(getComputedStyle(track).getPropertyValue("--carousel-track-index"));
	//     const itemsPerScreen = parseInt(getComputedStyle(track).getPropertyValue("--carousel-items-per-screen"));

	//     console.log("itemsPerScreen: " + itemsPerScreen);

	//     const screenCount = Math.ceil(items.length / itemsPerScreen);
	//     console.log("screenCount: " + screenCount);

	//     if (trackIndex > 0)
	//     {
	//         buttonPrev.removeAttribute("hidden");
	//         // buttonPrev.hidden = false;
	//         // buttonPrev.style.display = "flex";
	//     }
	//     else
	//     {
	//         buttonPrev.setAttribute("hidden", "");
	//         // buttonPrev.hidden = true;
	//         // buttonPrev.style.display = "none";
	//     }

	//     if (trackIndex < screenCount - 1)
	//     {
	//         buttonNext.removeAttribute("hidden");
	//         // buttonNext.hidden = false;
	//         // buttonNext.style.display = "flex";
	//     }
	//     else
	//     {
	//         buttonNext.setAttribute("hidden", "");
	//         // buttonNext.hidden = true;
	//         // buttonNext.style.display = "none";
	//     }
	// }
});
