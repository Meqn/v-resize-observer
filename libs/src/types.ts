interface IResizeData {
  width: number,
  height: number
}

export interface IOptions {
  /**
   * 延时执行 resize
   * @type number
   * @default 150
   */
  delay?: number
  wait?: number
  /**
   * 是否立即执行
   * @type boolean
   * @default false
   */
  immediate?: boolean
  /**
   * 监听的元素尺寸变化时回调函数
   * @param data 目标元素宽高
   * @param target 目标元素
   * @returns 
   */
  resize?: (data: IResizeData, target: Element) => any
}
