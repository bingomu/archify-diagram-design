# archify-diagram-design · 攻略可视化（Archify × diagram-design）

把长文、攻略、教程做成**一页可分享的单文件 HTML**：

- **Archify** 负责页面骨架和交互：结论先行、可点的流程图 / 时间线 / 分步、深浅色切换，以及 **PNG / WebP / JPG 长图导出**。
- **diagram-design** 只负责换肤：珊瑚色强调 `#bf4520`、无阴影、纸色底、中文友好字体。
- 硬规则：**换肤绝不能破坏交互和导出**。

## 依赖

这个技能是把两个现有技能组合起来用的，使用前需要先装好：

- Archify（技能需位于 `~/.agents/skills/archify/`，提供 `bin/archify.mjs` CLI）
- diagram-design（只借用它的视觉规范）
- Node.js，以及一个无头浏览器用于交付前验收

## 安装

把本仓库放进你的 agent 技能目录，例如：

```bash
git clone https://github.com/bingomu/archify-diagram-design ~/.agents/skills/archify-diagram-design
# Codex: ~/.codex/skills/  ·  Claude Code: ~/.claude/skills/
```

然后让 agent「把这篇文章做成一页可视化攻略」即可触发。

## 内容

- `SKILL.md`：完整工作流（定结论 → Archify 起草 → CSS 换肤 → 验收导出与交互 → 交付）和验收清单。

## License

MIT
