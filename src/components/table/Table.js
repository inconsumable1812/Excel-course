import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click'],
    })
  }

  toHTML() {
    return createTable(33)
  }

  onMousedown(event) {
    if (event.target.dataset.resize === 'col') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const $table = $resizer.closest('.excel__table')
      const num = $parent.$el.dataset.num
      const cells = $table.$el.querySelectorAll(
        `[data-type="resizable-${num}"]`
      )
      const coords = $parent.getCoords()

      document.onmousemove = (e) => {
        const delta = Math.round(e.pageX - coords.right)
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
        cells.forEach((cell) => {
          cell.style.width = value + 'px'
        })
        // $resizer.$el.style.borderRight = '10px solid blue'
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    }

    if (event.target.dataset.resize === 'row') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      console.log(event.target.dataset.resize)

      document.onmousemove = (e) => {
        const delta = Math.round(e.pageY - coords.bottom)
        const value = coords.height + delta
        $parent.$el.style.height = value + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onClick(event) {
    // console.log(event.target)
  }
}
