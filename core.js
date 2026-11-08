(function(root){
  const number=v=>{const n=Number(v);return Number.isFinite(n)?Math.max(0,n):0};
  function addDays(date,days){const d=new Date(date+'T12:00:00Z');if(!Number.isFinite(d.getTime()))return '';d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)}
  function breedGroup(name){
    const n=String(name||'').toLowerCase().replace(/ё/g,'е').trim();
    const short=['мопс','pug','французский бульдог','french bulldog','английский бульдог','english bulldog','боксер','boxer','пекинес','pekingese','ши-тцу','shih tzu','персид','persian','шотландская вислоухая','scottish fold','британская короткошерстная','british shorthair'];
    const restricted=['американский стаффордшир','american staffordshire','питбуль','pitbull','аргентинский дог','dogo argentino','ротвейлер','rottweiler','доберман','doberman','кавказская овчарка','caucasian ovcharka'];
    return restricted.some(x=>n.includes(x))?'restricted':short.some(x=>n.includes(x))?'short':null;
  }
  function petModel(p,profile=root.RUMBO_PROFILE||{}){
    const total=number(p.weight)+number(p.carrierWeight);
    if(profile.domestic||profile.quoteOnly){const keys=['transport','carrier','vet','extra'],costs=Object.fromEntries(keys.map(k=>[k,number(p[k])]));return{totalWeight:total,mode:profile.domestic?'domestic':'quote',costs,total:Object.values(costs).reduce((a,b)=>a+b,0),unknown:keys.some(k=>p[k]===''||p[k]===undefined)}}
    const restricted=p.breedGroup==='restricted';
    const short=p.breedGroup==='short';
    let mode=total<=(profile.cabin||8)?'cabin':total<=(profile.hold||50)?'hold':'cargo';
    if(p.type==='other'||restricted||(short&&(profile.strictShort||total>(profile.cabin||8))))mode='quote';
    const fx=root.RumboFX?root.RumboFX.rate(root.RumboFX.currency):1;
    const transport={cabin:350,hold:850,cargo:1800,quote:0}[mode]*fx;
    const carrier=(mode==='cabin'?70:mode==='hold'?180:mode==='cargo'?280:0)*fx;
    const vet=(p.type==='dog'?180:p.type==='cat'?140:0)*fx;
    const exact=p.costMode==='own';
    const costs={transport:exact?number(p.transport):transport,carrier:exact?number(p.carrier):carrier,vet:exact?number(p.vet):vet,extra:exact?number(p.extra):0};
    return {totalWeight:total,mode,costs,total:Object.values(costs).reduce((a,b)=>a+b,0),unknown:!exact&&mode==='quote'};
  }
  function calculate(b,pets,profile=root.RUMBO_PROFILE||{}){
    const base=['flights','documents','housing','other-once'].reduce((s,k)=>s+number(b[k]),0);
    const petResults=pets.map(p=>petModel(p,profile)),petTotal=petResults.reduce((s,p)=>s+p.total,0),once=base+petTotal;
    const monthly=['rent','living','care-cost','other-monthly'].reduce((s,k)=>s+number(b[k]),0);
    const savings=number(b.savings),income=number(b['monthly-income']),remaining=savings-once,deficit=monthly-income;
    const runway=remaining<0?0:monthly===0?null:deficit<=0?Infinity:remaining/deficit;
    return {once,petTotal,base,monthly,remaining,deficit,runway,petResults,incomplete:petResults.some(p=>p.unknown)};
  }
  function ics(events){const esc=s=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');let lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Rumbo//Preparation planner//RU','CALSCALE:GREGORIAN'];events.filter(e=>e.date).forEach(e=>lines.push('BEGIN:VEVENT','UID:rumbo-'+(root.RUMBO_PROFILE?.id||'uruguay')+'-'+e.id+'-'+e.date+'@planner.local','DTSTAMP:20261020T000000Z','DTSTART;VALUE=DATE:'+e.date.replaceAll('-',''),'DTEND;VALUE=DATE:'+addDays(e.date,1).replaceAll('-',''),'SUMMARY:'+esc(e.title),'DESCRIPTION:'+esc('Организационная дата, выбранная пользователем. Не официальный срок процедуры.'),'END:VEVENT'));lines.push('END:VCALENDAR');return lines.map(line=>{let out='',part='',size=0;for(const ch of line){const bytes=new TextEncoder().encode(ch).length;if(size+bytes>74){out+=part+'\r\n ';part='';size=1}part+=ch;size+=bytes}return out+part}).join('\r\n')+'\r\n'}
  function plural(n,forms){const x=Math.abs(n)%100,last=x%10;return forms[x>=11&&x<=14?2:last===1?0:last>=2&&last<=4?1:2]}
  const api={number,addDays,breedGroup,petModel,calculate,ics,plural};root.RumboCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
