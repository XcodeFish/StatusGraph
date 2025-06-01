# StatusGraph 快速参考指南

## 核心性能指标
- 核心体积: <5KB
- 内存占用: <10MB
- CPU占用: <3%
- 支持节点: 100,000+
- 启动时间: <100ms

## 命名空间结构
```javascript
window.StatusGraph = {
  version: \"1.0.0\",
  adapters: {},
  plugins: {},
  config: {},
  api: {}
};
```

## 框架支持优先级
1. Redux (React)
2. Vuex/Pinia (Vue)
3. MobX
4. Recoil/Jotai
5. Zustand
6. NgRx (Angular)

## 配置示例
```javascript
initStatusGraph({
  mode: \"development\",
  sampleRate: 0.5,
  memoryLimit: 8,
  maxHistory: 50,
  sensitiveKeys: [\"password\", \"token\"],
  debug: false,
  logLevel: \"warn\"
});
```

## 调试技巧
- `StatusGraph.debug.dump()` 导出当前状态
- `StatusGraph.debug.monitor()` 开始性能监控
- `Ctrl+Alt+S` 触发调试面板
- `StatusGraph.debug.trace()` 启用详细日志
