---
name: archify-diagram-design
description: >-
  给攻略/教程做成一页可分享 HTML：Archify 管结论先行、可点流程图/时间线、以及 PNG/WebP/JPG 长图导出；diagram-design
  只负责珊瑚配色与无阴影换肤。交互与导出绝不能被换肤破坏。Use when turning a guide or tutorial into a single interactive, exportable HTML page.
---
# 攻略可视化（Archify × diagram-design）

融合两套工具的默认用法：用 **Archify explainer** 做页面骨架、交互与导出；用 **diagram-design** 只做视觉换肤（珊瑚焦点、无阴影、纸色墨色）。输出永远是**单个自包含 HTML**。

## 何时用

- 用户要「攻略 / 教程 / 流程化可视化 / 做成一页」
- 内容有步骤、分支、等待时长、清单或原文截图
- 既要好看，又要能点节点、切主题、**导出长图**

**不要用**于：纯代码架构深挖（单独用 Archify native）、只要一张静图海报且不要交互（单独用 diagram-design）、仪表盘。

## 硬约束（比美观优先）

1. **导出必须完整可用**：Archify explainer 顶栏「导出」的三种长图 —— **PNG（最清晰）/ WebP（体积最小）/ JPG（兼容最好）** —— 换肤后仍能点开并下载；失败时回退「打印 / PDF」也不要被脚本弄坏。
2. **交互必须完整可用**：`@workflow` / `@timeline` / `@steps` 联动高亮、深浅色与样式切换、图内缩放/搜索/路径探索，换肤后全部保留。
3. **禁止破坏运行时**：不删、不改写 Archify 内联脚本；不改 `data-archify-artifact`；不往结论区或图面板里塞会挡导出/截图的静态「第二套主图」。
4. **视觉只走 CSS**：diagram-design 贡献仅限 `<style id="dd-skin">` 覆盖变量与少量规则（无阴影、圆角、字体、accent）。

## 两套各自保留什么

| 来源 | 保留 | 丢弃 / 克制 |
|---|---|---|
| **Archify** | explainer 结论先行；`@workflow`/`@timeline`/`@steps`；`finalize`；深浅色与样式切换；来源脚注；行动清单；**导出 PNG/WebP/JPG**；图内交互探索 | 默认蓝强调色主导整页视觉；为塞内容破坏导出 |
| **diagram-design** | 删减哲学；无阴影；圆角 ≤10px；coral `#bf4520` 克制使用；纸色/墨色；中文友好字体栈 | 手绘 SVG 覆盖 Archify 原生图；暗色青紫光晕；满屏 coral |

## 工作流（必须按序）

### 1. 定结论与面板

一句话结论 + 最多 4 条理由。面板 3–5 块：总览流程（分支）、分步详解、等待时间（实测 vs 估算）、配套子流程、提示词+清单+必要截图。

### 2. 用 Archify 起草 `candidate.archify.md`

- 读 `~/.agents/skills/archify/references/explainer-authoring.md`
- `@meta locale=` 跟用户语言；`style=editorial`
- 主流程用 `@workflow`（决策节点标签以 `?` 结尾）；时长用 `@timeline`，估算写入 `@answer scope=` 与 callout
- `@steps` 绑定图上节点；提示词放原文，笔误用 callout 注明
- 工作目录：`.archify/explainer-<slug>-<YYYYMMDD-HHMMSS>/`
- CLI：`node ~/.agents/skills/archify/bin/archify.mjs finalize explainer <draft.md> <out.html> --json`

### 3. 换肤（唯一的 diagram-design 步骤）

finalize 通过后，在 `</head>` 前插入一段确定性 CSS（浅色必做；深色只调对应变量）：

- `--accent` → `#bf4520`（及 soft/ink 衍生）
- `--paper` → `#f5f5f5`；`--ink` → `#2d3142`；`--muted` → `#4f5d75`
- 所有 `box-shadow` → `none`；面板用 `1px` 边框 + `≤8px` 圆角
- 正文字体：`"Geist","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif`；标题可衬线
- 强调箭头可用 accent；**不要**注入手绘 SVG 进结论区或替换 `@workflow`/`@timeline` 渲染结果

若上一版曾注入静态主图，本版**删掉**，让 Archify 原生图承担总览（才能被导出与探索菜单正确处理）。

### 4. 验收导出与交互（交付前必做）

用无头浏览器打开换肤后 HTML，至少确认：

- [ ] 顶栏「导出」菜单仍有 PNG / WebP / JPG 三项
- [ ] 任选一种格式能触发下载（或明确落入「打印/PDF」回退，但菜单本身不能挂）
- [ ] 点开流程/时间线图仍可缩放、联动 steps、切深浅色
- [ ] 浅色主题呈 coral 前向，不是默认蓝科技风；无大阴影

### 5. 截图与附件

- 原文关键截图：每主流程阶段最多 1–2 张，用 `@image`
- 交付：聊天附件发最终 HTML（优先英文文件名，如 `wx-minigame-guide-fused.html`）；再 `CopyFromBox` 到用户本机允许根目录（Downloads 常被拒时落到家目录）
- 不写社群引流、加微信、卖课

## 验收清单

- [ ] 打开即见结论
- [ ] Archify 交互图仍可点、可探索
- [ ] **导出三种长图格式仍可用**
- [ ] 视觉 coral 克制、无阴影
- [ ] 估算与原文笔误有标注
- [ ] 单文件可离线打开

## 失败时

- finalize 失败：只按 diagnostics 的 supportedFixes 改草稿，最多两轮
- 换肤后导出或交互坏了：**立刻回退到 finalize 原件**，只保留更保守的 `:root` 变量覆盖重试；不要靠塞静态图「补」
- 不要同时维护两份互相矛盾的正文；以 `candidate.archify.md` 为唯一内容源
