<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>



<style>
    * {
        box-sizing: border-box;
    }

    .thumbnail {
        width: 300px;
        aspect-ratio: 5 / 4;

        object-fit: contain;
        border: 1px solid black;
    }



    .modal {
        padding: 1rem;

        border: none;
        box-shadow: 0 0 3rem rgb(0, 0, 0, .5);

        overflow-x: hidden;
    }

    .modal::backdrop {
        background-color: rgb(0, 0, 0, .5);
    }

    .modal-image {
        display: block;
        user-select: none;
    }

    .modal-button {
        padding: .5em 2em;

        background-color: darkslategray;
        color: white;

        user-select: none;
        outline: none;
        border: none;
    }

    .modal-button:hover {
        background-color: lightslategray;
    }
</style>



<body>
    <img class="thumbnail" src="images/mia_goth_jenna_ortega_brittany_snow_kid_cudi_4k_hd_x_2022.jpg" title="large">
    <img class="thumbnail" src="images/mia_goth_jenna_ortega_brittany_snow_kid_cudi_4k_hd_x_2022_turned.jpg" title="large turned">
    <img class="thumbnail" src="images/wide.jpg" title="wide">
    <img class="thumbnail" src="images/tall.jpg" title="tall">
    <img class="thumbnail" src="images/small.jpg" title="small">

    <dialog class="modal">
        <div class="modal-container">
            <img class="modal-image">
            <article>
                <h2>Lorem ipsum</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptates pariatur eius expedita assumenda illo quibusdam officia nulla, quaerat modi consectetur consequatur totam commodi hic qui recusandae ratione, labore sit!</p>
            </article>
            <button class="modal-button">OK</button>
        </div>
    </dialog>
</body>



<script>
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");

    document.querySelectorAll(".thumbnail").forEach((item) => {
        item.addEventListener("click", () => {

            modalImage.src = item.src;

            modal.showModal();
            setSize();
        });
    });

    modal.querySelector(".modal-button").addEventListener("click", () => {
        modal.close();
    });

    window.onresize = () => {
        if (modal.open) setSize();
    };



    function setSize() {
        const pixelSize = 1 / window.devicePixelRatio;

        modalImage.style.width = "";
        modalImage.style.height = "";

        modal.style.width = "";
        modal.style.height = "";



        const originalImageWidth = modalImage.naturalWidth * pixelSize;
        const originalImageHeight = modalImage.naturalHeight * pixelSize;

        const modalStyle = modal.currentStyle || window.getComputedStyle(modal);
        let paddingHorizontal = parseInt(modalStyle.paddingLeft) + parseInt(modalStyle.paddingRight);
        let paddingVertical = parseInt(modalStyle.paddingTop) + parseInt(modalStyle.paddingBottom);

        let maxImageWidth = modal.clientWidth - paddingHorizontal;
        let maxImageHeight = modal.clientHeight - paddingVertical;



        let imageWidth = originalImageWidth;
        let imageHeight = originalImageHeight;

        if (imageWidth > maxImageWidth) {
            imageWidth = maxImageWidth;
            imageHeight = imageWidth * (originalImageHeight / originalImageWidth);

            if (imageHeight > maxImageHeight) {
                imageHeight = maxImageHeight;
                imageWidth = imageHeight * (originalImageWidth / originalImageHeight);
            }
        } else if (imageHeight > maxImageHeight) {
            imageHeight = maxImageHeight;
            imageWidth = imageHeight * (originalImageWidth / originalImageHeight);

            if (imageWidth > maxImageWidth) {
                imageWidth = maxImageWidth;
                imageHeight = imageWidth * (originalImageHeight / originalImageWidth);
            }
        }

        modalImage.style.width = imageWidth + "px";
        modalImage.style.height = imageHeight + "px";



        modal.style.width = (imageWidth + paddingHorizontal) + "px";

        if (modal.scrollHeight > modal.clientHeight)
        {

            let textHeight = modal.scrollHeight - imageHeight;

            imageHeight = maxImageHeight - textHeight;
            imageWidth = imageHeight * (originalImageWidth / originalImageHeight);

            // if (imageWidth > maxImageWidth) {
            //     imageWidth = maxImageWidth;
            //     imageHeight = imageWidth * (originalImageHeight / originalImageWidth);
            // }

            modalImage.style.width = imageWidth + "px";
            modalImage.style.height = imageHeight + "px";
            modal.style.width = Math.max((imageWidth + paddingHorizontal), 300) + "px";

            console.log("modal.scrollHeight: " + modal.scrollHeight);
            console.log("modal.clientHeight: " + modal.clientHeight);
            console.log("maxHeight: " + maxImageHeight);
            console.log("");

       }



        // console.log("originalImageWidth: " + originalImageWidth);
        // console.log("originalImageHeight: " + originalImageHeight);
        // console.log("aspectRatio: " + (originalImageWidth / originalImageHeight));
        // console.log("maxImageWidth: " + maxImageWidth);
        // console.log("maxImageHeight: " + maxImageHeight);
        // console.log("setWidth: " + imageWidth);
        // console.log("setHeight: " + imageHeight);
        // console.log(".");
    }
</script>

</html>