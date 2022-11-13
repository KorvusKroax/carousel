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
        display: block;

        object-fit: cover;
    }



    .modal {
        max-width: calc(100vw - 10rem);
        max-height: calc(100vh - 10rem);
        padding: 2rem;

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
    <img class="thumbnail" src="images/sweeney-todd-johnny-depp-helena-bonham-carter-bythesea.jpg">
    <img class="thumbnail" src="images/top-10-greatest-johnny-depp-movies-of-all-time.jpg">
    <img class="thumbnail" src="images/list-of-johnny-depp-movies-in-order.webp">
    <img class="thumbnail" src="images/sweeney-todd-johnny-depp-helena-bonham-carter-bythesea.jpg">
    <img class="thumbnail" src="images/top-10-greatest-johnny-depp-movies-of-all-time.jpg">
    <img class="thumbnail" src="images/list-of-johnny-depp-movies-in-order.webp">
    <img class="thumbnail" src="images/sweeney-todd-johnny-depp-helena-bonham-carter-bythesea.jpg">
    <img class="thumbnail" src="images/top-10-greatest-johnny-depp-movies-of-all-time.jpg">
    <img class="thumbnail" src="images/list-of-johnny-depp-movies-in-order.webp">

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



    function setSize(image)
    {
        image.style.width = "100vw";
        image.style.height = "100vh";

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;
        let aspectRatio = imageWidth / imageHeight;

        const style = modal.currentStyle || window.getComputedStyle(modal);
        let maxWidth = modal.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        let maxHeight = modal.clientHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);





        image.style.width = Math.min(imageWidth, maxWidth) + "px";
        image.style.height = Math.min(imageHeight, maxHeight) + "px";



        console.log("setWidth: " + Math.min(imageWidth, maxWidth) + "px");
        console.log("setHeight: " +  Math.min(imageHeight, maxHeight) + "px");
    }

</script>

</html>