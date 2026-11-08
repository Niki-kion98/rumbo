'use strict';
(() => {
 const main = document.querySelector('main');
 if (main) {
  if (!main.id) main.id = 'main-content';
  const skip = document.createElement('a');
  skip.className = 'skip-content'; skip.href = '#' + main.id; skip.textContent = 'Перейти к содержимому';
  document.body.prepend(skip);
 }
 for (const a of document.querySelectorAll('header a')) {
  if (a.pathname === location.pathname && !a.hash) a.setAttribute('aria-current', 'page');
 }
 // Source dates come from the existing content. This module does not refresh them.
 function enhanceSources() {
  for (const block of document.querySelectorAll('.step-sources:not([data-readable])')) {
   block.dataset.readable = 'true';
   const title = document.createElement('h4'); title.className = 'evidence-title'; title.textContent = 'Сверить требования';
   block.prepend(title);
   for (const a of block.querySelectorAll('a')) {
    try {
     const domain = new URL(a.href).hostname.replace(/^www\./, '');
     const small = document.createElement('small'); small.className = 'source-domain'; small.textContent = domain;
     a.append(small); a.rel = 'noopener noreferrer';
    } catch {}
   }
  }
 }
 const tasks = document.querySelector('#tasks');
 if (tasks) {
  enhanceSources();
  new MutationObserver(enhanceSources).observe(tasks, {childList: true, subtree: true});
  const guide = document.createElement('details'); guide.className = 'information-guide';
  const summary = document.createElement('summary'); summary.textContent = 'Откуда информация и как ей пользоваться';
  const body = document.createElement('div'); body.className = 'information-guide-body';
  for (const [title, text] of [
   ['Требования и источники', 'Внутри шагов есть ссылки на первоисточники и даты их проверки. Перед подачей документов откройте источник и уточните требования к своему случаю. Дата относится к указанному разделу и не означает проверку в реальном времени.'],
   ['План и календарь', 'Последовательность действий и даты помогают организовать подготовку. Они не подтверждают право на въезд, проживание или работу и не заменяют сроки официальных процедур.'],
   ['Бюджет', 'Смета опирается на ваши суммы. Учебные примеры и условные расходы на питомцев отмечены отдельно. Дата валютного курса указана в калькуляторе.']
  ]) {
   const item = document.createElement('div'), h = document.createElement('h3'), p = document.createElement('p');
   h.textContent = title; p.textContent = text; item.append(h, p); body.append(item);
  }
  guide.append(summary, body); document.querySelector('#summary').after(guide);
 }
 // Hash links to a calculator or task should also be usable with a keyboard.
 document.querySelectorAll('.mobile-menu-links a').forEach(a => {
  if (a.pathname === location.pathname && !a.hash) a.setAttribute('aria-current', 'page');
 });
})();
