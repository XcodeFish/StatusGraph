 /**
 * 通用适配器接口
 */
import { EFrameworkType } from '@statusgraph/shared';

/**
 * 适配器接口
 */
export interface IAdapter {
  /**
   * 适配器类型
   */
  type: EFrameworkType;
  
  /**
   * 初始化适配器
   * @param target 目标状态管理实例
   * @returns 清理函数
   */
  init(target: unknown): () => void;
  
  /**
   * 获取当前状态
   */
  getState(): unknown;
  
  /**
   * 检查是否支持目标
   * @param target 目标状态管理实例
   */
  isSupported(target: unknown): boolean;
}