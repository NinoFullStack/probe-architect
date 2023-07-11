// Import vue component
import Body from './components/Body.vue'
import { defu } from 'defu'

class InstallClass {
  constructor() {
    this.options = {}
    this.defaults = {
      components: {
        Body,
      },
    }
  }

  install(app, options) {
    if (typeof window !== 'undefined') {
      // Set default options
      this.options = defu(options || {}, this.defaults)

      Object.entries(this.options.components).forEach(
        ([componentName, component]) => {
          app.component(componentName, component)
        }
      )
    }
  }
}

export default new InstallClass()
