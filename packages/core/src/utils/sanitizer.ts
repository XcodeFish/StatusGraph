 /**
 * 数据脱敏工具
 */

/**
 * 脱敏配置
 */
export interface ISanitizerOptions {
  /**
   * 敏感字段名称或正则
   */
  sensitiveFields?: Array<string | RegExp>;

  /**
   * 大型数据截断长度
   */
  maxStringLength?: number;

  /**
   * 大型数组截断长度
   */
  maxArrayLength?: number;

  /**
   * 脱敏替换值
   */
  redactedValue?: string;
}

/**
 * 数据脱敏处理
 * @param data 原始数据
 * @param options 脱敏选项
 * @returns 脱敏后的数据
 */
export function sanitizeData(
  data: unknown,
  options: ISanitizerOptions = {}
): unknown {
  const {
    sensitiveFields = ['password', 'token', 'secret', 'key', 'auth', 'credential', 'ssn', 'credit'],
    maxStringLength = 1000,
    maxArrayLength = 100,
    redactedValue = '[REDACTED]'
  } = options;

  // 创建正则表达式匹配敏感字段
  const patterns = sensitiveFields.map(field => 
    field instanceof RegExp ? field : new RegExp(field, 'i')
  );

  // 内部递归处理函数
  function process(value: unknown, path: string[] = []): unknown {
    // 处理原始类型
    if (value === null || value === undefined) {
      return value;
    }

    // 处理字符串
    if (typeof value === 'string') {
      // 检查当前路径是否包含敏感字段
      const currentPath = path.join('.');
      const isSensitive = patterns.some(pattern => 
        pattern.test(currentPath) || path.some(segment => pattern.test(segment))
      );

      if (isSensitive) {
        return redactedValue;
      }

      // 截断过长字符串
      if (value.length > maxStringLength) {
        return value.substring(0, maxStringLength) + '...';
      }

      return value;
    }

    // 处理数组
    if (Array.isArray(value)) {
      // 截断过长数组
      const array = value.length > maxArrayLength 
        ? value.slice(0, maxArrayLength)
        : value;
      
      return array.map((item, index) => 
        process(item, [...path, index.toString()])
      );
    }

    // 处理对象
    if (typeof value === 'object') {
      const result: Record<string, unknown> = {};
      
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          result[key] = process((value as Record<string, unknown>)[key], [...path, key]);
        }
      }
      
      return result;
    }

    // 其他类型直接返回
    return value;
  }

  return process(data);
}