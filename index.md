---
title: 首页
---

# 你好，我是 Renee 👋

这里写一两句自我介绍，比如你在做什么、关注什么。

## 最近文章

<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a><time>{{ post.date | date: "%Y-%m-%d" }}</time></li>
{% endfor %}
</ul>

[查看全部 →](/posts/)
