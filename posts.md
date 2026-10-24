---
title: 文章
permalink: /posts/
---

# 文章

<ul class="post-list">
{% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a><time>{{ post.date | date: "%Y-%m-%d" }}</time></li>
{% endfor %}
</ul>
