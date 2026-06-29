# CLAUDE.md

## 核心铁律
1. **内层 shadcn，外层 Aceternity** — 永远 `<Aceternity><shadcn /></Aceternity>`，反过来不行。
2. **页面文件不混用 ui 和 aceternity** — 复用抽到 `common/`，页面块放 `blocks/`。
3. **表单必须 `react-hook-form` + `zod`** — Input/Select 必须关联 Label。
4. **只用 Tailwind 原子类** — 不写自定义 CSS，不用内联 `style`（动画参数除外）。
5. **禁止修改 `ui/` 源码，禁止 `any`**。
6. **动效必须支持 `prefers-reduced-motion`**。

## 技术栈
 - React 19 + Vite 8 + Tailwind CSS 3 + TypeScript 6（严格模式）
 - UI 基础：shadcn（`@shadcn/react`）+ Radix（`@base-ui/react`）
 - 动效：framer-motion
 - 图标：lucide-react + @tabler/icons-react
 - 代码检查：oxlint（取代 ESLint）

## 目录结构

```
src/components/
├── ui/          # 基础 shadcn 组件（按钮、输入框、对话框等）
├── aceternity/  # 带动画的 Aceternity UI 组件（3D、粒子、光效等）
├── common/      # 可复用原子组件（ui + aceternity 的组合封装）
│   ├── buttons/
│   ├── typography/
│   └── feedback/
└── blocks/      # 页面级业务块（dashboard、sidebar、login、signup 等模块）
```

### 优先级与引用规则（从高到低）

```
common/ (最高)  →  可引用 blocks/、aceternity/、ui/
blocks/         →  可引用 common/、aceternity/、ui/
aceternity/     →  可引用 ui/（仅 utils/cn），不可引用 common/、blocks/
ui/ (最低)      →  不可引用任何项目组件（仅 npm 包 + lib/utils）
```

- **common/ 优先** — 项目中有 2 处以上相同的 ui + aceternity 组合，必须先抽到 common/
- **blocks/ 封装页面** — 大型业务区域（dashboard 面板、登录注册、侧边栏等）放 blocks/
- **页面文件禁止混用** — 只能从 common/ 或 blocks/ 导入，不得直接混合 ui/ + aceternity/（一次性布局除外）

## 前端开发遵循原则

### 1. 交互逻辑永远交给 shadcn/ui
 - 任何可操作的 UI（按钮、输入框、下拉菜单、对话框等）必须从 `@/components/ui/` 引入。
 - 禁止在动画组件或自定义 `<div>` 上自行实现弹窗、菜单等交互行为。

### 2. 视觉增强用 Aceternity UI 包裹
 - 不需要修改 shadcn 组件本身，而是用 Aceternity 组件作为外层装饰容器。
 - 标准结构：  

### 3. 项目级复用必须抽到 common/
 - 当某个 ui + aceternity 组合在项目中出现 ≥2 次，必须封装到 common/ 目录，暴露简洁的 Props。 
 - 页面文件只能从 common/ 或 blocks/ 中导入，不得直接在页面中混合调用 ui 和 aceternity（除非是一次性布局且无复用可能）。

### 4. 页面块放在 blocks/
 - 大型业务区域（Hero、Feature Grid 等）即使不立即复用，也建议放在 blocks/ 中，保持页面文件简洁。 

 - 这些块仍应遵守“内层 shadcn，外层 Aceternity”的组合原则。

### 5. 样式统一通过 Tailwind 类传递 
 - 所有颜色、间距、响应式变化均使用 Tailwind 原子类，在调用组件的父级传入 className。 
 - 禁止在组件外部编写自定义 CSS 文件来覆盖组件内部样式。
 
### 6. 可访问性不可破坏 
 - shadcn 组件的键盘导航、焦点管理、ARIA 属性必须保持完整。  
 - Aceternity 包裹层不能改变 DOM 顺序或阻止焦点进入操作区域。

### 7. Tailwind CSS 3 配置
 - 配置在 `tailwind.config.js`，主题变量通过 `@layer base` 中的 CSS 变量定义。
 - PostCSS 自动注入，无需额外 Vite 插件。

## 禁止事项
 - 禁止修改 src/components/ui/ 下的任何源码。 
 - 禁止在 aceternity 组件中绑定 onClick、表单提交等业务逻辑。
 - 禁止在 shadcn 组件上直接添加动画类、CSS 关键帧或 framer-motion 的 motion 对象。 
 - 禁止将对话框、菜单等覆盖型组件的触发与动画组件耦合，破坏焦点管理。 
 - 禁止在页面文件中混合引入 ui 和 aceternity 并直接组合，必须经过 common 封装（除非一次性使用）。

## 提交规范
 - 格式：feat: / fix: / refactor: / style: / docs: / chore: 
 - 提交前必须通过 oxlint + TypeScript 检查。

