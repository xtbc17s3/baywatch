const app = {
  init(formSelector) {
    this.max = 0
    document
      .querySelector(formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    console.log(flick)
    this.max ++
  },
}

app.init('form#flick-form')
