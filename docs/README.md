# React Code View - 新文档架构说明

## 📁 项目结构

```
docs/
├── components/          # 可复用的文档组件
│   ├── Header.tsx      # 顶部导航栏
│   ├── Sidebar.tsx     # 侧边栏导航
│   ├── CodeBlock.tsx   # 代码块展示组件
│   ├── FeatureCard.tsx # 功能特性卡片
│   └── Section.tsx     # 页面章节组件
├── pages/              # 文档页面
│   ├── OverviewPage.tsx        # 概览页面
│   ├── GettingStartedPage.tsx  # 快速开始页面
│   ├── APIPage.tsx             # API文档页面
│   └── ExamplesPage.tsx        # 示例页面
├── styles/
│   └── index.css       # 专业简洁的样式系统
└── index.tsx           # 主应用入口
```

## 🎯 设计理念

### 1. **专业简洁**
- 遵循 CodeMirror、Shiki 等业界优秀文档的设计风格
- 去除了所有炫酷动画，专注于内容的可读性
- 采用系统化的设计语言（统一的间距、颜色、字体）

### 2. **清晰的信息架构**
```
Overview (概览)
├── Features (功能特性)
├── Quick Example (快速示例)
└── Why React Code View? (优势说明)

Getting Started (快速开始)
├── Installation (安装)
├── Quick Start (快速上手)
├── Build Tools (构建工具集成)
└── Theme Configuration (主题配置)

API Reference (API文档)
├── CodeEditor (代码编辑器)
├── Renderer (渲染器)
├── MarkdownRenderer (Markdown渲染器)
└── TypeScript Types (类型定义)

Examples (示例)
├── Basic Usage (基础用法)
├── Interactive Editor (交互式编辑器)
├── TypeScript Support (TypeScript支持)
├── Multiple Languages (多语言支持)
└── Build Tool Integration (构建工具集成)
```

### 3. **易于上手**
- **渐进式学习路径**：Overview → Getting Started → API → Examples
- **代码示例即看即懂**：每个示例都有完整的代码和即时预览
- **清晰的API表格**：所有Props、类型都以表格形式展示

### 4. **响应式设计**
- 桌面端：完整的侧边栏导航
- 平板/移动端：自适应布局，隐藏侧边栏

## 🎨 样式系统

### CSS变量系统
```css
/* 颜色 */
--color-bg              # 主背景色
--color-text            # 主文本色
--color-link            # 链接色
--color-accent          # 强调色

/* 间距 */
--spacing-xs ~ --spacing-2xl

/* 字体 */
--font-family
--font-family-mono
--font-size-sm ~ --font-size-4xl

/* 圆角 */
--radius-sm ~ --radius-xl

/* 阴影 */
--shadow-sm ~ --shadow-lg
```

### 暗色模式支持
- 自动切换所有CSS变量
- 代码块主题同步切换
- 持久化主题偏好（localStorage）

## 🔧 技术特点

### 组件化设计
- **Header**: 固定顶部导航，主题切换按钮
- **Sidebar**: 分类导航，高亮当前章节
- **CodeBlock**: 带标题和复制功能的代码展示
- **FeatureCard**: 功能特性网格展示
- **Section**: 统一的章节容器

### 基于Hash路由
- 无需额外的路由库
- URL直接定位到具体章节
- 平滑滚动到目标位置

### 性能优化
- Shiki预初始化（`initHighlighter()`）
- 主题偏好本地存储
- 代码分割（页面级别）

## 📋 用户体验优化

1. **一目了然的导航**
   - 固定的顶部导航栏（不会滚动消失）
   - 侧边栏分类清晰（Getting Started / Components / Build Tools / API / Examples）
   - 当前激活的章节高亮显示

2. **快速定位**
   - 点击侧边栏直接跳转
   - URL Hash同步
   - 浏览器前进/后退支持

3. **代码示例**
   - 带语言标识的标题栏
   - 一键复制代码
   - 即时预览效果

4. **API文档**
   - 清晰的表格展示所有Props
   - 类型定义准确
   - 示例代码完整

## 🚀 开发命令

```bash
# 安装依赖
pnpm install

# 构建所有包（首次运行必须）
pnpm build

# 启动文档开发服务器
pnpm docs

# 访问地址
http://localhost:3100
```

## ✅ 对比之前的改进

### 之前的问题
- ❌ 单页面，内容混乱
- ❌ 炫酷动画影响阅读
- ❌ 没有清晰的导航结构
- ❌ 代码示例分散
- ❌ 缺少系统化的API文档

### 现在的优势
- ✅ 多页面架构，内容分类清晰
- ✅ 专业简洁的设计，专注内容
- ✅ 固定导航 + 侧边栏，快速定位
- ✅ 代码示例集中展示，带即时预览
- ✅ 完整的API表格文档
- ✅ 渐进式学习路径（Overview → Getting Started → API → Examples）

## 🎓 使用建议

### 新用户学习路径
1. **Overview** - 了解项目是什么，有什么特性
2. **Getting Started** - 快速安装和上手
3. **Examples** - 看示例学习使用方法
4. **API Reference** - 深入了解所有配置选项

### 文档维护
- 新增功能：在对应的页面添加Section
- 新增示例：在ExamplesPage添加新的示例块
- 更新API：修改APIPage的表格
- 调整样式：修改styles/index.css的CSS变量

## 📝 后续可优化项

1. 搜索功能（Ctrl+K快捷键）
2. 代码playground（在线编辑运行）
3. 多语言支持（中英文切换）
4. 更多主题选项
5. 文档版本切换

---

**设计哲学**: "让用户能够通过文档一看就知道怎么使用，怎么上手简单" ✨
