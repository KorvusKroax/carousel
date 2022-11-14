<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>



<style>
    .thumbnail {
        width: 300px;
        aspect-ratio: 5 / 4;

        object-fit: contain;
        border: 1px solid black;
    }



    .modal {
        max-width: calc(100vw - 4rem);
        max-height: calc(100vh - 4rem);
        padding: 1rem;

        border: none;
        box-shadow: 0 0 3rem rgb(0, 0, 0, .5);
    }

    .modal::backdrop {
        background-color: rgb(0, 0, 0, .5);
    }

    .modal-image {
        /* width: 100%; */
        /* height: 100%; */
        /* display: block; */

        /* object-fit: contain; */
    }
</style>



<body>
    <img class="thumbnail" src="images/mia_goth_jenna_ortega_brittany_snow_kid_cudi_4k_hd_x_2022.jpg">
    <img class="thumbnail" src="images/wide.jpg">
    <img class="thumbnail" src="images/tall.jpg">
    <img class="thumbnail" src="images/small.jpg">

    <dialog class="modal">
        <img class="modal-image">
    </dialog>
</body>



<script>
    const modal = document.querySelector(".modal");

    document.querySelectorAll(".thumbnail").forEach((item) => {
        item.addEventListener("click", () => {
            console.log("...");

            const modalImage = modal.querySelector(".modal-image");
            modalImage.src = item.src;

            modal.showModal();

            imageSize(modalImage);
            maxSize(modalImage);

            setSize(modalImage);
        });
    });





    function imageSize(image) {
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;
        let aspectRatio = imageWidth / imageHeight;

        console.log("imageWidth: " + imageWidth);
        console.log("imageHeight: " + imageHeight);
        console.log("aspectRatio: " + aspectRatio);
    }



    function maxSize(image) {
        const style = modal.currentStyle || window.getComputedStyle(modal);
        let maxWidth = modal.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        let maxHeight = modal.clientHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);

        console.log("maxWidth: " + maxWidth);
        console.log("maxHeight: " + maxHeight);
    }



    function setSize(image) {
        image.style.width = "100vw";
        image.style.height = "100vh";

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        let maxWidth = modal.clientWidth;
        let maxHeight = modal.clientHeight;

        const style = modal.currentStyle || window.getComputedStyle(modal);
        maxWidth -= parseInt(style.paddingLeft) + parseInt(style.paddingRight);
        maxHeight -= parseInt(style.paddingTop) + parseInt(style.paddingBottom);



        let width = Math.min(imageWidth, maxWidth);
        let height = Math.min(imageHeight, maxHeight);

        if (height < imageHeight) {
            width = height * (imageWidth / imageHeight);
        }






        image.style.width = width + "px";
        image.style.height = height + "px";



        console.log("setWidth: " + width);
        console.log("setHeight: " + height);
    }
</script>

</html>