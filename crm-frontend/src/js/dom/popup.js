import { deletePopupTemplate,
  editPopupTemplate,
  newPopupTemplate,
  shortBlockTemplate,
  shortBlockBtnTemplate
} from './templates';

const body = document.querySelector('body');

function handlePopupClose(popup) {
  const btns = popup.querySelectorAll('.close-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      popup.remove();
    });
  });
}

function handleShortForm(popup) {
  const shortBlock = popup.querySelector('.short');
  const shortFormBtn = document.querySelector('.short-form');

  shortFormBtn.addEventListener('click', (e) => {
    let shortBtn = shortBlock.querySelector('.add-short');
    if (!shortBtn) {
      document.querySelector('.short-form').style.display = 'none';
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


export function openNewPopup() {
  body.insertAdjacentHTML('beforeend', newPopupTemplate);
  const popup = document.querySelector('#new-client');
  handlePopupClose(popup);
  handleShortForm(popup);
}


export function openEditPopup() {
  body.insertAdjacentHTML('beforeend', editPopupTemplate);
  const popup = document.querySelector('#change-client');
  handlePopupClose(popup);
  handleShortForm(popup);
}


export function openDeletePopup() {
  body.insertAdjacentHTML('beforeend', deletePopupTemplate);
  const popup = document.querySelector('#delete-client');
  handlePopupClose(popup);
}


