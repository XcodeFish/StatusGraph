 /**
 * 核心包类型定义
 */
import { 
  ITrackerOptions, 
  IStorageOptions, 
  IStatusGraphConfig,
  IStateChange,
  IStateSnapshot
} from '@statusgraph/shared';

/**
 * 拦截器选项
 */
export interface IInterceptorOptions {
  /**
   * 拦截器名称
   */
  name: string;

  /**
   * 是否启用
   */
  enabled?: boolean;
}

/**
 * 存储引擎接口
 */
export interface IStorageEngine {
  /**
   * 保存状态快照
   * @param snapshot 状态快照
   */
  saveSnapshot(snapshot: IStateSnapshot): Promise<void>;

  /**
   * 获取状态快照
   * @param id 快照ID
   */
  getSnapshot(id: string): Promise<IStateSnapshot | null>;

  /**
   * 获取所有快照
   */
  getAllSnapshots(): Promise<IStateSnapshot[]>;

  /**
   * 清除所有快照
   */
  clearSnapshots(): Promise<void>;

  /**
   * 保存状态变更
   * @param change 状态变更
   */
  saveChange(change: IStateChange): Promise<void>;

  /**
   * 获取状态变更
   * @param id 变更ID
   */
  getChange(id: string): Promise<IStateChange | null>;

  /**
   * 获取指定时间范围内的变更
   * @param startTime 开始时间
   * @param endTime 结束时间
   */
  getChangesByTimeRange(startTime: number, endTime: number): Promise<IStateChange[]>;
}