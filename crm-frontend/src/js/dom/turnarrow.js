export function turnArrow(type) {
  const el = document.querySelector(`.sort-${type === 'fullname' ? 'name' : type}-btn`);
  const div = el.querySelector('.table-sort');
  div.classList.toggle('direct');

  if (type == 'name') {
    const div2 = el.querySelector('.name-sorting');
    div2.classList.toggle('direct');
  }
}
