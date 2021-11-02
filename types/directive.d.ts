type Binding = {
  name: string,
  value: any,
  arg: string,
  modifiers: object
}

export const getOptions: (arg: Binding) => void;

interface directive {
  bind(el: HTMLElement, binding: Binding): void;
  unbind(el: HTMLElement): void;
}
export default directive;
