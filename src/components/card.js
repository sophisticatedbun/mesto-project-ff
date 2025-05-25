import { likeCard, unlikeCard } from './api.js';

function createCard(cardData, deleteCallback, likeHandler, imageClickHandler, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardId = cardData._id;

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;

    if (cardData.likes.length > 0) {
        cardLikeCounter.classList.add('card__like-counter_is-active');
    }

    if (cardData.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            deleteCallback(cardElement, cardId);
        });
    } else {
        deleteButton.classList.add('card__delete-button_is-inactive');
    }

    cardLikeButton.addEventListener('click', () => likeHandler(cardId, cardLikeButton, cardLikeCounter));
    cardImage.addEventListener("click", () => imageClickHandler(cardData.link, cardData.name));

    return cardElement;
}

function likeHandler(cardId, cardLikeButton, cardLikeCounter) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        unlikeCard(cardId)
            .then((card) => {
                cardLikeCounter.textContent = card.likes.length;
                cardLikeButton.classList.remove('card__like-button_is-active');
                if (card.likes.length === 0) {
                    cardLikeCounter.classList.remove('card__like-counter_is-active');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        likeCard(cardId)
            .then((card) => {
                cardLikeCounter.textContent = card.likes.length;
                cardLikeButton.classList.add('card__like-button_is-active');
                if (card.likes.length > 0) {
                    cardLikeCounter.classList.add('card__like-counter_is-active');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export { createCard, likeHandler };