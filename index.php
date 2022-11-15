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
    }

    .modal::backdrop {
        background-color: rgb(0, 0, 0, .5);
    }

    .modal-image {
        display: block;
        overflow: hidden;
        /* width: 100%; */
        /* height: 100%; */

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

            const modalImage = modal.querySelector(".modal-image");
            modalImage.src = item.src;

            modal.showModal();

            setSize(modalImage);
        });
    });



    function setSize(image) {
        image.style.width = "";
        image.style.height = "";

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        // let maxWidth = window.innerWidth;
        // let maxHeight = window.innerHeight;

        const style = modal.currentStyle || window.getComputedStyle(modal);
        let maxWidth = modal.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        let maxHeight = modal.clientHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);



        // let width = Math.min(imageWidth, maxWidth);
        // let height = Math.min(imageHeight, maxHeight);

        // if (height < imageHeight) {
        //     width = height * (imageWidth / imageHeight);
        // }






        image.style.width = maxWidth + "px";
        // image.style.height = maxHeight + "px";



        console.log("imageWidth: " + imageWidth);
        console.log("imageHeight: " + imageHeight);
        console.log("aspectRatio: " + (imageWidth / imageHeight));
        console.log(".");
        console.log("maxWidth: " + maxWidth);
        console.log("maxHeight: " + maxHeight);
        // console.log(".");
        // console.log("setWidth: " + width);
        // console.log("setHeight: " + height);
        console.log("---------------");
    }
</script>

</html>