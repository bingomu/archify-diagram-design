# Changelog

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-07

### 新增 / Added

- `SKILL.md`：五步工作流（定结论 → Archify 起草 → finalize → CSS 换肤 → 验收导出与交互）、硬约束和验收清单。
- `assets/dd-skin.css`：diagram-design 风格皮肤，只改 CSS 变量与少量安全规则（珊瑚 `#bf4520`、纸色、墨色、无阴影、圆角不超过 8px、中文字体栈）。
- `scripts/apply-skin.mjs`：把皮肤插入 Archify HTML 的脚本；可重复执行，拒绝覆盖原件。
- `examples/longform-guide/`：完整示例（草稿、Archify 原件、换肤后页面）。
- 中英双语 README，配真实截图、流程图和常见问题。

### 修复 / Fixed

- 皮肤的浅色变量不再写在 `:root` 上，深色主题不会再被强制成浅色底。The light-theme variables no longer sit on `:root`, so dark mode keeps its dark background.

### 变更 / Changed

- Archify 路径改为自动查找（`~/.agents/skills`、`~/.codex/skills`、`~/.claude/skills`、`~/.cursor/skills`），不再写死一个位置。
