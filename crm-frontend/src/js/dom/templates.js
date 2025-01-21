import { dateStringFormatted } from '../utils/dateStringFormatted.js';
import { timeStringFormatted } from '../utils/timeStringFormatted.js';

export function createUserForTable(user) {
  return `
    <div class="content-field content__id content-id">${user.id}</div>
    <div class="content-field content__name">${user.surname} ${user.name} ${user.lastName || ''}</div>
    <div class="content-field content__date">
      <span class="content-date content__day">${dateStringFormatted(user.createdAt)}</span>
      <span class="content-time content__time">${timeStringFormatted(user.createdAt)}</span>
    </div>
    <div class="content-field content__date">
      <span class="content-date content__change-day">${dateStringFormatted(user.updatedAt)}</span>
      <span class="content-time content__change-time">${timeStringFormatted(user.updatedAt)}</span>
    </div>
    <ul class="content-field content__contacts">
      ${createContacts(user.contacts)}
    </ul>
    <div class="content-field content__actions">
      <button class="content__change btn-change">
        Изменить
      </button>
      <button class="content__delete btn-delete">
        Удалить
      </button>
    </div>
  `;
}

export function createContacts(el) {
  return el.map(c => `
    <li class="content__contact-item">
      <button class="content__contact-btn contact-button contact-${c.type === 'vk' || c.type === 'tel' || c.type === 'email' || c.type === 'fb' ? c.type : 'any'}" data-type="${c.type}" data-value="${c.value}"></button>
    </li>`).join('');
}


export function createContactsForm(userData) {
  return userData.contacts.map(el => `
      <div class="short__inputs">
        <select class="short__select" id="contactValue">
          <option value="${el.type}" selected>${el.type}</option>
          <option value="tel">Телефон</option>
          <option value="vk">Vk</option>
          <option value="fb">Facebook</option>
          <option value="email">Email</option>
          <option value="any">Другое</option>
        </select>
      <input class="short__input" type="text" id="contactValue" placeholder="Введите данные контакта" value="${el.value}">
      <button type="button" class="short__close short-delete"></button>
    </div>
  `).join('') + `<button type="button" class="add-short popup-short-form popup__short-form">Добавить контакт</button>`;
}

export const loaderSVG = `
  <svg class="svg-rotate" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 20C2 29.941 10.059 38 20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C17.6755 2 15.454 2.4405 13.414 3.243" stroke="#9873FF" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" />
  </svg>
`;

export const shortBlockTemplate = `
  <div class="short__inputs">
    <select class="short__select" id="contactType">
      <option value="tel">Телефон</option>
      <option value="vk">Vk</option>
      <option value="fb">Facebook</option>
      <option value="email">Email</option>
      <option value="any">Другое</option>
    </select>
    <input class="short__input" type="text" id="contactValue" placeholder="Введите данные контакта">
    <button type="button" class="short__close short-delete"></button>
  </div>
`;

export const shortBlockBtnTemplate = `
  <button type="button" class="add-short popup-short-form popup__short-form">Добавить контакт</button>
`;

export const deletePopupTemplate = `
  <div class="popup popup-slide is-open" id="delete-client">
    <div class="popup__overlay">
      <div class="popup__container">
        <div class="popup__close close-btn"></div>
        <div class="popup__content">
          <h3 class="popup__header">Удалить клиента</h3>
          <p class="popup__description">Вы действительно хотите удалить данного клиента?</p>
          <p class="error popup__error">Some text here</p>
          <button id="delete-yes" class="btn">Удалить</button>
          <button class="close-btn btn-link">Отмена</button>
        </div>
      </div>
    </div>
  </div>`;

export const newPopupTemplate = `
  <div class="popup popup-slide is-open" id="new-client">
		<div class="popup__overlay">
			<div class="popup__container">
        <div class="popup__close close-btn"></div>
				<div class="popup__content">
          <h3 class="popup__header">Новый клиент</h3>
          <form id="form-new-client" class="popup__form form">
            <input type="text" id="surname" name="surname" placeholder="Фамилия*" required>
            <input type="text" id="name" name="name" placeholder="Имя*" required>
            <input type="text" id="lastname" name="lastname" placeholder="Отчество">
            <div class="popup__btns">
              <div class="short short__block"></div>
              <button type="button" class="short-form popup-short-form popup__short-form">Добавить контакт</button>
              <p class="error popup__error"></p>
              <button type="submit" class="btn popup__btn">Сохранить</button>
              <button type="button" class="close-btn btn-link">Отмена</button>
            </div>
          </form>
				</div>
			</div>
		</div>
	</div>`;

export const editPopupTemplate = `
  <div class="popup popup-slide is-open" id="change-client">
    <div class="popup__overlay">
      <div class="popup__container">
        <div class="popup__close close-btn"></div>
        <div class="popup__content">
          <div class="popup__top">
            <h3 class="popup__header">Изменить данные</h3>
            <p class="popup__id">ID: <span id="popup-change-id">122</span></p>
          </div>
          <form id="form-change-client" class="popup__form form">
            <label for="surname">Фамилия*</label>
            <input type="text" id="surnamechange" name="surnamechange" placeholder="Фамилия*" value="Klll">
            <label for="name">Имя*</label>
            <input type="text" id="namechange" name="namechange" placeholder="Имя*" value="Ololo">
            <label for="lastname">Отчество</label>
            <input type="text" id="lastnamechange" name="lastnamechange" placeholder="Отчество" value="Trololo">
            <div class="popup__btns">
              <div class="short short__block">
              </div>
              <button type="button" class="short-form popup-short-form popup__short-form">Добавить контакт</button>
              <p class="error popup__error"></p>
              <button type="submit" class="form-change-btn btn popup__btn">Сохранить</button>
              <button type="button" class="btn-link" id="change-delete-client">Удалить клиента</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
