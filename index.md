---
title: 首页
---

# 你好，我是 Renee 👋

这里写一两句自我介绍，比如你在做什么、关注什么。

## 最近随笔

<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a><time>{{ post.date | date: "%Y-%m-%d" }}</time></li>
{% endfor %}
</ul>

[全部随笔 →](/posts/)

## 食谱

<ul class="post-list">
{% for r in site.recipes limit:5 %}
  <li><a href="{{ r.url | relative_url }}">{{ r.title }}</a><time>{{ r.pan }}</time></li>
{% endfor %}
</ul>

[全部食谱 →](/recipes/)
