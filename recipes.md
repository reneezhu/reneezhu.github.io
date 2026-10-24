---
title: Recipes
title_zh: 食谱
permalink: /recipes/
---

# {% include t.html en="Recipes" zh="食谱" %}

<p>{% include t.html en="Baking recipes. Every recipe page lets you rescale the batch, and calories and macros update automatically." zh="烘焙方子。每个食谱页面都可以调整份量，热量和营养素会自动重新计算。" %}</p>

{% assign db = site.data.ingredients %}
<ul class="post-list">
{% for r in site.recipes %}
  {%- assign kcal = 0.0 -%}
  {%- for ing in r.ingredients -%}
    {%- assign d = db[ing.item] -%}
    {%- if d -%}{%- assign k = ing.g | times: d.kcal | divided_by: 100.0 -%}{%- assign kcal = kcal | plus: k -%}{%- endif -%}
  {%- endfor -%}
  {%- assign per = kcal | divided_by: r.servings | round -%}
  <li><a href="{{ r.url | relative_url }}">{% include t.html en=r.title zh=r.title_zh %}</a><time><span lang="en">~{{ per }} kcal / {{ r.unit_en | default: "serving" }}</span><span lang="zh">约 {{ per }} kcal / {{ r.unit | default: "份" }}</span></time></li>
{% endfor %}
</ul>
