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
// let likeButtons = document.querySelectorAll('.btn_type_like');
// переменные addCardPopup
let addCardPopup = document.querySelector('.popup_type_add-card');
let formAddCardPopup = document.querySelector('.form_type_add-card');
let cardNameInput = document.querySelector('.form__input_el_card-name');
let cardLinkInput = document.querySelector('.form__input_el_card-link');
let addCardPopupCreateBtn = document.querySelector('.btn_type_create');
let addCardPopupCloseBtn = document.querySelector('.popup-add-card-close-btn');

let cardsContainer = document.querySelector('.cards'); // переменная для контейнера карточек
// переменная для карточек шаблона card-template
const cardTemplate = document.querySelector('#card-template').content; // Добавляем .content для доступа к содержимому шаблона

// функция создания карточки, принимает объект карточки cardData и возвращает карточку с картинкой и текстом
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем элемент
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeBtn = cardElement.querySelector('.btn_type_like');

  cardImage.src = cardData.link; // устанавливаем ссылку на картинку
  cardImage.alt = cardData.name; // устанавливаем альт-текст
  cardTitle.textContent = cardData.name; // устанавливаем заголовок

  toggleLikeBtn();

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
  const likeBtn = cardElement.querySelector('.btn_type_like');

  cardImage.src = cardLinkInput.value;
  cardImage.alt = cardNameInput.value;
  cardTitle.textContent = cardNameInput.value.toUpperCase().slice(0, 1) + cardNameInput.value.slice(1);

  cardsContainer.prepend(cardElement);

  cardNameInput.value = '';
  cardLinkInput.value = '';

  addCardPopup.classList.toggle('popup_opened');

  toggleLikeBtn();
}

// функция лайка
function toggleLikeBtn() {
  const likeBtns = document.querySelectorAll('.btn_type_like');

  likeBtns.forEach(btn => {
    btn.addEventListener('click', function (evt) {
      console.log('Like button click');

      evt.target.classList.toggle('btn_type_like-active');
    });
  });
}

// функция добавления имени и профессии
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value.toUpperCase().slice(0, 1) + nameInput.value.slice(1); // первая имени всегда заглавная
  profileDescription.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');
}

function editPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  popup.classList.toggle('popup_opened');
}

// открытие попапа добавления карточки
function openAddCardPopup() {
  addCardPopup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', editPopup);
addCardBtn.addEventListener('click', openAddCardPopup)
popupCloseBtn.addEventListener('click', () =>  popup.classList.toggle('popup_opened')); // закрытие popup
addCardPopupCloseBtn.addEventListener('click', () =>  addCardPopup.classList.toggle('popup_opened')); // закрытие addCardPopup
formElement.addEventListener('submit', handleFormSubmit);
formAddCardPopup.addEventListener('submit', handleAddCardFormSubmit);
