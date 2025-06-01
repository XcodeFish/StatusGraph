 /**
 * 状态相关类型定义
 */
import { TId, TTimestamp } from './common';

/**
 * 状态路径类型
 */
export type TStatePath = string[];

/**
 * 状态变更类型
 */
export enum EActionType {
  SET = 'set',
  DELETE = 'delete',
  CLEAR = 'clear',
  RESET = 'reset',
  BATCH = 'batch',
}

/**
 * 状态变更记录
 */
export interface IStateChange {
  id: TId;
  timestamp: TTimestamp;
  type: EActionType;
  path?: TStatePath;
  value?: unknown;
  prevValue?: unknown;
  metadata?: Record<string, unknown>;
}

/**
 * 状态快照
 */
export interface IStateSnapshot {
  id: TId;
  timestamp: TTimestamp;
  state: unknown;
  changes: IStateChange[];
  metadata?: Record<string, unknown>;
}

/**
 * 状态补丁（增量更新）
 */
export interface IStatePatch {
  path: TStatePath;
  oldValue: unknown;
  newValue: unknown;
  timestamp: TTimestamp;
}