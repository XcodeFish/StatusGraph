 /**
 * 框架检测工具
 */
import { EFrameworkType } from '@statusgraph/shared';

/**
 * 检测当前应用使用的状态管理框架
 * @returns 检测到的框架类型
 */
export function detectFramework(): EFrameworkType {
  if (typeof window === 'undefined') {
    return EFrameworkType.UNKNOWN;
  }

  // 检测 Redux
  if (window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_STORE__) {
    return EFrameworkType.REDUX;
  }

  // 检测 Vuex
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE__) {
    // Vuex 和 Pinia 进一步区分
    if (window.__PINIA__ || window.__pinia__) {
      return EFrameworkType.PINIA;
    }
    return EFrameworkType.VUEX;
  }

  // 检测 Recoil
  if (window.__RECOIL_ROOT_SET) {
    return EFrameworkType.RECOIL;
  }

  // 检测 Jotai
  if (window.__JOTAI_DEV_TOOLS_HOOK__) {
    return EFrameworkType.JOTAI;
  }

  return EFrameworkType.UNKNOWN;
}