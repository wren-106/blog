# 图片放置说明

把 5 张配图放在这个目录下，**文件名必须完全一致**：

| 文件名 | 内容 | 用在哪篇 |
|---|---|---|
| `01-network.jpg` | 抽象网络 / 中介节点 | 信息差与中间商 |
| `02-interpreter.jpg` | 同声传译隔音间 | 信息差与中间商 |
| `03-court.jpg` | 法院卷宗 / 法槌 | 信息差与中间商 |
| `04-shelf.jpg` | 商品标签 / 货架 | 信息差与中间商 |
| `05-port.jpg` | 集装箱港口俯瞰 | 信息差与中间商 |

## 规格要求

- 宽度 **1200px**
- JPEG 质量 **80**
- 单张 **100–200KB**（合计 < 1MB）

压缩工具：Squoosh（squoosh.app）或 TinyPNG（tinypng.com）

## 引用方式

文章里已写成：

```markdown
![图注]({{ '/assets/images/posts/info-gap/01-network.jpg' | relative_url }})
```

`relative_url` 会自动补上 `baseurl: /blog`，最终输出：
`/blog/assets/images/posts/info-gap/01-network.jpg`

**不要改成以 `/` 开头的绝对路径**，否则部署到子目录时会全部裂图。

## 命名纪律

纯英文、小写、连字符。不要用中文文件名——URL 编码后容易出问题，部分 CDN 会直接 404。
