# 怎样把一篇长文做成可视化攻略？ {#longform-guide}

**先定结论，再让 Archify 出图，最后只用 CSS 换肤**：大约 40 分钟，就能得到一页能点、能导出长图的攻略。

- 读者先看结论，再按需展开流程图和步骤。
- 流程、时长和清单都由 Archify 原生渲染，可以缩放和联动高亮。
- 换肤只改颜色、字体和阴影，不碰交互脚本。
- 交付前用浏览器验收导出菜单，坏了就回退原件。

@answer scope="演示稿：以一篇约 5000 字的教程为例；各环节时长为估算"
@meta locale=zh-CN style=editorial
@source archify title="Archify：可交互图表与一页解释页" url=https://github.com/tt-a1i/archify
@source dd title="diagram-design：编辑风格图表设计规范" url=https://github.com/cathrynlavery/diagram-design

## 从长文到一页攻略，要走哪几步？ {#overview}

@workflow id=guide-flow title="长文变攻略总流程"
| lane plan | 规划 |
| lane build | 生成 |
| lane ship | 交付 |
| read | 通读长文 | frontend | plan |
| verdict | 定一句结论 | backend | plan |
| draft | 写 Archify 草稿 | backend | build |
| finalize | 校验并生成 | backend | build |
| skin | CSS 换肤 | backend | build |
| check | 导出可用? | security | ship |
| rollback | 回退原件 | backend | ship |
| deliver | 交付 HTML | external | ship |
| read > verdict | |
| verdict > draft | |
| draft > finalize | |
| finalize > skin | |
| skin > check | |
| check > deliver | 是 | emphasis |
| check > rollback | 否 |
| rollback > skin | 保守重试 |

@steps id=guide-steps
| s1 | 通读长文 | 标出步骤、分支、等待时长和必须核对的事项。截图每个阶段最多留 2 张。 | guide-flow | read |
| s2 | 定一句结论 | 用一句话回答读者最关心的问题，再配不超过 4 条理由。 | guide-flow | verdict |
| s3 | 写 Archify 草稿 | 把流程写成 `@workflow`，时长写成 `@timeline`，分步写成 `@steps`。 | guide-flow | draft |
| s4 | 校验并生成 | 运行 `finalize explainer`。失败时只按诊断提示改草稿，最多两轮。 | guide-flow | finalize |
| s5 | CSS 换肤 | 在 `</head>` 前插入 `dd-skin` 样式：珊瑚强调色、纸色底、无阴影。 | guide-flow | skin |
| s6 | 导出可用? | 用无头浏览器打开页面，确认导出菜单仍有 PNG、WebP、JPG 三项。 | guide-flow | check |
| s7 | 回退原件 | 交互或导出坏了，就回到 finalize 原件，只保留变量覆盖再试。 | guide-flow | rollback |
| s8 | 交付 HTML | 交付单个 HTML 文件，离线也能打开。 | guide-flow | deliver |

## 每个环节大概花多久？ {#timing}

@timeline id=guide-timeline title="一次典型制作的时间线（估算）"
| lane plan | 规划 |
| lane build | 生成 |
| lane ship | 交付 |
| t-read | 2026-11-07T09:00:00+00:00 | 开始通读长文 | plan | default |
| t-verdict | 2026-11-07T09:10:00+00:00 | 结论定稿 | plan | action |
| t-draft | 2026-11-07T09:15:00+00:00 | 开始写草稿 | build | change |
| t-final | 2026-11-07T09:30:00+00:00 | finalize 通过 | build | recovery |
| t-skin | 2026-11-07T09:32:00+00:00 | 换肤完成 | build | change |
| t-check | 2026-11-07T09:35:00+00:00 | 导出验收 | ship | alert |
| t-ship | 2026-11-07T09:40:00+00:00 | 交付 HTML | ship | recovery |

@callout level=note title="时长是估算"
时间线按一篇约 5000 字的教程估算，实际取决于原文长度和截图数量。
写草稿通常最花时间，约占总时长的 40%。

## 换肤改了什么，没改什么？ {#skin}

| 项目 | Archify 默认 | 换肤后 |
| --- | --- | --- |
| 强调色 | 蓝色 | 珊瑚 `#bf4520` {good:克制使用} |
| 底色与正文 | 默认配色 | 纸色 `#f5f5f5`，墨色 `#2d3142` |
| 阴影 | 有轻阴影 | 全部去掉 {good:更干净} |
| 圆角 | 默认圆角 | 不超过 8px |
| 交互与导出 | 完整 | 完整保留 {good:硬约束} |
| 内联脚本 | 原样 | 不改一行 {caution:禁止改写} |

@callout level=warning title="硬规则"
换肤只能新增一段 `<style id="dd-skin">`。
不要删改 Archify 的内联脚本，也不要往结论区塞静态主图。

## 交付前要核对什么？ {#checklist}

- [ ] 打开页面，第一眼看到结论
- [ ] 点击流程图节点，右侧步骤联动高亮
- [ ] 切换深浅色，配色正常
- [ ] 导出菜单仍有 PNG、WebP、JPG 三项
- [ ] 任选一种格式，能下载长图
- [ ] 浅色主题以珊瑚为强调色，没有大阴影
- [ ] 单个 HTML 文件，离线也能打开
