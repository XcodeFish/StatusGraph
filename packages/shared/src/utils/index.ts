/**
 * 工具函数
 */

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * 获取当前时间戳
 */
export function getTimestamp(): number {
  return performance.now();
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(sourceValue) &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * 估计对象大小（内存占用）
 */
export function estimateSize(obj: unknown): number {
  const seen = new WeakSet();
  
  function sizeOf(value: unknown): number {
    if (value === null) return 0;
    
    const type = typeof value;
    if (type === 'boolean') return 4;
    if (type === 'number') return 8;
    if (type === 'string') return 2 * (value as string).length;
    if (type !== 'object') return 0;
    
    const object = value as Record<string, unknown>;
    
    // 检测循环引用
    if (seen.has(object)) return 0;
    seen.add(object);
    
    // 数组处理
    if (Array.isArray(object)) {
      return object.reduce((acc, val) => acc + sizeOf(val), 0);
    }
    
    // 对象处理
    return Object.entries(object).reduce(
      (acc, [key, val]) => acc + 2 * key.length + sizeOf(val),
      0
    );
  }
  
  return sizeOf(obj);
}

/**
 * 安全的 JSON 解析
 */
export function safeJsonParse(str: string, fallback: unknown = {}): unknown {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return fallback;
  }
}

/**
 * 获取对象路径
 */
export function getPathValue(obj: unknown, path: string[]): unknown {
  let current = obj;
  
  for (const key of path) {
    if (current === null || current === undefined) {
      return undefined;
    }
    
    current = (current as Record<string, unknown>)[key];
  }
  
  return current;
}

/**
 * 设置对象路径值
 */
export function setPathValue(
  obj: Record<string, unknown>,
  path: string[],
  value: unknown
): Record<string, unknown> {
  if (path.length === 0) return obj;
  
  const result = { ...obj };
  let current = result;
  
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    current[key] = current[key] ? { ...current[key] as Record<string, unknown> } : {};
    current = current[key] as Record<string, unknown>;
  }
  
  current[path[path.length - 1]] = value;
  return result;
} 