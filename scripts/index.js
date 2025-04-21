const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content; 

function createCard (cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => { 
         deleteCallback(cardElement); 
     }); 

     return cardElement;
}

function deleteCard (card) {
    card.remove();
}

initialCards.forEach((card) => {
    placesList.append(createCard(card, deleteCard));
});