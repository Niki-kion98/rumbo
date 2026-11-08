'use strict';
(() => {
 const form = document.querySelector('#registration-form');
 if (!form) return;
 const email = document.querySelector('#registration-email'), password = document.querySelector('#registration-password'), repeat = document.querySelector('#registration-repeat');
 const success = document.querySelector('#registration-success'), summary = document.querySelector('#registration-errors');
 const touched = new Set();
 function message(input) {
  if (!input.value) return input === email ? 'Укажите email.' : input === password ? 'Придумайте пароль.' : 'Повторите пароль.';
  if (input === email && (input.validity.typeMismatch || input.value.length > 254)) return 'Проверьте email. Например: name@example.com.';
  if (input === password && input.value.length < 8) return 'Используйте не менее 8 символов.';
  if (input === password && input.value.length > 128) return 'Пароль должен содержать не более 128 символов.';
  if (input === repeat && input.value !== password.value) return 'Пароли не совпадают. Проверьте оба поля.';
  return '';
 }
 function validate(input) {
  const text = message(input), error = document.querySelector('#' + input.id + '-error');
  error.textContent = text; input.setAttribute('aria-invalid', text ? 'true' : 'false');
  return !text;
 }
 for (const input of [email, password, repeat]) {
  input.addEventListener('blur', () => {touched.add(input); validate(input);});
  input.addEventListener('input', () => {
   summary.textContent = '';
   if (touched.has(input)) validate(input);
   if (input === password && touched.has(repeat)) validate(repeat);
  });
 }
 for (const toggle of document.querySelectorAll('.password-toggle')) {
  toggle.addEventListener('click', () => {
   const input = document.getElementById(toggle.getAttribute('aria-controls')), visible = input.type === 'password';
   input.type = visible ? 'text' : 'password'; toggle.textContent = visible ? 'Скрыть' : 'Показать'; toggle.setAttribute('aria-pressed', String(visible));
  });
 }
 form.addEventListener('submit', event => {
  event.preventDefault();
  email.value = email.value.trim();
  const inputs = [email, password, repeat]; inputs.forEach(input => touched.add(input));
  const valid = inputs.map(validate);
  if (valid.includes(false)) {
   summary.textContent = 'Проверьте выделенные поля.'; inputs[valid.indexOf(false)].focus(); return;
  }
  // Prototype only: no fetch, storage, URL parameters, account creation or logging.
  form.reset(); touched.clear();
  for (const input of inputs) input.removeAttribute('aria-invalid');
  for (const input of [password, repeat]) input.type = 'password';
  for (const toggle of document.querySelectorAll('.password-toggle')) {toggle.textContent = 'Показать'; toggle.setAttribute('aria-pressed', 'false');}
  form.hidden = true; success.hidden = false; success.focus();
 });
 document.querySelector('#registration-again').addEventListener('click', () => {
  success.hidden = true; form.hidden = false; summary.textContent = '';
  document.querySelectorAll('.registration-error').forEach(e => {e.textContent = '';}); email.focus();
 });
})();
