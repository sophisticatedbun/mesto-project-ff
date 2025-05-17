import './pages/index.css';
import { createCard, deleteCard, likeHandler } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

//Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Элементы попапа редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

//Элементы попапа добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageInput = document.querySelector('.popup__input_type_url');

//Элементы попапа с увеличенным изобржением
const imageZoomPopup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', function () {
    openModal(editPopup);
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
});

addCardButton.addEventListener('click', function () {
    openModal(addCardPopup);
});

popups.forEach((popup) => {
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(popup);
    })
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
            closeModal(popup);
        }
    })
    popup.classList.add('popup_is-animated');
});

function handleEditFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editPopup);
}

function handleAddCardSubmit(event) {
    event.preventDefault();
    const card = {
        name: placeNameInput.value,
        link: cardImageInput.value
    }
    placesList.prepend(createCard(card, deleteCard, likeHandler, imageClickHandler));
    addCardForm.reset();
    closeModal(addCardPopup);
}

editForm.addEventListener("submit", handleEditFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

function imageClickHandler(image, caption) {
    const imagePopup = imageZoomPopup.querySelector('.popup__image');
    const imageCaptionPopup = imageZoomPopup.querySelector('.popup__caption');
    imagePopup.src = image;
    imageCaptionPopup.textContent = caption;
    openModal(imageZoomPopup);
}

initialCards.forEach((card) => {
    placesList.append(createCard(card, deleteCard, likeHandler, imageClickHandler));
});