
# CLAUDE.md

## 核心铁律
1. **内层 shadcn，外层 Aceternity** — 永远 `<Aceternity><shadcn /></Aceternity>`，反过来不行。
2. **页面文件不混用 ui 和 aceternity** — 复用抽到 `common/`，页面块放 `blocks/`。
3. **表单必须 `react-hook-form` + `zod`** — Input/Select 必须关联 Label。
4. **只用 Tailwind 原子类** — 不写自定义 CSS，不用内联 `style`（动画参数除外）。
5. **禁止修改 `ui/` 源码，禁止 `any`**。
6. **动效必须支持 `prefers-reduced-motion`**。

## 技术栈
 - React 18 + Vite + Tailwind CSS 3 + TypeScript（严格模式） 
 - 表单：react-hook-form + zod 
 - 路由：react-router-dom v6 
 - 数据：TanStack Query

## 目录结构
src/components/ 
├── ui/        # shadcn/ui 组件，只读，通过 CLI 生成 
├── aceternity/   # Aceternity UI 动效组件，可按需微调
├── common/       # 原子级封装（按钮、标题、反馈等） 
│   ├── buttons/ 
│   ├── typography/ 
│   └── feedback/ 
└── blocks/       # 页面级业务块（Hero、FeatureGrid 等）

- `ui/` 中文件由 `npx shadcn-ui@latest add` 生成，**严禁手动修改**。
- `aceternity/` 中文件通过 CLI 或手动复制添加，**允许微调动画参数和外观**。
- `common/` 由开发者维护，是对 `ui` 与 `aceternity` 的组合封装。
- `blocks/` 由开发者维护，是对 `common` 及原语的业务编排。

## 前端开发遵循原则

### 1. 交互逻辑永远交给 shadcn/ui
 - 任何可操作的 UI（按钮、输入框、下拉菜单、对话框等）必须从 `@/components/ui/` 引入。
 - 禁止在动画组件或自定义 `<div>` 上自行实现弹窗、菜单等交互行为。

### 2. 视觉增强用 Aceternity UI 包裹
 - 不需要修改 shadcn 组件本身，而是用 Aceternity 组件作为外层装饰容器。
 - 标准结构：  
  ```jsx
  <AceternityComponent>
    <shadcnComponent />
  </AceternityComponent>

### 3. 项目级复用必须抽到 common/
 - 当某个 ui + aceternity 组合在项目中出现 ≥2 次，必须封装到 common/ 目录，暴露简洁的 Props。 
 - 页面文件只能从 common/ 或 blocks/ 中导入，不得直接在页面中混合调用 ui 和 aceternity（除非是一次性布局且无复用可能）。

### 4. 页面块放在 blocks/
 - 大型业务区域（Hero、Feature Grid 等）即使不立即复用，也建议放在 blocks/ 中，保持页面文件简洁。 

 - 这些块仍应遵守“内层 shadcn，外层 Aceternity”的组合原则。

### 5. 样式统一通过 Tailwind 类传递 
 - 所有颜色、间距、响应式变化均使用 Tailwind 原子类，在调用组件的父级传入 className。 
 - 禁止在组件外部编写自定义 CSS 文件来覆盖组件内部样式。
 
### 6.可访问性不可破坏 
 - shadcn 组件的键盘导航、焦点管理、ARIA 属性必须保持完整。  
 - Aceternity 包裹层不能改变 DOM 顺序或阻止焦点进入操作区域。

## 禁止事项
 - 禁止修改 src/components/ui/ 下的任何源码。 
 - 禁止在 aceternity 组件中绑定 onClick、表单提交等业务逻辑。
 - 禁止在 shadcn 组件上直接添加动画类、CSS 关键帧或 framer-motion 的 motion 对象。 
 - 禁止将对话框、菜单等覆盖型组件的触发与动画组件耦合，破坏焦点管理。 
 - 禁止在页面文件中混合引入 ui 和 aceternity 并直接组合，必须经过 common 封装（除非一次性使用）。

## 提交规范
 - 格式：feat: / fix: / refactor: / style: / docs: / chore: 
 - 提交前必须通过 ESLint + TypeScript 检查。

