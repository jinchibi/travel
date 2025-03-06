# Travel Project

这是一个旅游相关的全栈应用项目，包含前端和后端代码。

## 项目结构

```
├── client/          # 前端代码
│   ├── src/         # 源代码
│   ├── public/      # 静态资源
│   └── ...         # 其他配置文件
└── server/          # 后端代码
    ├── routes/      # 路由文件
    └── app.js       # 入口文件
```

## 技术栈

### 前端
- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia

### 后端
- Node.js
- Express

## 安装说明

1. 克隆项目
```bash
git clone [项目地址]
cd travel
```

2. 安装前端依赖
```bash
cd client
pnpm install
```

3. 安装后端依赖
```bash
cd server
pnpm install
```

## 运行项目

1. 启动前端开发服务器
```bash
cd client
pnpm dev
```

2. 启动后端服务器
```bash
cd server
node app.js
```

## 项目功能

- 多模态交互
- 笔记管理
- 推荐系统
- 数据可视化

## 开发指南

- 前端开发请参考 `client/README.md`
- 后端API文档位于 `server/routes/` 目录下各路由文件中

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request