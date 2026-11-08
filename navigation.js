(() => {
 function openInfoFromHash(){const ids={'#safety':'#safety details','#country-life':'#country-life details'};const selector=ids[location.hash];if(selector){const info=document.querySelector(selector);if(info)info.open=true}}
 window.addEventListener('hashchange',openInfoFromHash);openInfoFromHash();
 if(location.hash==='#about'&&/\/(?:index\.html)?$/.test(location.pathname)){location.replace('about.html');return;}
 const countryHashes=['#uruguay','#result','#calendar','#calculator'];
 const isCountry=!!document.querySelector('#plan-form');
 if(!isCountry&&countryHashes.includes(location.hash)) {location.replace('uruguay.html'+location.hash);return;}
 const panel=document.querySelector('#calculator-panel');
 if(!panel)return;
 function openFromHash(){if(location.hash==='#calculator'){panel.open=true;document.querySelector('#calculator').scrollIntoView({behavior:'smooth'});}}
 window.addEventListener('hashchange',openFromHash);
 document.querySelectorAll('a[href="#calculator"]').forEach(a=>a.addEventListener('click',()=>{panel.open=true;}));
 document.querySelector('#close-calculator').addEventListener('click',()=>{panel.open=false;panel.querySelector('summary').focus();document.querySelector('#calculator').scrollIntoView({behavior:'smooth'});});
 openFromHash();
})();