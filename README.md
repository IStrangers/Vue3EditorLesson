

# Vue3EditorLesson

一个基于 Vue 3 + Vite 构建的可视化编辑器组件库，提供丰富的编辑功能和交互组件。

## 软件架构

该项目采用组件化设计，主要包含以下核心模块：

### 核心组件
- **editor** - 核心编辑器组件，包含拖拽、焦点管理、命令模式等核心功能
- **editor-block** - 编辑器中的块级元素组件
- **editor-operator** - 编辑器操作栏，提供组件属性配置
- **editor-table** - 表格编辑组件

### 交互组件
- **block-resize** - 组件尺寸调整功能
- **dialog** - 通用对话框组件
- **dropdown** - 下拉菜单组件
- **range** - 范围选择组件
- **table-dialog** - 表格专用对话框

### 配置系统
- **editor-config** - 编辑器配置工厂，包含字体、按钮、颜色等属性配置
- **data.json** - 编辑器数据配置

## 安装说明

```bash
# 使用pnpm安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 使用指南

### 引入编辑器组件

```javascript
import Editor from '@/components/editor'
import { createEditorConfig } from '@/config/editor-config'

// 初始化编辑器配置
const editorConfig = createEditorConfig()

// 使用编辑器
<Editor :config="editorConfig" />
```

### 配置属性

编辑器支持通过配置文件自定义组件属性：

```javascript
import { createInputProp, createColorProp, createSelectProp } from '@/config/editor-config'

// 创建输入属性
const inputProp = createInputProp('标题', 'text')

// 创建颜色属性
const colorProp = createColorProp('背景色', '#ffffff')

// 创建选择属性
const selectProp = createSelectProp('对齐方式', ['left', 'center', 'right'])
```

## 功能特性

- **拖拽功能** - 支持组件拖拽排序和放置
- **尺寸调整** - 自由调整组件大小
- **焦点管理** - 精准的组件选中和高亮
- **命令模式** - 支持撤销/重做操作
- **表格编辑** - 完整的表格编辑功能
- **丰富组件** - 提供多种基础编辑组件

## 技术栈

- Vue 3
- Vite
- SCSS

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## Gitee 特色

- 完整的代码托管服务
- 便捷的 Pull Request 功能
- 多人协作支持
- 代码审查机制

---

基于 Vue 3 和 Vite 构建的现代化编辑器组件库，适合快速开发可视化编辑场景。