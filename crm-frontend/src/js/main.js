import '../scss/style.scss';
import { Table } from './classes/Table';


main();

function main() {
  const tableElement = document.querySelector('#main-table');
  const table = new Table(tableElement);
  table.init();
}
