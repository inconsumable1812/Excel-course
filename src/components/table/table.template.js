const CODES = {
  A: 65,
  Z: 90,
}

function toColumn(col, i) {
  return `
  <div class="column" data-type="resizable" data-num="${i}" >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function toCell(_, colNumber) {
  return `
  <div class="cell" contenteditable  data-type="resizable-${colNumber}"></div>
  `
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">${index ? index : ''}
      ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map((el, index) => {
      return toColumn(el, index + 1)
    })
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        return toCell(el, index + 1)
      })
      .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
