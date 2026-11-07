# 示例：怎样把一篇长文做成可视化攻略？

| 文件 | 说明 |
| --- | --- |
| `candidate.archify.md` | Archify 草稿（内容唯一来源） |
| `longform-guide.archify-original.html` | `archify finalize explainer` 的原件 |
| `longform-guide.html` | 用 `scripts/apply-skin.mjs` 换肤后的最终页面 |

## 重新生成

```bash
ARCHIFY=~/.agents/skills/archify   # 改成你的 Archify 实际路径
node "$ARCHIFY/bin/archify.mjs" finalize explainer candidate.archify.md longform-guide.archify-original.html --json
node ../../scripts/apply-skin.mjs longform-guide.archify-original.html longform-guide.html
```

下载 HTML 后用浏览器打开即可。GitHub 网页只会显示源码。

> HTML 文件内嵌了 [Archify](https://github.com/tt-a1i/archify) 运行时（Apache-2.0）。示例的文字内容为本仓库原创，使用 MIT 许可证。
