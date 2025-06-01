 /**
 * Vuex 适配器
 */
import { EFrameworkType } from '@statusgraph/shared';
import { IAdapter } from './common';
import { Interceptor } from '../core/interceptor';

/**
 * Vuex Store 类型
 */
interface VuexStore {
  commit: (type: string, payload?: unknown) => void;
  dispatch: (type: string, payload?: unknown) => Promise<unknown>;
  state: Record<string, unknown>;
  replaceState: (state: Record<string, unknown>) => void;
  subscribe: (fn: (mutation: unknown, state: unknown) => void) => () => void;
  subscribeAction: (fn: (action: unknown, state: unknown) => void) => () => void;
}

/**
 * Vuex 适配器类
 */
export class VuexAdapter implements IAdapter {
  public type = EFrameworkType.VUEX;
  private store: VuexStore | null = null;
  private interceptor: Interceptor | null = null;
  private unsubscribeMutation: (() => void) | null = null;
  private unsubscribeAction: (() => void) | null = null;

  /**
   * 初始化适配器
   * @param store Vuex Store 实例
   */
  public init(store: VuexStore): () => void {
    if (!this.isSupported(store)) {
      throw new Error('不支持的 Vuex Store 实例');
    }

    this.store = store;
    this.interceptor = new Interceptor({ name: 'vuex-interceptor' });
    
    // 订阅 mutation
    this.unsubscribeMutation = store.subscribe((mutation, state) => {
      this.interceptor!.addHandler((event) => {
        console.log('Vuex Mutation', event, mutation, state);
        // 后续将添加更多处理逻辑
      });
    });
    
    // 订阅 action
    this.unsubscribeAction = store.subscribeAction((action, state) => {
      this.interceptor!.addHandler((event) => {
        console.log('Vuex Action', event, action, state);
        // 后续将添加更多处理逻辑
      });
    });
    
    // 返回清理函数
    return () => this.destroy();
  }

  /**
   * 获取当前状态
   */
  public getState(): unknown {
    return this.store ? this.store.state : null;
  }

  /**
   * 检查是否支持目标
   * @param store 目标 Vuex Store
   */
  public isSupported(store: unknown): boolean {
    return Boolean(
      store &&
      typeof (store as VuexStore).commit === 'function' &&
      typeof (store as VuexStore).dispatch === 'function' &&
      typeof (store as VuexStore).subscribe === 'function' &&
      (store as VuexStore).state !== undefined
    );
  }

  /**
   * 销毁适配器，恢复原始状态
   */
  private destroy(): void {
    if (this.unsubscribeMutation) {
      this.unsubscribeMutation();
    }
    
    if (this.unsubscribeAction) {
      this.unsubscribeAction();
    }
    
    if (this.interceptor) {
      this.interceptor.destroy();
    }
    
    this.store = null;
    this.unsubscribeMutation = null;
    this.unsubscribeAction = null;
    this.interceptor = null;
  }
}