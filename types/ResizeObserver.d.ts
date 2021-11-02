export default class Resize {
  /**
   * constructor
   * @param {HTMLElement|String} el 目标元素
   * @param {Object} options 选项
   * @param {Boolean} options.disabled 是否可用
   * @param {String} options.limiter 限制resize事件速率
   * @param {Number} options.wait 限制等待时间
   * @param {Function} options.resize resize回调函数
   */
  constructor(el: HTMLElement | string, options?: {
    disabled: boolean;
    limiter: string;
    wait: number;
    resize: Function;
  });
  resizeObserver: Resize;
  currentElement: HTMLElement | null;
  width: number;
  height: number;
  options: {
    wait: number;
  } & {
    disabled: boolean;
    limiter: string;
    wait: number;
    resize: Function;
  };
  init(element: any): void;
  _onResize(): any;
  _handleResize(entries: Array<HTMLElement>): void;
  destroyObserver(): void;
}
