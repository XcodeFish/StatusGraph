 /**
 * 常量定义
 */

/**
 * 默认配置
 */
export const DEFAULT_CONFIG = {
  mode: 'development',
  tracker: {
    enabled: true,
    sampleRate: 1.0, // 默认100%采样率
    memoryLimit: 10, // 默认10MB内存限制
    maxRecords: 200, // 默认记录200条状态变更
    autoDetectFramework: true,
    enableSanitization: false,
  },
  storage: {
    type: 'memory',
    expirationTime: 1000 * 60 * 60, // 1小时
    compression: false,
  },
  enableWasm: true,
  enableWorkers: true,
};

/**
 * 事件名称
 */
export const EVENTS = {
  STATE_CHANGE: 'statusgraph:state-change',
  SNAPSHOT_CREATED: 'statusgraph:snapshot-created',
  ERROR: 'statusgraph:error',
  READY: 'statusgraph:ready',
};

/**
 * 内部通信通道
 */
export const CHANNEL_NAME = '@@statusgraph-internal';

/**
 * 版本信息
 */
export const VERSION = '0.1.0';