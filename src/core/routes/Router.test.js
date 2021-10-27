import { Page } from '../Page'
import { Router } from './Router'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { document } = new JSDOM(`...`).window

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router
  let $root

  beforeEach(() => {
    // $root = new JSDOM(`<!DOCTYPE html><div></div>`)
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
