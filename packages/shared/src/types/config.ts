 /**
 * 配置相关类型定义
 */
import { EFrameworkType } from './common';

/**
 * 追踪器配置选项
 */
export interface ITrackerOptions {
  /**
   * 是否启用
   */
  enabled?: boolean;
  
  /**
   * 采样率，0-1之间的数字
   */
  sampleRate?: number;
  
  /**
   * 内存使用上限(MB)
   */
  memoryLimit?: number;
  
  /**
   * 最大记录数量
   */
  maxRecords?: number;
  
  /**
   * 是否自动检测框架
   */
  autoDetectFramework?: boolean;
  
  /**
   * 指定框架类型
   */
  framework?: EFrameworkType;
  
  /**
   * 是否启用数据脱敏
   */
  enableSanitization?: boolean;
  
  /**
   * 敏感字段规则
   */
  sensitiveFields?: string[] | RegExp[];
}

/**
 * 存储配置选项
 */
export interface IStorageOptions {
  /**
   * 存储类型
   */
  type?: 'memory' | 'indexeddb' | 'localstorage';
  
  /**
   * 数据过期时间(ms)
   */
  expirationTime?: number;
  
  /**
   * 是否压缩存储
   */
  compression?: boolean;
}

/**
 * 工具完整配置
 */
export interface IStatusGraphConfig {
  /**
   * 运行模式
   */
  mode?: 'development' | 'production';
  
  /**
   * 追踪器配置
   */
  tracker?: ITrackerOptions;
  
  /**
   * 存储配置
   */
  storage?: IStorageOptions;
  
  /**
   * 是否启用WebAssembly加速
   */
  enableWasm?: boolean;
  
  /**
   * 是否启用工作线程
   */
  enableWorkers?: boolean;
}