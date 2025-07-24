const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// import { initialCards } from './initial-cards.js'; // список карточек
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editBtn = document.querySelector('.btn_type_edit');
let addCardBtn = document.querySelector('.btn_type_add');
let btnSubmit = document.querySelector('.btn_type_save');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.form__input-container');
let nameInput = formElement.querySelector('.form__input_el_name');
let jobInput = formElement.querySelector('.form__input_el_description');
// переменные addCardPopup
let addCardPopup = document.querySelector('.popup_type_add-card');
let formAddCardPopup = document.querySelector('.form_type_add-card');
let cardNameInput = document.querySelector('.form__input_el_card-name');
let cardLinkInput = document.querySelector('.form__input_el_card-link');
let addCardPopupCreateBtn = document.querySelector('.btn_type_create');
let addCardPopupCloseBtn = document.querySelector('.popup-add-card-close-btn');
let cardsContainer = document.querySelector('.cards'); // переменная для контейнера карточек
const cardTemplate = document.querySelector('#card-template').content; // Добавляем .content для доступа к содержимому шаблона
// переменные popup_type_preview
const previewPopup = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image-preview');
const previewDescription = document.querySelector('.popup__description');
const cardImage = document.querySelector('.card__image');
const previewPopupCloswBtn = document.querySelector('.popup-preview-close-btn');

// функция toggle popup
function togglePopup(selectedPopup) {
  selectedPopup.classList.toggle('popup_opened');
}

// функция добавления обработчиков событий на кнопки like и delete
function setEventListeners(cardElement) {
  // обработчик события кнопки like
  cardElement.querySelector('.btn_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  })

  // обработчик события кнопки delete
  cardElement.querySelector('.btn_type_delete').addEventListener('click', function() {
    cardElement.remove();
  })
}

// функция создания карточки, принимает объект карточки cardData и возвращает карточку с картинкой и текстом
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем элемент
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link; // устанавливаем ссылку на картинку
  cardImage.alt = cardData.name; // устанавливаем альт-текст
  cardTitle.textContent = cardData.name; // устанавливаем заголовок

  setEventListeners(cardElement);
  cardImage.addEventListener('click', showCardImage);

  return cardElement; // возвращаем карточку
}

// отрисовка начальных карточек на странице
initialCards.forEach(cardData => {
  const card = createCard(cardData); // вызываем функцию создания карточки

  cardsContainer.append(card);
});

// добавление карточки и закрытия окна добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем элемент
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardLinkInput.value;
  cardImage.alt = cardNameInput.value;
  cardTitle.textContent = cardNameInput.value.toUpperCase().slice(0, 1) + cardNameInput.value.slice(1);

  cardNameInput.value = '';
  cardLinkInput.value = '';

  setEventListeners(cardElement);
  cardsContainer.prepend(cardElement);
  togglePopup(addCardPopup);

  cardImage.addEventListener('click', showCardImage);
}

// функция добавления имени и профессии
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value.toUpperCase().slice(0, 1) + nameInput.value.slice(1); // первая имени всегда заглавная
  profileDescription.textContent = jobInput.value;

  togglePopup(popup);
}

// функция showCardImage
function showCardImage(evt) {
  evt.preventDefault();

  const closestImage = evt.target.closest('.card__image');

  previewImage.src = closestImage.src;
  previewImage.alt = closestImage.alt;
  previewDescription.textContent = closestImage.alt;

  togglePopup(previewPopup);
}

// обработчики событий кнопок popup
editBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  togglePopup(popup);
});
popupCloseBtn.addEventListener('click', () => togglePopup(popup));
formElement.addEventListener('submit', handleFormSubmit);

// обработчики событий кнопок addCardPopup
addCardBtn.addEventListener('click', () => togglePopup(addCardPopup));
addCardPopupCloseBtn.addEventListener('click', () => togglePopup(addCardPopup));
formAddCardPopup.addEventListener('submit', handleAddCardFormSubmit);

// обработчик событий previewPopup
previewPopupCloswBtn.addEventListener('click', () => togglePopup(previewPopup));
