 // 测试配置文件
// 可添加全局的 Jest 配置，如模拟浏览器环境等

// 例如，可以在这里添加模拟 localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// 模拟 performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
  },
  writable: true,
});

// 全局超时设置
jest.setTimeout(30000); // 30 秒超时