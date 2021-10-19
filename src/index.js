import ResizeObserver from './lib/ResizeObserver'
import resizeDirective from './directive/resizeDirective'
import ResizeComponent from './component/ResizeObserver.vue'


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

export default ResizeObserver
