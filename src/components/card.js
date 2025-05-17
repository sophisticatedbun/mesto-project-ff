function createCard(cardData, deleteCallback, likeHandler, imageClickHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLike = cardElement.querySelector('.card__like-button');

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    cardLike.addEventListener('click', likeHandler);
    cardImage.addEventListener("click", () => imageClickHandler(cardData.link, cardData.name));

    return cardElement;
}

function likeHandler(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(card) {
    card.remove();
}

export { createCard, deleteCard, likeHandler };