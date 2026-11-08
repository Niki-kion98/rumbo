(function(root){
 const ids=['uruguay','vietnam','paraguay','brazil','argentina','china','thailand','philippines','usa','canada','south-africa','mauritius','spain','germany','portugal','france','italy','montenegro','serbia','india','sri-lanka','nepal','laos','cambodia','indonesia','moscow','saint-petersburg','novosibirsk','vladivostok','sweden','norway','denmark','finland','iceland'];
 const choice=(value,title,note,scores={},reason='')=>({value,title,note,scores,reason});
 const questions=[
 {id:'weather',title:'Каким вы представляете своё утро?',hint:'Выбираем образ жизни, а не обещание погоды. Климат зависит от города и сезона.',options:[choice('tropical','Тепло большую часть года; сезон дождей приемлем','Хочу изучать тёплые города и прибрежные маршруты.',{vietnam:2,brazil:2,thailand:2,philippines:2,mauritius:2},'Вам близок тёплый, зелёный сценарий жизни.'),choice('seasons','Свежий ветер и заметную смену сезонов','Предпочитаю заметную смену температуры по сезонам.',{uruguay:2,argentina:2,china:2,usa:2,canada:1,'south-africa':2},'Вы выбрали сценарий со сменой сезонов.'),choice('rainy','Мягкая городская зима; дожди приемлемы','Готов к дождям и хочу изучить сезонные условия выбранного города.',{canada:3},'Вам подходит сценарий с относительно мягкой дождливой зимой в городе.'),choice('either','Готов адаптироваться к разному климату','Для меня важнее другие стороны жизни.')]},
 {id:'rhythm',title:'Какой ритм хочется попробовать?',hint:'Это сценарии знакомства. Спокойные и оживлённые районы есть в каждой стране.',options:[choice('quiet','Прогулки, площади и больше пауз','Важны прогулочные пространства; оживлённость зависит от района.',{uruguay:3,paraguay:1,thailand:2,canada:2,mauritius:2},'Вы выбрали прогулки и более размеренный сценарий.'),choice('city','Большой город, культура и вечерние планы','Важны городские кварталы, архитектура и культурная жизнь.',{argentina:3,brazil:2,vietnam:1,china:3,philippines:1,usa:3,canada:1},'Вам интересен насыщенный городской сценарий.'),choice('cafes','Уличные кафе, кофе и новые вкусы','Познакомиться с повседневными ритуалами.',{vietnam:3,brazil:1,thailand:2,china:1},'Вам близко знакомство со страной через кафе и новые вкусы.'),choice('mix','Хочу выбирать ритм под настроение','Пока оставлю все варианты открытыми.')]},
 {id:'culture',title:'Какую языковую среду хочется открыть?',hint:'Предпочтение в выборе языка не подтверждает право на работу или проживание.',options:[choice('spanish','Испанскую речь и южноамериканские маршруты','Уругвай, Парагвай или Аргентина.',{uruguay:2,paraguay:2,argentina:2},'Вас привлекает испаноязычная среда.'),choice('portuguese','Португальскую речь и культуру Бразилии','Хочу начать с португальского.',{brazil:3},'Вы хотите познакомиться с португалоязычной Бразилией.'),choice('asian','Вьетнамский язык и другую культурную среду','Готов к новым языковым привычкам.',{vietnam:3},'Вас привлекает вьетнамская культура.'),choice('chinese','Китайский язык и жизнь азиатского мегаполиса','Готов знакомиться с китайской языковой средой.',{china:3},'Вас привлекают китайский язык и культура.'),choice('thai','Тайский язык, храмы и местные традиции','Готов изучать тайский язык и местные привычки.',{thailand:3},'Вас привлекают тайский язык и культурная среда.'),choice('english','Английский язык в повседневной жизни','Сравним несколько городских сценариев; местные языки и условия различаются.',{philippines:3,usa:3,canada:3,'south-africa':3,mauritius:1},'Вам важно использовать английский язык в повседневной жизни.'),choice('islandculture','Французскую и креольскую речь острова','Хочу знакомиться с культурным разнообразием Маврикия.',{mauritius:3},'Вам интересна языковая и культурная среда Маврикия.'),choice('open','Интересно всё — язык пока не решает','Готов изучить разные варианты.')]},
 {id:'landscape',title:'Какой пейзаж хочется видеть чаще?',hint:'Это предпочтение для знакомства. Города и регионы внутри страны сильно отличаются.',options:[choice('mountains','Горы, леса и простор для путешествий','Хочу изучать горные маршруты.',{argentina:3,brazil:2,thailand:3,canada:3,'south-africa':3,mauritius:1},'Вы выбрали горные пейзажи и путешествия.'),choice('river','Река, зелень и городские сады','Океан для меня необязателен.',{paraguay:3,uruguay:1,china:1},'Вам ближе реки и зелёные городские маршруты.'),choice('coast','Море или побережье и длинные прогулки','Хочу чаще бывать у воды.',{uruguay:2,vietnam:2,brazil:2,philippines:2,canada:2,'south-africa':2,mauritius:3},'Вы хотите чаще бывать у побережья.'),choice('architecture','Архитектура, кварталы и жизнь города','Сначала хочу найти свой район.',{argentina:2,uruguay:2,brazil:2,paraguay:1,vietnam:1,china:3,thailand:1,philippines:1,usa:3,canada:1},'Вас интересуют архитектура и повседневность города.'),choice('metropolis','Небоскрёбы, музеи и большие городские парки','Хочу погрузиться в жизнь мегаполиса.',{usa:3,china:2},'Вы выбрали городские парки, музеи и масштаб мегаполиса.'),choice('islands','Острова и морские поездки','Готов планировать отдельные поездки с учётом погоды.',{philippines:3,mauritius:3},'Вас привлекают островные и морские маршруты.'),choice('cape','Город у Столовой горы и океана','Хочу изучить Кейптаун с учётом безопасности района.',{'south-africa':3},'Вам интересен городской и природный сценарий Кейптауна.'),choice('any','Пейзаж пока не главное','Оставлю решение на потом.')]},
 {id:'checks',title:'Что обязательно проверить перед решением?',hint:'Можно выбрать несколько. Эти ответы составляют список проверок и не ранжируют страны.',multiple:true,options:[choice('safety','Безопасность района, транспорта и повседневных маршрутов'),choice('budget','Бюджет и устойчивость дохода'),choice('status','Законное основание для длительного пребывания'),choice('children','Обучение и адаптацию детей'),choice('access','Доступную среду и продолжение ухода'),choice('pets','Переезд с животными'),choice('work','Возможность работать и налоговые вопросы'),choice('unknown','Пока хочу познакомиться с вариантами')]}
 ];

 const regions={russia:['moscow','saint-petersburg','novosibirsk','vladivostok'],europe:['spain','germany','portugal','france','italy','montenegro','serbia'],south:['uruguay','paraguay','brazil','argentina'],asia:['vietnam','china','thailand','philippines','india','sri-lanka','nepal','laos','cambodia','indonesia'],north:['usa','canada'],africa:['south-africa','mauritius']};
 questions.unshift({id:'region',title:'Есть ли регион, который вас уже привлекает?',hint:'Если предпочтение есть, сравним страны внутри него. Или оставьте весь мир открытым.',options:[choice('any','Пока открыт весь мир','Сравнить все 40 направлений.'),choice('europe','Европа','Испания, Германия, Португалия, Франция, Италия, Черногория и Сербия.'),choice('south','Южная Америка','Уругвай, Парагвай, Бразилия и Аргентина.'),choice('asia','Азия','10 направлений — от Вьетнама и Китая до Непала и Бали.'),choice('north','Северная Америка','США и Канада.'),choice('africa','Африка','ЮАР и Маврикий.') ]});
 const option=(question,value)=>questions.find(q=>q.id===question).options.find(o=>o.value===value);
 const addScores=(question,value,scores)=>Object.assign(option(question,value).scores,scores);
 addScores('weather','seasons',{spain:1,germany:3,portugal:1,france:2,italy:2,montenegro:2,serbia:3});
 addScores('weather','rainy',{portugal:2,france:1});
 addScores('rhythm','quiet',{portugal:2,italy:1,montenegro:3});
 addScores('rhythm','city',{spain:2,germany:3,france:3,italy:1,serbia:3});
 addScores('rhythm','cafes',{spain:2,portugal:3,france:2,italy:2,serbia:2});
 addScores('culture','spanish',{spain:3});option('culture','spanish').title='Испанскую речь';option('culture','spanish').note='Испания или испаноязычные страны Южной Америки.';
 addScores('culture','portuguese',{portugal:3});option('culture','portuguese').title='Португальскую речь';option('culture','portuguese').note='Португалия и Бразилия — разные повседневные сценарии.';option('culture','portuguese').reason='Вас привлекает португалоязычная среда.';
 const culture=questions.find(q=>q.id==='culture');culture.options.splice(culture.options.length-1,0,choice('german','Немецкий язык и европейский городской ритм','Начать знакомство с Берлина.',{germany:4},'Вам интересны немецкий язык и жизнь в Германии.'),choice('french','Французский язык и культурная жизнь','Начать с Парижа; условия регионов различаются.',{france:4},'Вы хотите знакомиться с французской языковой средой.'),choice('italian','Итальянский язык, искусство и каналы','Начать с Венеции, затем сравнить регионы.',{italy:4},'Вас привлекает итальянская культура.'),choice('balkan','Сербский язык и близкие языковые среды Балкан','Сравнить Белград и Котор без обещания лёгкой адаптации.',{serbia:3,montenegro:3},'Вам интересно знакомство с языковой средой Балкан.'));
 addScores('landscape','mountains',{germany:1,montenegro:3});
 addScores('landscape','river',{serbia:3,portugal:1});
 addScores('landscape','coast',{spain:2,portugal:2,italy:1,montenegro:3});
 addScores('landscape','architecture',{spain:3,germany:2,portugal:2,france:3,italy:3,serbia:2,montenegro:1});
 addScores('landscape','metropolis',{germany:2,france:3});
 const landscape=questions.find(q=>q.id==='landscape');landscape.options.splice(landscape.options.length-1,0,choice('canals','Каналы, мосты и исторические кварталы','Хочу изучить Венецию и её необычную повседневность.',{italy:4},'Вам близок сценарий исторического города на воде.'));


 addScores('weather','tropical',{'india':2,'sri-lanka':2,laos:2,cambodia:2,indonesia:2});
 addScores('weather','seasons',{nepal:2});
 addScores('rhythm','quiet',{'india':1,'sri-lanka':1,nepal:3,laos:3,indonesia:2});
 addScores('rhythm','cafes',{'india':1,'sri-lanka':1,laos:1,cambodia:1,indonesia:2});
 addScores('landscape','coast',{'india':3,'sri-lanka':3,indonesia:2});
 addScores('landscape','mountains',{nepal:4,laos:1});
 addScores('landscape','river',{laos:3});
 addScores('landscape','architecture',{'india':2,cambodia:3,laos:2,indonesia:2,'sri-lanka':2});
 culture.options.splice(culture.options.length-1,0,
 choice('goa','Культура Гоа и языковая среда Индии','Панаджи и побережье: конкани и другие языки, без обещания английского в любой ситуации.',{india:4},'Вам интересно знакомство с Гоа и индийской культурной средой.'),
 choice('sri-lanka','Сингальская и тамильская среда Шри-Ланки','Галле и островные маршруты; местные языки важны.',{'sri-lanka':4},'Вас привлекает культура Шри-Ланки.'),
 choice('nepali','Непальский язык и гималайские традиции','Начать с Покхары, отдельно готовиться к горным маршрутам.',{nepal:4},'Вы хотите познакомиться с непальской культурой.'),
 choice('lao','Лаосский язык и жизнь у Меконга','Храмовые кварталы Луангпхабанга и речные прогулки.',{laos:4},'Вам интересны лаосская культура и речной городской ритм.'),
 choice('khmer','Кхмерская культура и древний Ангкор','Начать с Сиемреапа и бережного знакомства с храмами.',{cambodia:4},'Вас привлекают кхмерская культура и история Ангкора.'),
 choice('balinese','Индонезийский язык и традиции Бали','Сравнить внутренний Убуд с прибрежным Сануром.',{indonesia:4},'Вам интересно познакомиться с балийскими традициями.'));


 questions.find(q=>q.id==='region').options.splice(0,0,choice('russia','Хочу переехать внутри России','Москва, Санкт-Петербург, Новосибирск или Владивосток.'));
 addScores('weather','seasons',{moscow:2,'saint-petersburg':1,novosibirsk:3,vladivostok:2});
 addScores('weather','rainy',{'saint-petersburg':3,vladivostok:1});
 addScores('rhythm','city',{moscow:4,'saint-petersburg':2,novosibirsk:2,vladivostok:1});
 addScores('rhythm','cafes',{moscow:2,'saint-petersburg':3});
 addScores('landscape','river',{'saint-petersburg':3,novosibirsk:3,moscow:1});
 addScores('landscape','architecture',{'saint-petersburg':4,moscow:3});
 addScores('landscape','metropolis',{moscow:4,novosibirsk:2});
 addScores('landscape','coast',{vladivostok:4,'saint-petersburg':1});
 culture.options.splice(culture.options.length-1,0,choice('russian','Русскоязычная среда и переезд внутри страны','Сравнить повседневную жизнь российских городов.',{moscow:3,'saint-petersburg':3,novosibirsk:3,vladivostok:3},'Вы хотите сохранить русскоязычную повседневную среду.'));

 regions.nordic=['sweden','norway','denmark','finland','iceland'];
 questions.find(q=>q.id==='region').options.splice(2,0,choice('nordic','Северная Европа','Швеция, Норвегия, Дания, Финляндия и Исландия.'));
 addScores('weather','seasons',{sweden:3,norway:2,denmark:2,finland:3,iceland:1});
 addScores('weather','rainy',{norway:2,denmark:2,iceland:3});
 addScores('rhythm','quiet',{sweden:2,norway:3,denmark:2,finland:3,iceland:3});
 addScores('rhythm','city',{sweden:2,norway:1,denmark:3,finland:1});
 addScores('rhythm','cafes',{sweden:3,denmark:2,finland:2,iceland:1});
 addScores('landscape','coast',{sweden:2,norway:3,denmark:2,finland:2,iceland:2});
 addScores('landscape','mountains',{norway:4,iceland:3});
 addScores('landscape','architecture',{sweden:2,denmark:3,finland:2});
 const northCulture=questions.find(q=>q.id==='culture');
 northCulture.options.splice(northCulture.options.length-1,0,
 choice('swedish','Шведский язык и островной Стокгольм','Город, леса и кофейные паузы.',{sweden:5},'Вам интересны шведский язык и городской сценарий Стокгольма.'),
 choice('norwegian','Норвежский язык и жизнь рядом с фьордом','Начать знакомство с Осло.',{norway:5},'Вы выбрали норвежскую языковую среду и близость к природе.'),
 choice('danish','Датский язык, дизайн и Копенгаген','Городские кварталы у воды.',{denmark:5},'Вам интересны датская культура и жизнь Копенгагена.'),
 choice('finnish','Финский или шведский язык в Финляндии','Хельсинки, лесные и озёрные маршруты.',{finland:5},'Вас привлекает языковая среда Финляндии.'),
 choice('icelandic','Исландский язык и небольшой северный город','Знакомиться с Рейкьявиком и островом.',{iceland:5},'Вы хотите изучать исландский язык и островную повседневность.'));
 landscape.options.splice(landscape.options.length-1,0,
 choice('fjord','Фьорды и горные берега','Для повседневной жизни и для поездок — разные маршруты.',{norway:5},'Вас привлекают фьорды Норвегии.'),
 choice('lava','Лавовые поля, водопады и вулканический остров','Готов учитывать погоду и природные ограничения.',{iceland:5},'Вы выбрали вулканические пейзажи Исландии.'),
 choice('lakes','Лесные озёра и северные сезоны','Хочу изучить Финляндию и Швецию.',{finland:4,sweden:3},'Вы выбрали леса и озёра Северной Европы.'));


 ids.push('armenia','georgia','kazakhstan','uae','oman','qatar');
 regions.caucasus=['armenia','georgia'];regions.central=['kazakhstan'];regions.middle=['uae','oman','qatar'];
 questions.find(q=>q.id==='region').options.splice(1,0,choice('caucasus','Закавказье','Армения и Грузия.'),choice('central','Центральная Азия','Казахстан: начать с Алматы.'),choice('middle','Ближний Восток','ОАЭ, Оман и Катар.'));
 addScores('weather','seasons',{armenia:3,georgia:3,kazakhstan:3});
 addScores('rhythm','quiet',{armenia:2,georgia:2,oman:4});addScores('rhythm','city',{uae:4,qatar:3,kazakhstan:2});addScores('rhythm','cafes',{armenia:3,georgia:3,kazakhstan:2});
 addScores('landscape','mountains',{armenia:4,georgia:4,kazakhstan:4,oman:3});addScores('landscape','coast',{uae:2,oman:3,qatar:2});addScores('landscape','metropolis',{uae:4,qatar:3,kazakhstan:2});
 culture.options.splice(culture.options.length-1,0,choice('armenian','Армянский язык и Ереван','Городские прогулки и горные маршруты.',{armenia:5},'Вам интересны армянский язык и Ереван.'),choice('georgian','Грузинский язык и старый Тбилиси','Улицы на склонах и прогулки у реки.',{georgia:5},'Вы выбрали грузинскую культурную среду.'),choice('kazakh','Казахский язык и Алматы','Город у подножия гор.',{kazakhstan:5},'Вас привлекает знакомство с Казахстаном.'),choice('arabic','Арабский язык и города у залива','Сравнить ОАЭ, Оман и Катар.',{uae:3,oman:3,qatar:3},'Вам интересна арабская языковая среда.'));
 landscape.options.splice(landscape.options.length-1,0,choice('desert','Горы, вади и пустынные маршруты Омана','Поездки требуют отдельной подготовки.',{oman:5},'Вам интересны природные маршруты Омана.'),choice('skyline','Небоскрёбы и набережные Дубая','Для жизни отдельно проверю жару и расстояния.',{uae:5},'Вас привлекает городской сценарий Дубая.'),choice('doha','Музеи и набережная Дохи','Город у залива и культурные пространства.',{qatar:5},'Вы хотите изучить городской сценарий Дохи.'));
 function rank(answers){
 const scores=Object.fromEntries(ids.map(id=>[id,0])),reasons=Object.fromEntries(ids.map(id=>[id,[]]));let expressed=0;
 for(const q of questions.filter(q=>!q.multiple)){const o=q.options.find(x=>x.value===answers[q.id]);if(!o)continue;if(ids.some(id=>(o.scores[id]||0)>0))expressed++;for(const id of ids){scores[id]+=o.scores[id]||0;if(o.scores[id]&&o.reason)reasons[id].push(o.reason)}}
 const eligible=regions[answers.region]||ids;const order=[...eligible].sort((a,b)=>scores[b]-scores[a]);const candidates=order.filter(id=>scores[order[0]]-scores[id]<=2);
 const selected=candidates.includes(answers.refine)?answers.refine:order[0];
 return{scores,reasons,order:[selected,...order.filter(id=>id!==selected)],candidates,needsRefinement:candidates.length>1&&!candidates.includes(answers.refine),uncertain:candidates.length>1,neutral:expressed===0};
 }
 root.RumboDiscovery={questions,rank,ids};if(typeof module!=='undefined')module.exports={questions,rank,ids};
})(typeof window!=='undefined'?window:globalThis);
