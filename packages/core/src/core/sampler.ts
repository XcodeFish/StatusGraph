 /**
 * 智能采样策略
 */

/**
 * 判断是否应该捕获当前状态
 * @param sampleRate 采样率
 * @param timeSinceLastCapture 距离上次捕获的时间
 * @returns 是否应该捕获
 */
export function shouldCapture(
  sampleRate: number,
  timeSinceLastCapture: number
): boolean {
  // 基本采样率检查
  if (Math.random() > sampleRate) {
    return false;
  }

  // 时间间隔调整
  // 如果距离上次捕获时间很短，降低捕获概率
  if (timeSinceLastCapture < 100) { // 小于100ms
    return Math.random() < 0.2; // 20%概率捕获
  }

  // 如果距离上次捕获时间适中，使用正常概率
  if (timeSinceLastCapture < 500) { // 小于500ms
    return Math.random() < 0.6; // 60%概率捕获
  }

  // 如果距离上次捕获时间较长，提高捕获概率
  return true; // 100%概率捕获
}

/**
 * 获取自适应采样率
 * @param stateSize 状态大小
 * @param systemLoad 系统负载
 * @returns 采样率
 */
export function getAdaptiveSampleRate(stateSize: number, systemLoad: number): number {
  // 根据状态大小和系统负载调整采样率
  if (stateSize > 1000000 || systemLoad > 0.8) {
    return 0.1; // 低采样率
  } else if (stateSize > 100000 || systemLoad > 0.5) {
    return 0.3; // 中等采样率
  }

  return 0.8; // 高采样率
}