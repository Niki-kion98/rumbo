(() => {
 const C=window.RUMBO_CATALOG, host=document.querySelector('.life-hub');
 if(!C||!host)return;
 let selected='uruguay';
 try{const prev=localStorage.getItem('rumbo-last-country');if(C[prev])selected=prev}catch{}
 function apply(save=false){
  for(const a of host.querySelectorAll('.life-hub-card'))if(a.hash)a.href=C[selected].url+a.hash;
  if(save)try{localStorage.setItem('rumbo-last-country',selected)}catch{}
 }
 const picker=window.RumboDestinationPicker.mount({profiles:C,selected,label:'Направление для личных инструментов',onChange:id=>{selected=id;apply(true)}});
 picker.classList.add('life-hub-country');host.querySelector('.life-hub-grid').before(picker);apply();
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
