// открытие popup элемента
const popupEdit = document.querySelector('.popup_edit');
const popupAdd =  document.querySelector('.popup_add');
const zoomPopup = document.querySelector('.popup_zoom');
const closeButton = document.querySelector('.popup__close-icon');
const closeButtonAdd = popupAdd.querySelector('.popup__close-icon');
const closeButtonZoom = zoomPopup.querySelector('.popup__close-icon');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupCards = document.querySelector('.popup__cards');
const popupCardTitle = document.querySelector('.popup__card-title');

const nameInput = popupAdd.querySelector('#name');
const aboutInput = popupAdd.querySelector('#about');

const newName = document.querySelector('#Newname');
const newAbout = document.querySelector('#Newabout');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const profileForm = popupEdit.querySelector('.popup__form');
const profileFormAdd = popupAdd.querySelector('.popup__form-add');

// функция открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
    };

editButton.addEventListener('click', function () {
  openPopup(popupEdit)
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  });

  addButton.addEventListener('click', function () {
    openPopup(popupAdd)
    });

 //закрытие попапа
 closeButton.addEventListener("click", function () {
  closePopup(popupEdit);
});
closeButtonAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});

  closeButtonZoom.addEventListener('click', function () {
    closePopup(zoomPopup);
  });

  // функция редактирования  профиля
function editProfileInfo(evt) {
  evt.preventDefault(); //отменяем стандартное событие
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
}
//созданение информации  редактирования
profileForm.addEventListener('submit', editProfileInfo);

// добавление фото из массива
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

const cardElement = document.querySelector('.elements__card');
const elementsTemplate = document.querySelector('#elements-template').content;

  function likeActive(evt) {
    evt.target.classList.toggle('elements__button-like_active');
  }


  const createPlaceCard = function (items) {
    const elementsCard = elementsTemplate.querySelector('.elements__item').cloneNode(true);
    const cardImage =  elementsCard.querySelector('.elements__image');
    cardImage.src = items.link;
    cardImage.alt = items.name;
    elementsCard.querySelector('.elements__caption').textContent = items.name;

    elementsCard.querySelector('.elements__button-like').addEventListener ('click', likeActive);

    elementsCard.querySelector('.elements__delete').addEventListener ('click', function () {
      elementsCard.remove();
    });

    cardImage.addEventListener ('click', function (){
      popupCards.src = items.link;
      popupCards.alt = items.name;
      popupCardTitle.textContent = items.name;
      openPopup (zoomPopup);
    });

    return elementsCard;
  };


// функция добавления попапа с фотографией
  const addNewCards = function(items) {
    cardElement.prepend(createPlaceCard(items));
  };

  const addCard = function (evt) {
    evt.preventDefault();
    const items = {};
    items.link = newAbout.value;
    items.name = newName.value;
    addNewCards (items);
    closePopup(popupAdd);
    profileFormAdd.reset();
  };

  profileFormAdd.addEventListener('submit', addCard);

  const cardsList = initialCards.map (function (items) {
    return createPlaceCard(items);
  });
cardElement.append (...cardsList);


