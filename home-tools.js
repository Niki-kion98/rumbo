(() => {
 const catalog = window.RUMBO_CATALOG, host = document.querySelector('.life-hub');
 if (!catalog || !host) return;

 const picker = window.RumboDestinationPicker.mount({
  profiles: catalog,
  selected: '',
  label: 'Направление для личных инструментов',
  onChange(id) {
   for (const card of host.querySelectorAll('[data-tool-section]')) {
    card.href = catalog[id].url + '#' + card.dataset.toolSection;
    card.querySelector('.text-link').textContent = 'Открыть ↗';
   }
   try { localStorage.setItem('rumbo-last-country', id); } catch {}
  }
 });
 const countrySelect = picker.querySelector('select');
 const placeholder = new Option('Выберите страну', '', true, true);
 placeholder.disabled = true;
 countrySelect.prepend(placeholder);
 countrySelect.value = '';
 picker.classList.add('life-hub-country');
 host.querySelector('.life-hub-grid').before(picker);
})();

(() => {
 const catalog = window.RUMBO_CATALOG, host = document.querySelector('#resume-journey');
 if (!catalog || !host) return;
 let selected;
 try { selected = localStorage.getItem('rumbo-last-country'); } catch {}
 const country = catalog[selected];
 if (!country) return;
 const a = document.createElement('a'); a.className = 'resume-journey'; a.href = 'dashboard.html';
 const copy = document.createElement('span'), title = document.createElement('strong'), text = document.createElement('small');
 title.textContent = 'Продолжить знакомство: ' + country.name;
 text.textContent = 'Открыть кабинет, посмотреть прогресс и ближайшие дела';
 const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
 copy.append(title, text); a.append(copy, arrow); host.append(a); host.hidden = false;
})();
