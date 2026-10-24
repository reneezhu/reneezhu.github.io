---
title: Home
title_zh: 首页
---

<div lang="en" markdown="1">

# Hi, I'm Renee 👋

A short intro goes here — what you work on and what you're into.

</div>
<div lang="zh" markdown="1">

# 你好，我是 Renee 👋

这里写一两句自我介绍，比如你在做什么、关注什么。

</div>

## {% include t.html en="Recent posts" zh="最近随笔" %}

<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li><a href="{{ post.url | relative_url }}">{% include t.html en=post.title zh=post.title_zh %}</a><time>{{ post.date | date: "%Y-%m-%d" }}</time></li>
{% endfor %}
</ul>

<p><a href="{{ '/posts/' | relative_url }}">{% include t.html en="All posts →" zh="全部随笔 →" %}</a></p>

## {% include t.html en="Recipes" zh="食谱" %}

<ul class="post-list">
{% for r in site.recipes limit:5 %}
  <li><a href="{{ r.url | relative_url }}">{% include t.html en=r.title zh=r.title_zh %}</a><time>{% include t.html en=r.pan_en zh=r.pan %}</time></li>
{% endfor %}
</ul>

<p><a href="{{ '/recipes/' | relative_url }}">{% include t.html en="All recipes →" zh="全部食谱 →" %}</a></p>
