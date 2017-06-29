const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.dataset.id = flick.id
    item.textContent = flick.name
    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.flicks.push(flick)

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)

    this.max ++
    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})
