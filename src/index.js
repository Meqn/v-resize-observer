import ResizeObserver from './ResizeObserver'
import resizeDirective from './directive'
import ResizeComponent from './component.vue'


const install = function(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.directive('resize', resizeDirective)
  Vue.component('ResizeObserver', ResizeComponent)
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(install) // eslint-disable-line
}

ResizeObserver.install = install
ResizeObserver.directive = resizeDirective
ResizeObserver.component = ResizeComponent
// eslint-disable-next-line no-undef
ResizeObserver.version = VERSION

export default ResizeObserver
