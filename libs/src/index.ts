import ResizeObserver from './ResizeObserver'
import resizeDirective from './directive'
import ResizeComponent from './component'

type InstallFunc = {
  (app: any): void;
  installed?: boolean
}

const install: InstallFunc = (app) => {
  if (install.installed) return
  install.installed = true
  app.directive('resize', resizeDirective)
  app.component('ResizeComponent', ResizeComponent)
}

export {
  ResizeObserver,
  ResizeComponent,
  resizeDirective
}

export default {
  install,
  ResizeObserver,
  directive: resizeDirective,
  component: ResizeComponent
}
