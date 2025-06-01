 /**
 * 状态追踪器
 */
import { ITrackerOptions, DEFAULT_CONFIG } from '@statusgraph/shared';
import { detectFramework } from '../utils/framework-detector';
import { shouldCapture } from './sampler';

/**
 * 状态追踪器类
 */
export class StateTracker {
  private options: ITrackerOptions;
  private active: boolean;
  private framework: string;
  private lastCapture: number;

  /**
   * 构造函数
   * @param options 追踪器选项
   */
  constructor(options?: Partial<ITrackerOptions>) {
    this.options = {
      ...DEFAULT_CONFIG.tracker,
      ...options
    } as ITrackerOptions;
    
    this.active = this.options.enabled ?? true;
    this.framework = this.options.framework || 
      (this.options.autoDetectFramework ? detectFramework() : 'unknown');
    this.lastCapture = 0;
  }

  /**
   * 启动追踪器
   */
  public start(): void {
    this.active = true;
    console.info(`StatusGraph 追踪器已启动，当前框架: ${this.framework}`);
  }

  /**
   * 停止追踪器
   */
  public stop(): void {
    this.active = false;
    console.info('StatusGraph 追踪器已停止');
  }

  /**
   * 捕获状态变更
   * @param action 动作
   * @param state 当前状态
   */
  public captureChange(action: unknown, state: unknown): void {
    if (!this.active) return;
    
    const now = performance.now();
    if (shouldCapture(this.options.sampleRate || 1.0, now - this.lastCapture)) {
      this.lastCapture = now;
      // 状态捕获逻辑将在后续实现
      console.info('捕获状态变更', { action, timestamp: now });
    }
  }

  /**
   * 获取当前状态
   */
  public getCurrentState(): Record<string, unknown> {
    // 将在后续实现
    return {};
  }
}