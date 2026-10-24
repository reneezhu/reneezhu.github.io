# 个人网站

用 GitHub Pages 和 Jekyll 搭的静态网站，样式是 GitHub 风格，dark/light 默认跟随系统，也可以手动切换。

线上地址：https://reneezhu.com

## 日常写作

- 新文章：在 `_posts/` 下新建 `YYYY-MM-DD-标题.md`，开头写：
  ```yaml
  ---
  title: 标题
  tags: [标签]
  ---
  ```
- 新页面：在根目录新建 `xxx.md`，用 `permalink: /xxx/` 指定网址，再把它加进 `_config.yml` 的 `nav`。
- 也可以直接放 `.html` 文件，会原样发布。
- 改完 push 到 `main`（或在 GitHub 网页上直接编辑），一两分钟后自动上线。

## 本地预览（可选）

```bash
gem install bundler jekyll
jekyll serve   # 打开 http://localhost:4000
```
