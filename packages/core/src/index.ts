 /**
 * StatusGraph 核心包入口
 */
import { IStatusGraphConfig, DEFAULT_CONFIG } from '@statusgraph/shared';

/**
 * 初始化 StatusGraph
 * @param options 配置选项
 * @returns 清理函数
 */
export function initStatusGraph(options?: Partial<IStatusGraphConfig>): () => void {
  console.info('StatusGraph 初始化中...');
  
  // 初始化代码将在后续实现
  // 这里只是返回一个占位的清理函数
  return () => {
    console.info('StatusGraph 已清理');
  };
}

export * from './core';
export * from './adapters';
export * from './storage';
export * from './analysis';
export * from './time-travel';
export * from './utils';
export * from './workers';
export * from './plugins';