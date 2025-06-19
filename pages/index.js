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

function handleFormSubmit() {
  // evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  popup.classList.toggle('popup_opened');
});

popupCloseBtn.addEventListener('click', function closePopup() {
  popup.classList.toggle('popup_opened');
});

likeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    console.log('like');
    button.classList.toggle('btn_type_like-active');
  });
});

formElement.addEventListener('submit', handleFormSubmit);
