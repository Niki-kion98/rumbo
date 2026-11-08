(()=>{
 const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text!==undefined)e.textContent=text;return e};
 window.RumboMatchExplain={build(D,answers,id,f,profiles){
 const box=el('div','match-explain'),selected=D.questions.filter(q=>!q.multiple).map(q=>({q,o:q.options.find(o=>o.value===answers[q.id])})).filter(x=>x.o);
 const matches=selected.filter(x=>(x.o.scores[id]||0)>0).sort((a,b)=>b.o.scores[id]-a.o.scores[id]);
 const list=el('ol','decision-reasons');matches.slice(0,3).forEach(({o})=>{const item=el('li');item.append(el('strong','',o.title),el('p','',o.reason||o.note));list.append(item)});
 if(matches.length)box.append(list);else box.append(el('p','','Вы оставили основные предпочтения открытыми. Пока недостаточно оснований назвать этот вариант точным совпадением.'));
 if(matches.length<3)box.append(el('p','field-hint','Содержательных совпадений: '+matches.length+'. Остальные ответы оставляют выбор открытым или не добавляют баллов этому направлению.'));
 const region=selected.find(x=>x.q.id==='region');if(region&&region.o.value!=='any')box.append(el('p','field-hint','Область сравнения: '+region.o.title+'. Страны за пределами выбранного региона в итог не включены.'));
 if(answers.refine===id)box.append(el('p','decision-note','При близких результатах вы выбрали этот вариант в последнем уточнении.'));
 box.append(el('h4','','Два момента перед решением'));
 const cautions=el('ol','decision-reasons');cautions.append(el('li','',f.caution));
 const mismatch=selected.find(x=>x.q.id!=='region'&&Object.values(x.o.scores).some(n=>n>0)&&!(x.o.scores[id]>0));
 cautions.append(el('li','',mismatch?'Ответ «'+mismatch.o.title+'» не добавил баллов этому направлению. Проверьте, насколько конкретный город соответствует этому пожеланию.':'Совпадение с образом жизни не подтверждает доступность переезда. Основание проживания, право на работу и личный бюджет проверяются отдельно.'));box.append(cautions);
 const details=el('details','decision-details');details.append(el('summary','','Какие ответы повлияли на результат'));
 const rows=el('div','match-answer-list');selected.forEach(({q,o})=>{const row=el('div','match-answer');row.append(el('span','',o.title),el('strong','',q.id==='region'?'Фильтр региона':(o.scores[id]||0)>0?'+'+o.scores[id]+' балл.':'Без баллов'));rows.append(row)});details.append(rows,el('p','field-hint','Баллы — редакционные веса предпочтений. Это не процент вероятности успешного переезда. Ответы о детях, безопасности, работе и питомцах формируют список проверок и не меняют рейтинг.'));box.append(details);return box;
 }};
})();
