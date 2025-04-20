const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content; 

function createCard (initialCard, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = initialCard.name;
    cardImage.src = initialCard.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => { 
         deleteCallback(cardElement); 
     }); 

     return cardElement;
}

function deleteCard (deleteButton) {
    const closestCard = deleteButton.closest('.card');
    closestCard.remove();
}

initialCards.forEach((card) => {
    placesList.append(createCard(card, deleteCard));
});