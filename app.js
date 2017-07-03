const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  moveDown(flick) {
    const i = this.flicks.indexOf(flick)

    if (i < this.flicks.length - 1) {
      this.moveUp(this.flicks[i + 1])
    }
  },

  moveUp(flick) {
    const listItem = this.list.querySelector(`[data-id="${flick.id}"]`)
    const i = this.flicks.indexOf(flick)

    if (i > 0) {
      this.list.insertBefore(listItem, listItem.previousElementSibling)

      const previousFlick = this.flicks[i - 1]
      this.flicks[i - 1] = flick
      this.flicks[i] = previousFlick
    }
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = listItem.classList.toggle('fav')
  },

  removeFlick(flick, ev) {
    // remove from the DOM
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    // remove from the array
    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener(
        'click',
        this.removeFlick.bind(this, flick)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click',
        this.favFlick.bind(this, flick)
      )

    item
      .querySelector('button.move-up')
      .addEventListener(
        'click',
        this.moveUp.bind(this, flick)
      )

    item
      .querySelector('button.move-down')
      .addEventListener(
        'click',
        this.moveDown.bind(this, flick)
      )

    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      fav: false,
    }

    this.flicks.unshift(flick)

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    this.max ++
    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template'
})
