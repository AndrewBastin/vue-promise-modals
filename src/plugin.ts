import { AllowedComponentProps, Component, Plugin, TransitionGroupProps, VNodeProps, inject, markRaw, reactive } from "vue"

export const ModalSystemSymbol = Symbol("modal-system")

export type ModalDef<Props> = {
  id: number
  component: Component<Props>
  props: Props
}

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  // TODO: Specifically say which emits instead of blocking all
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps | `on${string}`>
  : never;

type ComponentResolve<C extends Component> = C extends new (...args: any) => any
  ? Parameters<InstanceType<C>["$props"]["onModal-resolve"]>[0]
  : never;

export type OpenFunc = {
  <C extends Component>(component: C, props: ComponentProps<C>): void
}

export type ResolveFunc = {
  <C extends Component & (new (...args: any) => any)>(
    ...args: 
      {} extends ComponentProps<C>
        ? [component: C, props?: ComponentProps<C>] 
        : [component: C, props: ComponentProps<C>]
  ): Promise<ComponentResolve<C>>
}

export class ModalSystem {
  private idTicker: number = 0

  public modalStack: ModalDef<unknown>[] = reactive([])
  public resolveMap: Map<number, [(value: unknown) => void, (error: unknown) => void]> = new Map();

  public constructor(
    public options: PluginOptions
  ) {}

  public closeModal(id: number, data: unknown) {
    const index = this.modalStack.findIndex((modal) => modal.id === id)

    if (index >= 0) {
      this.modalStack.splice(index, 1)
      this.resolveMap.get(id)?.[0](data)
      this.resolveMap.delete(id)
    }
  }

  public closeModalAsRejected(id: number, data: unknown) {
    const index = this.modalStack.findIndex((modal) => modal.id === id)

    if (index >= 0) {
      this.modalStack.splice(index, 1)
      this.resolveMap.get(id)?.[1](data)
      this.resolveMap.delete(id)
    }
  }

  openModal<C extends Component, P extends ComponentProps<C>>(
    component: C,
    props: P | undefined
  ) {
    const id = this.idTicker

    this.idTicker++

    this.modalStack.push({
      id,
      props: props,
      component: markRaw(component)
    })

    const promise = new Promise<ComponentResolve<C>>((resolve, reject) => {
      // @ts-expect-error - TypeScript not understanding the situation with resolve
      this.resolveMap.set(id, [resolve, reject])
    })

    return promise
  }
}

export function useModals() {
  const modalSystem = inject<ModalSystem>(ModalSystemSymbol)

  if (!modalSystem) {
    throw new Error("No modal system provided")
  }

  return {
    openModal: modalSystem.openModal.bind(modalSystem) as ResolveFunc,
  }
}

export type PluginOptions = {
  transition?: TransitionGroupProps
}

export const plugin: Plugin<PluginOptions> = {
  install(app, options) {
    const system = new ModalSystem(options)

    app.provide(ModalSystemSymbol, system)
  }
}