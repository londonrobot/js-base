import { getUsers, deleteUser, createUser, patchUserById } from '../api/api.js';
import { User } from './User.js';
import { wait } from '../api/api.js';
import { turnArrow } from '../dom/turnarrow.js';
import { openDeletePopup, openEditPopup, openNewPopup } from '../dom/popup.js';
import { createContactsForm,
  createUserForTable,
  shortBlockTemplate,
  loaderSVG,
  deletePopupTemplate,
  editPopupTemplate,
  newPopupTemplate } from '../dom/templates.js';
import { DeletePopup, EditClientPopup, NewClientPopup } from './Popup.js';

export class Table {
  constructor(tableElement) {
    this.table = tableElement;
    this.users = [];
    this.timeoutId = null;
    this.sorting = {
      id: true,
      fullname: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async init() {
    this.fullRender();
    this.setListeners();
  }

  setListeners() {
    this.sortListener();
    this.searchListener();
    this.newClientBtnListener();
    this.bodyListener();
  }

  async fullRender(param = '') {
    this.table.innerHTML = ``;
    const scroll = window.scrollY;
    this.showloader();
    await this.getData(param);
    this.createTable();
    window.scrollTo(0, parseInt(scroll, 10));
  }

  rerender() {
    this.table.innerHTML = ``;
    const scroll = window.scrollY;
    this.createTable();
    window.scrollTo(0, parseInt(scroll, 10));
  }

  async getData(param) {
    const data = await getUsers(param);
    this.users = data.map(el => new User(el));
  }

  async createTable() {
    this.table.innerHTML = ``;

    for (const user of this.users) {
      await wait(20);

      const row = document.createElement('div');
      row.setAttribute('data-id', user.id);
      row.classList = 'table__row content';
      row.innerHTML = createUserForTable(user);

      row.addEventListener('click', (event) => {
        this.handleRowClick(event);
      });

      this.table.appendChild(row);
    }
  }

  handleRowClick(e) {
    const userId = e.currentTarget.getAttribute('data-id');
    const user = this.users.find(u => u.id == userId);

    if (e.target.classList.contains('btn-delete')) {
      this.deleteUserPopup(userId);
    }
    if (e.target.classList.contains('btn-change'))
      this.editUserPopup(user);
  }

  deleteUserPopup(userId) {
    this.deletePopup = new DeletePopup(deletePopupTemplate, 'delete-client', userId, this);
    this.deletePopup.open();
  }

  async deleteUser(id) {
    return await deleteUser(id);
  }

  newUserPopup() {
    this.newClientPopup = new NewClientPopup(newPopupTemplate, 'new-client', this);
    this.newClientPopup.open();
  }

  async createUser(user) {
    return await createUser(user);
  }

  async editUserPopup(user) {
    this.newClientPopup = new EditClientPopup(editPopupTemplate, 'change-client', user, this);
    this.newClientPopup.open();
  }

  async editUser(id, user) {
    return await patchUserById(id, user);
  }

  showloader() {
    const loaderContainer = document.createElement('div');
    loaderContainer.classList = 'table__row table__loader';

    loaderContainer.innerHTML = loaderSVG;
    this.table.append(loaderContainer);
  }

  sortListener() {
    this.sorting = {
      id: true,
      fullname: true,
      createdAt: true,
      updatedAt: true
    }

    const header = document.getElementById('header-table');
    header.addEventListener('click', (e) => {
      const type = e.target.closest('.table-header').getAttribute('data-sort');
      turnArrow(type);
      this.sorting[type] = !this.sorting[type];

      switch(type) {
        case 'id':
          this.users.sort((a, b) => b.id - a.id);
          break;
        case 'fullname':
          this.users.sort((a, b) => {
            const criteria = ['surname', 'name', 'lastName'];
            for (let c of criteria) {
              if (a[c] < b[c]) return -1;
              if (a[c] > b[c]) return 1;
            }
            return 0;
          });
          break;
        case 'createdAt':
        case 'updatedAt':
          this.users.sort((a, b) => new Date(a[type]) - new Date(b[type]));
          break;
      }
      if (!this.sorting[type]) this.users.reverse();
      this.rerender();

    });
  }

  searchListener() {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.fullRender(searchInput.value);
      }, 300);
    })
  }

  // новый пользователь
  newClientBtnListener() {
    const newClientBtn = document.getElementById('client-add-btn');
    newClientBtn.addEventListener('click', this.newUserPopup.bind(this));
  }

  bodyListener() {
    document.querySelector('body').addEventListener('click', e => {
      if (e.target.classList.contains('popup__overlay')) {
        document.querySelectorAll('.popup').forEach(p => p.remove());
      }

      if (e.target.classList.contains('short-delete')) {
        e.preventDefault();
        const short = e.target.closest('.short__inputs');
        short?.remove();
      }
    });
  }
}

