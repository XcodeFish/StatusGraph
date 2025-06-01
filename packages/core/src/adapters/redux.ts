 /**
 * Redux 适配器
 */
import { EFrameworkType } from '@statusgraph/shared';
import { IAdapter } from './common';
import { Interceptor } from '../core/interceptor';

/**
 * Redux Store 类型
 */
interface ReduxStore {
  dispatch: (action: unknown) => unknown;
  getState: () => unknown;
  subscribe: (listener: () => void) => () => void;
}

/**
 * Redux 适配器类
 */
export class ReduxAdapter implements IAdapter {
  public type = EFrameworkType.REDUX;
  private store: ReduxStore | null = null;
  private interceptor: Interceptor | null = null;
  private originalDispatch: ((action: unknown) => unknown) | null = null;
  private unsubscribe: (() => void) | null = null;

  /**
   * 初始化适配器
   * @param store Redux Store 实例
   */
  public init(store: ReduxStore): () => void {
    if (!this.isSupported(store)) {
      throw new Error('不支持的 Redux Store 实例');
    }

    this.store = store;
    this.interceptor = new Interceptor({ name: 'redux-interceptor' });
    
    // 保存原始 dispatch
    this.originalDispatch = store.dispatch;
    
    // 劫持 dispatch 方法
    store.dispatch = (action: unknown) => {
      // 先调用原始 dispatch
      const result = this.originalDispatch!.call(store, action);
      
      // 获取最新状态并通知变更
      const state = store.getState();
      this.interceptor!.addHandler((event) => {
        console.log('Redux 状态变更', event);
        // 后续将添加更多处理逻辑
      });
      
      return result;
    };
    
    // 订阅状态变更
    this.unsubscribe = store.subscribe(() => {
      // 这里可以添加更多状态订阅逻辑
    });
    
    // 返回清理函数
    return () => this.destroy();
  }

  /**
   * 获取当前状态
   */
  public getState(): unknown {
    return this.store ? this.store.getState() : null;
  }

  /**
   * 检查是否支持目标
   * @param store 目标 Redux Store
   */
  public isSupported(store: unknown): boolean {
    return Boolean(
      store &&
      typeof (store as ReduxStore).dispatch === 'function' &&
      typeof (store as ReduxStore).getState === 'function' &&
      typeof (store as ReduxStore).subscribe === 'function'
    );
  }

  /**
   * 销毁适配器，恢复原始状态
   */
  private destroy(): void {
    if (this.store && this.originalDispatch) {
      this.store.dispatch = this.originalDispatch;
    }
    
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    
    if (this.interceptor) {
      this.interceptor.destroy();
    }
    
    this.store = null;
    this.originalDispatch = null;
    this.unsubscribe = null;
    this.interceptor = null;
  }
}