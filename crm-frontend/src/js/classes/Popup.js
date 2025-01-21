import { createUser } from '../api/api';
import {
  createContactsForm,
  shortBlockTemplate,
  shortBlockBtnTemplate
} from '../dom/templates';



export class Popup {
  constructor(template, id, table) {
    this.template = template;
    this.id = id;
    this.popup = null;
    this.closeBtns = [];
    this.table = table;
  }

  open() {
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', this.template);
    this.popup = document.querySelector(`#${this.id}`);

    this.closeBtns = this.popup.querySelectorAll('.close-btn');
    this.addCloseListeners();
    this.handleShortForm();
  }

  close() {
    if (this.popup) {
      this.popup.remove();
    }
  }

  addCloseListeners() {
    this.closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });
  }

  handleShortForm() {
    const shortBlock = this.popup.querySelector('.short');
    const shortFormBtn = this.popup.querySelector('.short-form');

    console.log(shortBlock, shortFormBtn);

    shortFormBtn.addEventListener('click', (e) => {
      let shortBtn = shortBlock.querySelector('.add-short');

      if (!shortBtn) {
        shortFormBtn.style.display = 'none';
        shortBlock.style.display = 'block';
        shortBlock.innerHTML = shortBlockTemplate + shortBlockBtnTemplate;

        shortBtn = shortBlock.querySelector('.add-short');
      }

      shortBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const htmlString = shortBlockTemplate;
        shortBtn.insertAdjacentHTML('beforebegin', htmlString);
      });
    }, { once: true });
  }
}

export class DeletePopup extends Popup {
  constructor(template, id, userid, table) {
    super(template, id, table);
    this.userid = userid;
  }

  open() {
    super.open();
    this.btnlistener();
  }

  handleShortForm() {
    return;
  }

  btnlistener() {
    const btnYes = document.getElementById('delete-yes');
    btnYes.addEventListener('click', async e => {
      e.preventDefault();
      let data;

      try {
        data = this.table.deleteUser(this.userid);
        this.popup.remove();
        this.table.fullRender();

      } catch(e) {
        console.log('err', e);
        const error = this.popup.querySelector('.error');
        error.style.display = 'block';
        error.innerHTML = data.message || 'Произошла ошибка, попробуйте еще раз';
      }
    });
  }
}

export class NewClientPopup extends Popup {
  constructor(template, id, table) {
    super(template, id, table);
  }

  open() {
    super.open();
    // this.createContacts();
    this.formHandler();
  }

  formHandler() {
    this.form = this.popup.querySelector("#form-new-client");
    popupFormNewUserHandler(this.form, this.popup, this);
  }


  async createUser(user) {
    let data;

    try {
      data = await this.table.createUser(user);
      this.popup.remove();
      this.table.fullRender();
    } catch (e) {
      console.log('err', e);
      const error = this.popup.querySelector('.error');
      error.style.display = 'block';
      error.innerHTML = data.message || 'Произошла ошибка, попробуйте еще раз';
    }
  }

}


function popupFormNewUserHandler(formElement, popupElement, popup) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const surname = document.getElementById('surname').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastname').value;

    const shorts = popupElement.querySelectorAll('.short__inputs');
    const contacts = [];

    shorts.forEach(s => {
      const select = s.querySelector('select');
      const val = select.options[select.selectedIndex].value;
      const text = s.querySelector('input').value;
      if (text.length > 0) contacts.push({type: val, value: text});
    })

    const user = {
      name,
      surname,
      lastName,
      contacts
    }

    popup.createUser(user);
  });
}


export class EditClientPopup extends Popup {
  constructor(template, id, user, table) {
    super(template, id, table);
    this.user = user;
  }

  open() {
    super.open();
    this.createContacts();
    this.formHandler();
    this.deleteBtnHandler();
  }

  formHandler() {
    this.form = this.popup.querySelector("#form-change-client");
    popupFormEditUserHandler(this.form, this.popup, this);
  }

  setData() {

  }

  createContacts() {
    document.getElementById('popup-change-id').innerText = this.user.id;
    document.getElementById('surnamechange').value = this.user.surname;
    document.getElementById('namechange').value = this.user.name;
    document.getElementById('lastnamechange').value = this.user.lastName;

    if (this.user.contacts.length > 0) {
      const html = createContactsForm(this.user);
      const shortBlock = this.popup.querySelector('.short');
      shortBlock.innerHTML = html;
      shortBlock.style.display = 'block';
      this.popup.querySelector('.short-form').style.display = 'none';

      const shortBtn = shortBlock.querySelector('.add-short');

      shortBtn.addEventListener('click', e => {
        e.preventDefault();
        const htmlString = shortBlockTemplate;
        shortBtn.insertAdjacentHTML('beforebegin', htmlString);
      })
    }
  }


  async patchUser(user) {
    let data;

    try {
      data = await this.table.editUser(this.user.id, user);
      this.popup.remove();
      this.table.fullRender();
    } catch (e) {
      console.log('err', e);
      const error = this.popup.querySelector('.error');
      error.style.display = 'block';
      error.innerHTML = data.errors[0].message || 'Произошла ошибка, попробуйте еще раз';
    }
  }

  deleteBtnHandler() {
    const deleteBtn = document.querySelector('#change-delete-client');
    deleteBtn.addEventListener('click', e => {
      e.preventDefault();
      this.popup.remove();
      this.table.deleteUserPopup(this.user.id);
    });
  }
}


function popupFormEditUserHandler(formElement, popupElement, popup) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const surname = document.getElementById('surnamechange').value;
    const name = document.getElementById('namechange').value;
    const lastName = document.getElementById('lastnamechange').value;

    const shorts = popupElement.querySelectorAll('.short__inputs');
    const contacts = [];

    shorts.forEach(s => {
      const select = s.querySelector('select');
      const val = select.options[select.selectedIndex].value;
      const text = s.querySelector('input').value;
      if (text.length > 0) contacts.push({type: val, value: text});
    })

    const user = {
      name,
      surname,
      lastName,
      contacts
    }

    popup.patchUser(user);
  });
}



