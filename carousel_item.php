<div class="carousel-item">



    <div class="carousel-card">
        <img class="carousel-card-image" src="<?= $image ?>">
        <h3 class="carousel-card-title"><?= $title ?></h3>
    </div>



    <dialog class="carousel-modal">

        <button class="carousel-modal-button close">&#10005;</button>

        <button class="carousel-modal-button prev">&#60;</button>

        <img class="carousel-modal-image" src="<?= $image ?>">
        <article class="carousel-modal-article">
            <h2 class="carousel-modal-title"><?= $title ?></h2>
            <p class="carousel-modal-text"><?= $text ?></p>
        </article>

        <button class="carousel-modal-button next">&#62;</button>

    </dialog>



</div>