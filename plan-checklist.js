'use strict';
(() => {
 function mount({task,state,parent,content,heading,persist,onChange}) {
  if(!state.substeps||typeof state.substeps!=='object'||Array.isArray(state.substeps))state.substeps={};
  const keys=task.body.map(([title])=>title);
  const saved=state.substeps[task.id];
  const completed=new Set(Array.isArray(saved)?saved:(state.done.includes(task.id)?keys:[]));
  const controls=[];
  const status=document.createElement('small');status.className='substep-progress';status.setAttribute('aria-live','polite');heading.append(status);
  function sync(save) {
   const selected=keys.filter(key=>completed.has(key));
   state.substeps[task.id]=selected;
   const all=keys.length>0&&selected.length===keys.length;
   parent.checked=all;parent.indeterminate=selected.length>0&&!all;
   state.done=all?[...new Set([...state.done,task.id])]:state.done.filter(id=>id!==task.id);
   controls.forEach(({input,section,key})=>{input.checked=completed.has(key);section.classList.toggle('substep-done',input.checked)});
   status.textContent=`Подпункты: ${selected.length} из ${keys.length}`;
   if(save){persist();onChange()}
  }
  task.body.forEach(([title,text],index)=>{
   const section=document.createElement('section');section.className='plan-substep';
   const h=document.createElement('h4'),label=document.createElement('label'),input=document.createElement('input'),caption=document.createElement('span'),p=document.createElement('p');
   input.type='checkbox';input.id=`substep-${task.id}-${index}`;input.setAttribute('aria-label','Выполнено: '+title);
   caption.textContent=title;p.textContent=text;label.append(input,caption);h.append(label);section.append(h,p);content.append(section);
   controls.push({input,section,key:title});
   input.addEventListener('change',()=>{if(input.checked)completed.add(title);else completed.delete(title);sync(true)});
  });
  parent.addEventListener('change',()=>{completed.clear();if(parent.checked)keys.forEach(key=>completed.add(key));sync(true)});
  sync(false);
 }
 function updateProgress(tasks,state) {
  let total=0,completed=0;
  tasks.forEach(task=>{const keys=task.body.map(([title])=>title);total+=keys.length;const selected=state.substeps?.[task.id];completed+=Array.isArray(selected)?keys.filter(key=>selected.includes(key)).length:(state.done.includes(task.id)?keys.length:0)});
  const steps=tasks.filter(task=>state.done.includes(task.id)).length;
  const percent=total?Math.round(completed/total*100):0;
  let card=document.getElementById('plan-activity');
  if(!card){
   card=document.createElement('section');card.id='plan-activity';card.className='plan-activity';card.setAttribute('aria-label','Прогресс подготовки');
   card.innerHTML='<div class="activity-ring" role="progressbar" aria-label="Выполнение плана" aria-valuemin="0" aria-valuemax="100"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-track" cx="60" cy="60" r="51"/><circle class="ring-value" cx="60" cy="60" r="51" pathLength="100"/></svg><span class="ring-percent"></span></div><div class="activity-copy"><span class="activity-eyebrow">ВАША ПОДГОТОВКА</span><h3>Каждый шаг приближает к переезду</h3><p class="activity-count"></p><p class="activity-message" aria-live="polite"></p><small>Процент учитывает подпункты текущего плана. Отметки сохраняются в этом браузере.</small></div>';
   document.getElementById('progress').before(card);
   document.getElementById('progress-fill').parentElement.hidden=true;
   document.getElementById('progress').hidden=true;
  }
  card.querySelector('.activity-ring').setAttribute('aria-valuenow',String(percent));
  card.querySelector('.activity-ring').setAttribute('aria-valuetext',`${completed} из ${total} подпунктов выполнено`);
  card.querySelector('.ring-value').style.strokeDashoffset=String(100-(total?completed/total*100:0));
  card.querySelector('.ring-percent').textContent=percent+'%';
  card.querySelector('.activity-count').textContent=`Шаги: ${steps} из ${tasks.length} · Подпункты: ${completed} из ${total}`;
  card.querySelector('.activity-message').textContent=completed===0?'Начните с одного подпункта — и круг начнёт заполняться.':completed===total?'Все пункты отмечены. Перед поездкой ещё раз проверьте сроки документов и актуальные требования.':'Прогресс уже виден. Продолжайте в удобном для вас темпе.';
 }
 window.RumboChecklist={mount,updateProgress};
})();
