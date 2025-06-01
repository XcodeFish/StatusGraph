# StatusGraph 开发指南 - Cursor规则

## 代码架构指南

### 核心劫持层开发准则

1. **轻量级代理设计**:
   - 使用ES6 Proxy进行拦截
   - 最小化拦截点数量
   - 实现智能采样机制

2. **框架适配器模式**:

   ```javascript
   // 适配器模式示例
   const createAdapter = (framework) => ({
     install: (target) => { /* 实现适配逻辑 */ },
     uninstall: () => { /* 清理逻辑 */ },
     captureState: () => { /* 状态采集逻辑 */ }
   });
   ```

3. **错误隔离策略**:
   - 所有适配器操作必须包含try-catch
   - 实现降级模式自动切换
   - 错误日志聚合但不阻塞主流程

### 状态存储与分析引擎

1. **增量存储设计**:
   - 使用结构共享（Structural Sharing）减少内存占用
   - 差异计算算法性能优化
   - 支持快照压缩与过期清理

2. **依赖追踪优化**:

   ```javascript
   // 高效依赖追踪示例
   const trackDependency = (component, path) => {
     // 使用WeakMap减少内存泄漏风险
     if (!dependencyMap.has(component)) {
       dependencyMap.set(component, new Set());
     }
     dependencyMap.get(component).add(path);
   };
   ```

3. **分析引擎工作模式**:
   - 支持主线程/工作线程双模式
   - 繁重计算任务异步处理
   - 实现任务调度优先级队列

## UI组件开发规范

1. **轻量级渲染策略**:
   - 虚拟滚动实现大数据集展示
   - 组件懒加载
   - 避免不必要的重渲染

2. **响应式设计**:

   ```css
   /* 响应式设计示例 */
   .sg-container {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
     gap: 0.5rem;
   }
   ```

3. **主题支持**:
   - 支持亮色/暗色主题
   - 使用CSS变量实现主题切换
   - 提供高对比度可访问性模式

## 性能优化关键点

1. **内存优化技术**:
   - 使用对象池减少GC压力
   - 实现数据结构扁平化
   - 采用懒计算和记忆化模式

2. **计算性能优化**:

   ```javascript
   // WebAssembly加速示例架构
   const wasmCompute = await WebAssembly.instantiateStreaming(
     fetch('/diffEngine.wasm')
   );

   const computeDiff = (before, after) => {
     // 优化的内存布局和数据传输
     const result = wasmCompute.instance.exports.diff(
       serializeForWasm(before),
       serializeForWasm(after)
     );
     return deserializeFromWasm(result);
   };
   ```

3. **网络传输优化**:
   - 使用TransferableObjects
   - 实现增量更新协议
   - 数据压缩传输

## 测试策略

1. **单元测试范围**:
   - 核心劫持逻辑100%覆盖
   - 框架适配器全面测试
   - 边缘情况与错误处理验证

2. **性能测试基准**:

   ```javascript
   // 性能测试示例
   function benchmarkStateTracking(size) {
     const state = generateLargeState(size);
     const t0 = performance.now();

     trackState(state);

     const t1 = performance.now();
     return {
       size,
       time: t1 - t0,
       memoryUsage: getMemoryUsage()
     };
   }
   ```

3. **自动化测试流程**:
   - 提交前运行单元测试
   - 夜间构建执行集成测试
   - 周期性执行性能回归测试

## 插件开发接口

```javascript
// 标准插件接口
interface StatusGraphPlugin {
  name: string;
  version: string;

  // 生命周期钩子
  onInstall?: (api: StatusGraphAPI) => void;
  onUninstall?: () => void;

  // 事件钩子
  onStateChange?: (newState: any, oldState: any) => void;
  onAction?: (action: any, metadata: any) => void;

  // 自定义UI渲染
  renderPanel?: () => HTMLElement;
}
```

## 调试指南

1. **开发环境配置**:

   ```javascript
   // 开发模式配置
   initStatusGraph({
     mode: 'development',
     debug: true,
     logLevel: 'verbose',
     devTools: true
   });
   ```

2. **常见问题排查**:
   - 框架检测失败 → 检查自动检测函数
   - 性能异常 → 查看采样率与内存限制
   - 数据不同步 → 验证适配器安装顺序

3. **性能分析工具集成**:
   - Chrome DevTools Performance面板
   - Memory使用分析
   - CPU profiling指南

## 最佳实践

1. **渐进式增强**:
   - 先实现核心功能，再添加增强特性
   - 按需加载高级分析模块
   - 提供功能降级路径

2. **可维护性提升**:
   - 代码注释覆盖率>30%
   - 复杂算法需附带解释
   - 遵循单一职责原则

3. **安全开发**:
   - 实现自动数据脱敏
   - 敏感信息处理遵循最小知情原则
   - 本地优先，避免不必要的远程传输
