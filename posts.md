---
title: Posts
title_zh: 随笔
permalink: /posts/
---

# {% include t.html en="Posts" zh="随笔" %}

<ul class="post-list">
{% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{% include t.html en=post.title zh=post.title_zh %}</a><time>{{ post.date | date: "%Y-%m-%d" }}</time></li>
{% endfor %}
</ul>
