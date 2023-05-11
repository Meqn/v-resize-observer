import ResizeObserver from './ResizeObserver'
import resizeDirective from './directive'
import ResizeComponent from './component'

type InstallFunc = {
  (app: any, ...options: any[]): void;
  installed?: boolean
}

interface InstallOption {
  directive?: string
  component?: string
}

const install: InstallFunc = (app, options: InstallOption = {}) => {
  if (install.installed) return
  install.installed = true

  app.directive(options.directive || 'resize', resizeDirective)
  app.component(options.component || 'ResizeComponent', ResizeComponent)
}

export {
  ResizeObserver,
  ResizeComponent,
  resizeDirective
}

export default {
  install,
  ResizeObserver,
  ResizeComponent,
  resizeDirective,
  directive: resizeDirective,
  component: ResizeComponent
}
