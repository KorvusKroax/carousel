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
    }
</style>



<body>
    <img class="thumbnail" src="images/mia_goth_jenna_ortega_brittany_snow_kid_cudi_4k_hd_x_2022.jpg">
    <img class="thumbnail" src="images/mia_goth_jenna_ortega_brittany_snow_kid_cudi_4k_hd_x_2022_turned.jpg">
    <img class="thumbnail" src="images/wide.jpg">
    <img class="thumbnail" src="images/tall.jpg">
    <img class="thumbnail" src="images/small.jpg">

    <dialog class="modal">
        <img class="modal-image">
        <article>
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam voluptates pariatur eius expedita assumenda illo quibusdam officia nulla, quaerat modi consectetur consequatur totam commodi hic qui recusandae ratione, labore sit!</p>
        </article>
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



    function setSize() {
        modalImage.style.width = "";
        modalImage.style.height = "";
        modal.style.width = "";
        modal.style.height = "";

        const originalWidth = modalImage.naturalWidth;
        const originalHeight = modalImage.naturalHeight;

        const modalStyle = modal.currentStyle || window.getComputedStyle(modal);
        let paddingVertical = parseInt(modalStyle.paddingLeft) + parseInt(modalStyle.paddingRight);
        let paddingHorizontal = parseInt(modalStyle.paddingTop) + parseInt(modalStyle.paddingBottom);

        let maxWidth = modal.clientWidth - paddingVertical;
        let maxHeight = modal.clientHeight - paddingHorizontal;



        let width = originalWidth + paddingVertical;
        let height = originalHeight + paddingHorizontal;

        if (originalWidth > maxWidth) 
        {
            width = maxWidth;
            height = width * (originalHeight / originalWidth);

            if (height > maxHeight) 
            {
                height = maxHeight;
                width = height * (originalWidth / originalHeight);
            }
        } 
        else if (originalHeight > maxHeight) 
        {
            height = maxHeight;
            width = height * (originalWidth / originalHeight);

            if (width > maxWidth) 
            {
                width = maxWidth;
                height = width * (originalHeight / originalWidth);
            }
        }

        modalImage.style.width = width + "px";
        modalImage.style.height = height + "px";
        modal.style.width = (width + paddingVertical) + "px";
        // modal.style.height = (height + paddingHorizontal) + "px";



        console.log("originalWidth: " + originalWidth);
        console.log("originalHeight: " + originalHeight);
        console.log("aspectRatio: " + (originalWidth / originalHeight));
        console.log("maxWidth: " + maxWidth);
        console.log("maxHeight: " + maxHeight);
        console.log("setWidth: " + width);
        console.log("setHeight: " + height);
        console.log(".");
    }
</script>

</html>