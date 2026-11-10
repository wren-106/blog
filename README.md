# blog

个人博客，Jekyll + GitHub Pages。

线上地址：`https://wren-106.github.io/blog/`

## 结构

```
├── _config.yml        站点配置（baseurl 必须为 /blog）
├── _posts/            文章，文件名格式 YYYY-MM-DD-slug.md
├── assets/images/     配图
├── index.md           首页
└── about.md           关于页
```

## 发一篇新文章

1. 在 `_posts/` 下新建 `YYYY-MM-DD-english-slug.md`
2. 文件开头写 front-matter：

```yaml
---
layout: post
title: "中文标题"
date: 2026-11-10 10:00:00 +0800
categories: 观察
tags: [标签1, 标签2]
description: "一句话摘要，用于 SEO 和首页卡片"
---
```

3. 正文用 Markdown，插图的写法是：

```markdown
![图注]({{ '/assets/images/posts/xxx/01.jpg' | relative_url }})
```

4. 提交推送：

```bash
git add .
git commit -m "post: 文章标题"
git push
```

GitHub Pages 会在 1–2 分钟内自动构建。

## 注意事项

- **文件名不要用中文**，`slug` 会直接进 URL
- **图片路径必须走 `relative_url`**，否则子目录部署会裂图
- `baseurl` 一旦改了，全站链接都会变，别乱动
- 构建失败时去仓库的 **Actions** 标签页看日志
