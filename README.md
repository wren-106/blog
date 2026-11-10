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

## 配图放置说明

把图片放进 `assets/images/posts/<文章短名>/`，**文件名要与文章里的引用完全一致**。

《信息差与中间商》一文用的是 `assets/images/posts/info-gap/`：

| 文件名 | 内容 | 对应图注主题 |
|---|---|---|
| `01-network.jpg` | 抽象网络 / 中介节点 | 中间层没有消失，只是不断重组 |
| `02-interpreter.jpg` | 同声传译隔音间 | 责任仍留在人这一侧 |
| `03-court.jpg` | 法院卷宗 / 法槌 | 执业资格变成可验证的签名凭证 |
| `04-shelf.jpg` | 商品标签 / 货架 | 为「可信」这件事定价 |
| `05-port.jpg` | 集装箱港口俯瞰 | 剩下能收费的是那条路 |

规格：宽度 **1200px**、JPEG 质量 **80**、单张 **100–200KB**。
压缩工具：Squoosh（squoosh.app）或 TinyPNG（tinypng.com）。

**命名纪律**：纯英文、小写、连字符。不要用中文文件名——URL 编码后容易出错，部分 CDN 会直接 404。

## 注意事项

- **文件名不要用中文**，`slug` 会直接进 URL
- **图片路径必须走 `relative_url`**，否则子目录部署会裂图
- `baseurl` 一旦改了，全站链接都会变，别乱动
- 构建失败时去仓库的 **Actions** 标签页看日志
- **不要在 `assets/` 里放 `.md` 文件**。GitHub Pages 会把目录下的 README 当成页面渲染，还会跑进顶部导航栏
