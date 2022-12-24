const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const cellBtn = document.querySelector("#cell-btn");
const ROWS = 20;
const COLS = 20;
const spreadsheet = [];
const origionalAlphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const makeRepeated = (arr, repeats) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

alphabets = makeRepeated(origionalAlphabets, COLS);

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.rowName = rowName;
    this.column = column;
    this.columnName = columnName;
    this.active = active;
  }
}

cellBtn.onclick = function () {
  let copy = alphabets.slice();
  copy.sort(() => Math.random() - 0.5);
  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.border = "0px";
    if (cells[i].value == "") {
      cells[i].value = copy[i];
    }
  }
  cellBtn.style.display = "none";
};

initSpreadsheet();

function initSpreadsheet() {
  for (let i = 0; i < COLS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;
      cellData = "";
      const rowName = i;
      const columnName = alphabets[j - 1];
      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
}

function drawSheet() {
  spreadSheetContainer.innerHTML = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellEl(cell));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}

function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.maxLength = "1";
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }
  cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

  return cellEl;
}

function handleOnChange(data, cell) {
  cell.data = data;
}

function getElFromRowCol(row, col) {
  return document.querySelector("#cell_" + row + col);
}
