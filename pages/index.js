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
let btnSubmit = document.querySelector('.btn_type_save');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.form__input-container');
let nameInput = formElement.querySelector('.form__input_el_name');
let jobInput = formElement.querySelector('.form__input_el_description');
let likeButtons = document.querySelectorAll('.btn_type_like');

let cardsContainer = document.querySelector('.cards'); // переменная для контейнера карточек
// переменные шаблона card-template
const cardTemplate = document.querySelector('#card-template').content; // Добавляем .content для доступа к содержимому шаблона

// функция создания карточки, принимает объект карточки cardData и возвращает карточку с картинкой и текстом
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонируем элемент
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link; // устанавливаем ссылку на картинку
  cardImage.alt = cardData.name; // устанавливаем альт-текст
  cardTitle.textContent = cardData.name; // устанавливаем заголовок

  return cardElement; // возвращаем карточку
}

// отрисовка начальных карточек на странице
initialCards.forEach(function(cardData) {
  const card = createCard(cardData);
  cardsContainer.append(card);
});

function handleFormSubmit(evt) {
  console.log('Функция handleFormSubmit вызвана!');

  evt.preventDefault();

  console.log('click');

  profileName.textContent = nameInput.value.toUpperCase().slice(0, 1) + nameInput.value.slice(1);
  profileDescription.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');
}

function editPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  popup.classList.toggle('popup_opened');
}

function closePopup() {
  popup.classList.toggle('popup_opened');
}

likeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    console.log('like');
    button.classList.toggle('btn_type_like-active');
  });
});

editBtn.addEventListener('click', editPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
