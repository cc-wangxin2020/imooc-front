
export default {
  install(app) {
    const directives = import.meta.glob('./modules/*.js', { import: 'default', eager: true })
    for (const [key, value] of Object.entries(directives)) {
      const keyArr = key.split('/')
      const name = keyArr[keyArr.length - 1].replace('.js', '')
      app.directive(name, value)
    }
  }
}