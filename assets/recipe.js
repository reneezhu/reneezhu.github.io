(function () {
  var dataEl = document.getElementById('recipe-data');
  if (!dataEl) return;
  var data = JSON.parse(dataEl.textContent);
  var ings = data.ingredients;
  var $ = function (id) { return document.getElementById(id); };
  var sum = function (arr, f) { return arr.reduce(function (s, x) { return s + f(x); }, 0); };

  var baseTotal = sum(ings, function (i) { return i.g; });
  var flourBase = sum(ings.filter(function (i) { return i.flour; }), function (i) { return i.g; });
  var state = { mult: 1, servings: data.servings, baseIdx: 0 };

  // 默认以第一种面粉为准
  ings.some(function (i, idx) { if (i.flour) { state.baseIdx = idx; return true; } });

  var storeKey = 'recipe-check:' + location.pathname;
  var checked = {};
  try { checked = JSON.parse(localStorage.getItem(storeKey)) || {}; } catch (e) {}
  function saveChecked() { try { localStorage.setItem(storeKey, JSON.stringify(checked)); } catch (e) {} }

  function fmtG(g) {
    if (g < 10) return (Math.round(g * 10) / 10).toString();
    return Math.round(g).toString();
  }
  function fmt(n, d) { return n.toFixed(d === undefined ? 0 : d); }

  // 选择"以…为准"的下拉
  var sel = $('r-base');
  ings.forEach(function (i, idx) {
    var o = document.createElement('option');
    o.value = idx; o.textContent = i.name;
    sel.appendChild(o);
  });
  sel.value = state.baseIdx;

  // 表格行
  var body = $('r-body');
  var rows = ings.map(function (i, idx) {
    var tr = document.createElement('tr');
    if (checked[i.key]) tr.className = 'done';
    tr.innerHTML =
      '<td class="chk"><input type="checkbox" aria-label="已备好 ' + i.name + '"' + (checked[i.key] ? ' checked' : '') + '></td>' +
      '<td>' + i.name + (i.missing ? ' <span class="warn" title="原料库里没有这个原料，热量按 0 计算">⚠︎</span>' : '') + '</td>' +
      '<td class="num g"></td><td class="num bp"></td><td class="num kcal"></td>' +
      '<td class="note">' + (i.note || '') + '</td>';
    tr.querySelector('input').addEventListener('change', function (e) {
      checked[i.key] = e.target.checked;
      tr.className = e.target.checked ? 'done' : '';
      saveChecked();
    });
    body.appendChild(tr);
    return tr;
  });

  function render(src) {
    var m = state.mult;
    var tot = { g: 0, kcal: 0, protein: 0, fat: 0, carbs: 0, water: 0 };
    ings.forEach(function (i, idx) {
      var g = i.g * m;
      var k = g * i.kcal / 100;
      tot.g += g; tot.kcal += k;
      tot.protein += g * i.protein / 100;
      tot.fat += g * i.fat / 100;
      tot.carbs += g * i.carbs / 100;
      if (!i.flour) tot.water += g * i.water / 100; // 含水率按惯例不计面粉自身水分
      var r = rows[idx];
      r.querySelector('.g').textContent = fmtG(g) + ' g';
      r.querySelector('.bp').textContent = flourBase ? fmt(i.g / flourBase * 100, 1) + '%' : '–';
      r.querySelector('.kcal').textContent = fmt(k) + ' kcal';
    });
    $('r-sum-g').textContent = fmt(tot.g) + ' g';
    $('r-sum-kcal').textContent = fmt(tot.kcal) + ' kcal';
    $('r-hydration').textContent = flourBase ? '实际含水率 ' + fmt(tot.water / (flourBase * m) * 100) + '%' : '';

    if (src !== 'mult') $('r-mult').value = +m.toFixed(3);
    if (src !== 'total') $('r-total').value = Math.round(baseTotal * m);
    if (src !== 'base') $('r-base-g').value = fmtG(ings[state.baseIdx].g * m);
    if (src !== 'servings') $('r-servings').value = state.servings;

    var n = Math.max(1, state.servings);
    var per = function (v) { return v / n; };
    var u = data.unit;
    $('r-stats').innerHTML =
      tile('每' + u + '热量', fmt(per(tot.kcal)), 'kcal', true) +
      tile('蛋白质', fmt(per(tot.protein), 1), 'g / ' + u) +
      tile('脂肪', fmt(per(tot.fat), 1), 'g / ' + u) +
      tile('碳水', fmt(per(tot.carbs), 1), 'g / ' + u) +
      tile('总热量', fmt(tot.kcal), 'kcal');
  }
  function tile(label, value, unit, primary) {
    return '<div class="stat' + (primary ? ' primary' : '') + '"><div class="stat-label">' + label +
      '</div><div class="stat-value">' + value + '<span class="stat-unit">' + unit + '</span></div></div>';
  }

  function num(id) { var v = parseFloat($(id).value); return isFinite(v) && v > 0 ? v : null; }

  $('r-mult').addEventListener('input', function () { var v = num('r-mult'); if (v) { state.mult = v; render('mult'); } });
  $('r-total').addEventListener('input', function () { var v = num('r-total'); if (v) { state.mult = v / baseTotal; render('total'); } });
  $('r-base-g').addEventListener('input', function () { var v = num('r-base-g'); if (v) { state.mult = v / ings[state.baseIdx].g; render('base'); } });
  sel.addEventListener('change', function () { state.baseIdx = +sel.value; render(); });
  $('r-servings').addEventListener('input', function () { var v = num('r-servings'); if (v) { state.servings = Math.round(v); render('servings'); } });
  $('r-bp').addEventListener('change', function (e) { $('r-table').classList.toggle('show-bp', e.target.checked); });
  $('r-reset').addEventListener('click', function () {
    state.mult = 1; state.servings = data.servings; checked = {}; saveChecked();
    rows.forEach(function (r) { r.className = ''; r.querySelector('input').checked = false; });
    render();
  });

  render();
})();
