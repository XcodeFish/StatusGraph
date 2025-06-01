 /**
 * 通用类型定义
 */

/**
 * 通用ID类型
 */
export type TId = string;

/**
 * 时间戳类型
 */
export type TTimestamp = number;

/**
 * 框架类型
 */
export enum EFrameworkType {
  REDUX = 'redux',
  VUEX = 'vuex',
  PINIA = 'pinia',
  RECOIL = 'recoil',
  JOTAI = 'jotai',
  UNKNOWN = 'unknown',
}

/**
 * 错误类型
 */
export interface IError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * 插件接口
 */
export interface IPlugin {
  name: string;
  version: string;
  init: () => void | Promise<void>;
  destroy: () => void | Promise<void>;
}