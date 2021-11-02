import Vue, { DirectiveOptions, Component } from 'vue'

import ResizeObserverClass from "./ResizeObserver"
interface ResizeObserver extends ResizeObserverClass {
  install(app: Vue): void,
  directive: DirectiveOptions,
  component: Component
}
export default ResizeObserver;
export const ResizeComponent: Component;
export const resizeDirective: DirectiveOptions;
