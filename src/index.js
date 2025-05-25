import './pages/index.css';
import { createCard, likeHandler } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, deleteCard, updateAvatar } from './components/api.js';

let userId;

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

//Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Элементы попапа редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const editPopupButton = editPopup.querySelector('.popup__button');

//Элементы попапа редактирования аватара
const editAvatarPopup = document.querySelector('.popup_type_edit_avatar');
const editAvatarForm = document.forms['edit-avatar'];
const avatarInput = document.querySelector('.popup__input_type_avatar');
const editAvatarPopupButton = editAvatarPopup.querySelector('.popup__button')

//Элементы попапа добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const cardImageInput = document.querySelector('.popup__input_type_url');
const addCardPopupButton = addCardPopup.querySelector('.popup__button')

//Элементы попапа с увеличенным изобржением
const imageZoomPopup = document.querySelector('.popup_type_image');
const imagePopup = imageZoomPopup.querySelector('.popup__image');
const imageCaptionPopup = imageZoomPopup.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const renderLoading = (isLoading, button) => {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

editButton.addEventListener('click', function () {
    clearValidation(editForm, validationConfig);
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editPopup);
});

profileImage.addEventListener('click', function () {
    avatarInput.value = '';
    clearValidation(editAvatarForm, validationConfig);
    openModal(editAvatarPopup);
});

addCardButton.addEventListener('click', function () {
    clearValidation(addCardForm, validationConfig);
    placeNameInput.value = '';
    cardImageInput.value = '';
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

enableValidation(validationConfig);

function handleEditFormSubmit(event) {
    event.preventDefault();

    renderLoading(true, editPopupButton);
    editProfile(nameInput.value, descriptionInput.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;

            closeModal(editPopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            renderLoading(false, editPopupButton);
        })
}

function handleEditAvatarFormSubmit(event) {
    event.preventDefault();

    renderLoading(true, editAvatarPopupButton);
    updateAvatar(avatarInput.value)
        .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;

            closeModal(editAvatarPopup);
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            renderLoading(false, editAvatarPopupButton);
        })
}

function handleAddCardSubmit(event) {
    event.preventDefault();

    renderLoading(true, addCardPopupButton);
    addNewCard(placeNameInput.value, cardImageInput.value)
        .then(card => {
            const newCard = createCard(card, deleteCardHandler, likeHandler, imageClickHandler, userId);
            placesList.prepend(newCard);
            addCardForm.reset();
            closeModal(addCardPopup);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            renderLoading(false, addCardPopupButton);
        })
}

editForm.addEventListener("submit", handleEditFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

function deleteCardHandler(cardElement, cardId) {
    return deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => {
            console.error(error);
        });
}

function imageClickHandler(image, caption) {
    imagePopup.src = image;
    imagePopup.alt = caption;
    imageCaptionPopup.textContent = caption;
    openModal(imageZoomPopup);
}

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

        userId = userInfo._id;

        cards.forEach(card => {
            placesList.append(createCard(card, deleteCardHandler, likeHandler, imageClickHandler, userId));
        });
    })
    .catch((error) => {
        console.error(error);
    });