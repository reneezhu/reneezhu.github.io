---
title: 食谱
permalink: /recipes/
---

# 食谱

烘焙方子。每个食谱页面都可以调整份量，热量和营养素会自动重新计算。

{% assign db = site.data.ingredients %}
<ul class="post-list">
{% for r in site.recipes %}
  {%- assign kcal = 0.0 -%}
  {%- for ing in r.ingredients -%}
    {%- assign d = db[ing.item] -%}
    {%- if d -%}{%- assign k = ing.g | times: d.kcal | divided_by: 100.0 -%}{%- assign kcal = kcal | plus: k -%}{%- endif -%}
  {%- endfor -%}
  {%- assign per = kcal | divided_by: r.servings | round -%}
  <li><a href="{{ r.url | relative_url }}">{{ r.title }}</a><time>约 {{ per }} kcal / {{ r.unit | default: "份" }}</time></li>
{% endfor %}
</ul>
