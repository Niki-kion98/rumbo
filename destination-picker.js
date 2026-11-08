'use strict';
(() => {
 const sort = (a, b) => a[1].name.localeCompare(b[1].name, 'ru', {sensitivity: 'base'});
 function mount({profiles, selected, label = 'Моё направление', onChange}) {
  const root = document.createElement('div'); root.className = 'destination-picker';
  const countries = Object.entries(profiles).filter(([, p]) => !p.domestic);
  const cities = Object.entries(profiles).filter(([, p]) => p.domestic).sort(sort);
  const domestic = profiles[selected]?.domestic;
  let city = domestic ? selected : '';
  if (!city) try { const saved = localStorage.getItem('rumbo-last-russian-city'); if (profiles[saved]?.domestic) city = saved; } catch {}
  if (!city) city = profiles.moscow?.domestic ? 'moscow' : cities[0]?.[0];
  function field(text) {
   const wrap = document.createElement('label'); wrap.className = 'living-field'; wrap.append(document.createTextNode(text));
   const input = document.createElement('select'); input.setAttribute('aria-label', text); wrap.append(input); root.append(wrap);
   return {wrap, input};
  }
  const countryField = field(label);
  const entries = [...countries, ...(cities.length ? [['__russia', {name: 'Россия', flag: '🇷🇺'}]] : [])].sort(sort);
  for (const [id, p] of entries) { const o = document.createElement('option'); o.value = id; o.textContent = p.flag + ' ' + p.name; countryField.input.append(o); }
  countryField.input.value = domestic ? '__russia' : selected;
  const cityField = field('Город в России'); cityField.wrap.hidden = !domestic;
  for (const [id, p] of cities) { const o = document.createElement('option'); o.value = id; o.textContent = p.name; cityField.input.append(o); }
  cityField.input.value = city || '';
  function choose(id) {
   if (!profiles[id]) return;
   if (profiles[id].domestic) try { localStorage.setItem('rumbo-last-russian-city', id); } catch {}
   onChange(id);
  }
  countryField.input.addEventListener('change', () => {
   const isRussia = countryField.input.value === '__russia'; cityField.wrap.hidden = !isRussia;
   choose(isRussia ? cityField.input.value : countryField.input.value);
  });
  cityField.input.addEventListener('change', () => choose(cityField.input.value));
  return root;
 }
 window.RumboDestinationPicker = {mount};
})();
