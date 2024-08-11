import { defineAsyncComponent } from 'vue'

export default (app) => {
  const components = import.meta.glob('./*/index.vue')
  for (const [key, value] of Object.entries(components)) {
    const componentName = 'm-' + key.replace('./', '').split('/')[0]
    app.component(componentName, defineAsyncComponent(value))
  }
}