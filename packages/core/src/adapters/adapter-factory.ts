 /**
 * 适配器工厂
 */
import { EFrameworkType } from '@statusgraph/shared';
import { IAdapter } from './common';
import { ReduxAdapter } from './redux';
import { VuexAdapter } from './vuex';

/**
 * 创建适配器实例
 * @param type 框架类型
 * @returns 适配器实例
 */
export function createAdapter(type: EFrameworkType): IAdapter {
  switch (type) {
    case EFrameworkType.REDUX:
      return new ReduxAdapter();
    case EFrameworkType.VUEX:
      return new VuexAdapter();
    // 其他适配器将在后续实现
    default:
      throw new Error(`不支持的框架类型: ${type}`);
  }
}

/**
 * 自动检测并创建适配器
 * @param target 可选的目标对象
 * @returns 适配器实例或 null
 */
export function autoDetectAdapter(target?: unknown): IAdapter | null {
  const adapters = [
    new ReduxAdapter(),
    new VuexAdapter()
  ];

  // 如果提供了目标对象，检查是否有适配器支持它
  if (target) {
    for (const adapter of adapters) {
      if (adapter.isSupported(target)) {
        return adapter;
      }
    }
    return null;
  }
  
  // 检查全局环境
  if (typeof window === 'undefined') {
    return null;
  }
  
  // 检查全局环境中的特征
  if (window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_STORE__) {
    return new ReduxAdapter();
  }
  
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE__) {
    if (window.__PINIA__ || window.__pinia__) {
      // Pinia 适配器将在后续实现
      return null;
    }
    return new VuexAdapter();
  }
  
  return null;
}