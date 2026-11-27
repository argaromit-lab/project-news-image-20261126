import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {stories,timeline,day} from '../reporting.mjs';
const require=createRequire(process.env.ATLAS_RENDER_PACKAGES??'G:/kits/news-image-20261126-tools/package.json');
const {chromium}=require('playwright');
const sharp=require('sharp');
const root=path.resolve(import.meta.dirname,'..');
const pass=process.argv[2]??'R3';
const continued=/^R[1-3]$/.test(pass);
const copyfit=pass==='R2'||pass==='R3';
const clarified=pass==='R3';
const upgrade=/^U[1-4]$/.test(pass)||continued;
const readable=/^U[2-4]$/.test(pass)||continued;
const scenic=/^U[3-4]$/.test(pass)||continued;
const deep=pass!=='H0';
const final=pass==='H4';
const hybrid=pass==='H3'||final||upgrade;
const alternate=pass==='H2'||hybrid;
const lift=final||readable?80:alternate?60:0;
const P={paper:'#F7F3EB',ink:'#161616',rule:'#C8C0B0',navy:'#0E1E32',maroon:'#5C161B',emerald:'#0B3B2E',gold:'#FFD54F',muted:'#5D5A51',ocean:'#0B1F33',land:'#4B8B6B'};
const regions={Asia:'#0D655B',Europe:'#244F78','Middle East':'#8E332A',Americas:'#966018',Africa:'#645C28',Oceania:'#754362',World:'#4C5766'};
const states={OFFICIAL:'#145A32',OFFICIALS:'#0E6251',REPORTED:'#922B21',FORECAST:'#1B4F72',CLAIM:'#784212'};
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let svg=[];
const put=s=>svg.push(s);
const rect=(x,y,w,h,fill,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${more}/>`;
const line=(x1,y1,x2,y2,color=P.rule,width=2,more='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${more}/>`;
function text(x,y,value,size=22,opts={}){
 const {fill=P.ink,weight=400,serif=false,anchor='start',box=null,id='',italic=false}=opts;
 if(box&&anchor==='start')x+=5;
 const att=box?` data-bounds="${box.join(',')}"`:'';
 return `<text ${id?`id="${id}"`:''} x="${x}" y="${y}" fill="${fill}" font-family="${serif?'Georgia,serif':'Arial Narrow,Arial,sans-serif'}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" ${italic?'font-style="italic"':''}${att}>${escape(value)}</text>`;
}
function words(value,limit){
 const result=[]; let current='';
 for(const word of value.split(/\s+/)){if(current&&(current+' '+word).length>limit){result.push(current);current=word;}else{current+=(current?' ':'')+word;}}
 if(current)result.push(current);return result;
}
const circle=(x,y,r,fill,more='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${more}/>`;
const poly=(points,fill,more='')=>`<polygon points="${points}" fill="${fill}" ${more}/>`;
const windows=(x,y,cols,rows,dx=30,dy=28,color='#FFD54F')=>Array.from({length:cols*rows},(_,i)=>rect(x+i%cols*dx,y+Math.floor(i/cols)*dy,10,12,color,`opacity="${.35+(i%3)*.2}"`)).join('');
function art(name){
 let a=[];const add=s=>a.push(s);
 add(rect(0,0,600,240,'url(#'+(['summit','space','justice','memorial','pipeline'].includes(name)?'green':(['storm','servers','radar'].includes(name)?'blue':'red'))+')'));
 add(`<path d="M0 210 Q140 150 300 204 T600 193 V240 H0Z" fill="#000" opacity=".14"/>`);
 if(deep)add(`<path d="M0 25H600M0 75H600M0 125H600M50 0V240M150 0V240M250 0V240M350 0V240M450 0V240M550 0V240" stroke="#FFF" stroke-width="1" opacity=".04"/>`);
 if(name==='summit'){
  add(`<path d="M45 165V28L220 9 390 33V173Z" fill="#295C55" stroke="#7BA693" stroke-width="2"/>`);
  add(windows(67,38,10,4,30,29,'#A8C5AC'));
  add(`<path d="M20 177L170 139H500L580 182 482 215H112Z" fill="#C59B56"/><path d="M20 177H580L482 215H112Z" fill="#987445"/>`);
  for(let i=0;i<11;i++){const x=85+i*42;add(rect(x,123,24,31,'#152B2B'));add(circle(x+12,112,9,'#C6B08A'));}
  add(rect(410,35,127,70,'#123C79',`stroke="#E8D297" stroke-width="2"`));
  for(let i=0;i<12;i++){const t=i*Math.PI/6;add(circle(474+26*Math.cos(t),70+24*Math.sin(t),3.5,P.gold));}
  add(line(553,25,553,132,'#DBCAA4',3));add(rect(554,26,37,24,'#3A8CE5'));add(rect(554,50,37,24,P.gold));
 }else if(name==='storm'){
  add(rect(0,144,600,96,'#1B2C39'));
  for(let i=0;i<9;i++){const x=i*73-10,h=50+(i*37)%85;add(rect(x,160-h,58,h,'#233E4B'));add(windows(x+10,169-h,2,3,23,20,'#F4C46D'));}
  add(`<path d="M0 204L225 164H380L600 204V240H0Z" fill="#42606A"/><path d="M300 166L257 240M330 166L375 240" stroke="#B5C9C6" stroke-width="3" stroke-dasharray="14 12"/>`);
  add(`<path d="M137 98C113 82 110 37 165 31C174 9 210 15 225 34C268 17 306 38 301 66C318 108 279 128 237 124C188 135 153 124 137 98Z" fill="#EBC68E" stroke="#FFF0C9" stroke-width="3"/>`);
  add(`<path d="M140 97C187 124 254 130 298 85C286 124 201 147 153 116Z" fill="#AD7E5A"/>`);
  for(let i=0;i<5;i++)add(line(166+i*27,121,208+i*8,189,'#E6D6B7',2));
  add(`<path d="M394 65Q444 26 498 61L516 101 489 85 463 107 440 86 417 106Z" fill="#D5514C"/><path d="M461 52L466 139Q474 155 485 140" fill="none" stroke="#F4CBA4" stroke-width="4"/>`);
  for(let i=0;i<35;i++){let x=(i*71)%620,y=(i*41)%180;add(line(x,y,x-13,y+25,'#B6D3DA',2,'opacity=".55"'));}
 }else if(name==='radar'){
  add(`<path d="M0 175H600V240H0Z" fill="#10232E"/>`);
  add(rect(80,80,95,75,'#2E666C',`stroke="#83C6BF" stroke-width="2"`));
  for(let i=0;i<4;i++)add(circle(129,115,13+i*11,'none',`stroke="#50BBA4" stroke-width="1.5" opacity=".7"`));
  add(`<path d="M129 115L155 89" stroke="#E4EDB5" stroke-width="4"/><path d="M103 156L85 199H180L152 156" fill="#40747A"/>`);
  add(`<path d="M270 55L326 70 380 55 348 85 326 79 304 86Z" fill="#DDE6DB"/><path d="M323 30V91" stroke="#DDE6DB" stroke-width="5"/>`);
  add(`<path d="M393 150L435 77 477 150Z" fill="#EBC567"/><path d="M393 150L435 77 477 150" fill="none" stroke="#FFF0B9" stroke-width="2"/>`);
  add(`<path d="M435 96V121M435 131V136" stroke="#644328" stroke-width="6"/>`);
  add(line(177,114,250,86,'#6EEAC9',2,'stroke-dasharray="5 7"'));
  for(let i=0;i<5;i++)add(rect(465+i*27,126-i%2*14,22,70,'#244653'));
 }else if(name==='gaza'){
  add(circle(456,58,42,'#BD7D51','opacity=".3"'));
  add(`<path d="M45 165V48H169V92L193 111V180H45Z" fill="#BC8E67"/><path d="M173 92L126 119 160 142 121 180H202V104Z" fill="#402D29"/>`);
  add(windows(63,64,3,3,29,30,'#483A31'));
  for(let i=0;i<4;i++)add(rect(237+i*72,97-i%2*19,57,100,'#80513D'));
  add(`<path d="M0 198L60 177 85 191 130 168 171 191 213 178 260 199H600V240H0Z" fill="#37262A"/>`);
  add(`<path d="M412 149V119H495V158H545V187H379V149Z" fill="#D9D6BD"/>`);add(rect(438,126,17,46,'#C15A47'));add(rect(424,141,45,16,'#C15A47'));
  for(let i=0;i<4;i++){add(circle(280+i*26,169,6,'#251E26'));add(`<path d="M${273+i*26} 176H${287+i*26}L${292+i*26} 201H${267+i*26}Z" fill="#251E26"/>`);}
 }else if(name==='refinery'){
  add(rect(0,190,600,50,'#27232B'));
  for(let i=0;i<4;i++){const x=43+i*72;add(rect(x,112-i%2*24,56,79+i%2*24,'#92746C'));add(`<ellipse cx="${x+28}" cy="${112-i%2*24}" rx="28" ry="12" fill="#C69C79"/>`);}
  add(`<path d="M319 184V34H344V184M382 189V69H407V189M446 191V42H469V191" stroke="#CEAF8B" stroke-width="10" fill="none"/><path d="M308 89H490M310 129H485" stroke="#E8C9A0" stroke-width="6"/>`);
  for(let i=0;i<6;i++){const x=320+i*31;add(circle(x,55-i%3*14,27+i%2*9,'#29262C','opacity=".85"'));}
  add(`<path d="M336 167C305 131 354 113 342 64C389 99 365 115 393 129C398 86 429 75 418 45C484 92 476 138 445 174Z" fill="#EC7242"/><path d="M362 168Q342 139 379 117Q373 151 408 152Q400 119 434 98Q449 154 424 174Z" fill="#FFDA70"/>`);
  add(line(18,198,577,198,'#F6B75B',4));
 }else if(name==='road'){
  add(`<path d="M0 80L170 55 310 69 600 43V194H0Z" fill="#875744"/><path d="M0 195L239 86H365L600 191V240H0Z" fill="#302B31"/>`);
  add(line(300,110,300,240,'#C7B497',3,'stroke-dasharray="17 15"'));
  add(`<path d="M115 142L238 131 276 165 141 178Z" fill="#BB8262"/><ellipse cx="186" cy="141" rx="65" ry="28" transform="rotate(-9 186 141)" fill="#D6B18B"/><path d="M136 148L229 132" stroke="#9F7456" stroke-width="4"/>`);
  add(circle(149,175,13,'#201E27'));add(circle(242,162,13,'#201E27'));
  add(`<path d="M391 79L433 62 475 79V125Q433 160 391 125Z" fill="#C9AE73" stroke="#F1D9A1" stroke-width="3"/><path d="M409 99L426 116 458 83" stroke="#173C3B" stroke-width="8" fill="none"/>`);
  add(rect(484,167,86,32,'#B57C5C'));add(rect(505,158,42,17,'#6E9799'));
 }else if(name==='servers'){
  add(`<path d="M0 191L230 126H600V240H0Z" fill="#122E3B"/>`);
  for(let i=0;i<5;i++){
   const x=52+i*76;add(`<path d="M${x} 45L${x+52} 36V169L${x} 182Z" fill="#285564" stroke="#65B3B0" stroke-width="2"/><path d="M${x+52} 36L${x+66} 48V177L${x+52} 169Z" fill="#102A36"/>`);
   for(let j=0;j<6;j++){add(line(x+8,62+j*18,x+43,56+j*18,'#79B6B0',3));add(circle(x+36,56+j*18,2,P.gold));}
  }
  add(`<path d="M418 147L456 117 487 126 526 73 564 58" stroke="#65D1AE" stroke-width="8" fill="none"/><path d="M549 54L571 50 566 73" stroke="#65D1AE" stroke-width="7" fill="none"/>`);
 }else if(name==='space'){
  for(let i=0;i<47;i++)add(circle((i*109+12)%600,(i*59+11)%200,i%6===0?2:1,'#C4E3CB','opacity=".8"'));
  add(`<ellipse cx="292" cy="300" rx="341" ry="147" fill="#2E719A" stroke="#84CDE5" stroke-width="5"/><path d="M73 191L163 166 210 179 237 206 311 218 337 241H37Z" fill="#4F957D"/>`);
  add(`<g transform="translate(296 76) rotate(-12)"><rect x="-36" y="-18" width="100" height="39" rx="8" fill="#E1DBC7"/><rect x="-159" y="-41" width="108" height="76" fill="#386A9E" stroke="#D5CC9D" stroke-width="3"/><rect x="80" y="-41" width="108" height="76" fill="#386A9E" stroke="#D5CC9D" stroke-width="3"/><path d="M-149-26H-61M-149-8H-61M-149 10H-61M90-26H178M90-8H178M90 10H178" stroke="#99BBBC" stroke-width="2"/><path d="M-51 0H-36M64 0H80" stroke="#D7C6A0" stroke-width="8"/></g>`);
  add(`<path d="M128 78H178L193 98 177 119H128L110 100Z" fill="#D4D6BE"/><path d="M107 88L87 84V115L107 109" fill="#B28A54"/><path d="M200 100H230" stroke="#EDDAA1" stroke-width="2" stroke-dasharray="5 5"/>`);
 }else if(name==='court'||name==='justice'){
  add(`<path d="M54 80L200 20 347 80Z" fill="#C6AA77" stroke="#ECD6A4" stroke-width="3"/><path d="M67 85H333V96H67Z" fill="#E2C78E"/>`);
  for(let i=0;i<5;i++)add(rect(84+i*49,101,19,75,'#C6AA77'));
  add(rect(56,180,289,14,'#E2C78E'));add(rect(42,196,317,11,'#826847'));
  if(name==='court'){
   add(rect(395,67,137,97,'#BBD0BD'));add(rect(444,83,25,64,'#B3483E'));add(rect(425,102,63,24,'#B3483E'));add(line(377,175,553,175,'#80A99C',4));
  }else{
   add(line(451,39,451,184,P.gold,5));add(line(390,77,511,77,P.gold,4));
   add(`<path d="M408 78L384 125H432ZM495 78L472 125H519Z" fill="none" stroke="#E6C779" stroke-width="3"/><path d="M384 125Q408 157 432 125M472 125Q495 157 519 125" fill="#B18D52"/>`);
  }
 }else if(name==='memorial'){
  for(let i=0;i<6;i++)add(rect(21+i*65,30+i%2*7,48,155,'#244B44'));
  add(windows(31,46,13,6,24,21,'#6F8F75'));
  add(`<path d="M0 208Q170 170 343 202T600 192V240H0Z" fill="#112F2B"/>`);
  for(let i=0;i<5;i++){let x=350+i*43,y=139+(i%2)*15;add(rect(x,y,20,57,'#E8D7AD'));add(`<path d="M${x+10} ${y-5}C${x-2} ${y-14} ${x+6} ${y-33} ${x+12} ${y-39}C${x+23} ${y-24} ${x+24} ${y-12} ${x+10} ${y-5}" fill="#FFD56F"/>`);}
  for(let i=0;i<13;i++){let x=40+i*20,y=187+(i%3)*5;add(line(x,y,x+9,y+24,'#749C6E',2));add(circle(x,y,6,['#ECDFBC','#E79A82','#E9BC6C'][i%3]));}
 }else if(name==='pipeline'){
  add(`<path d="M0 111L83 43 155 107 236 27 316 101 381 57 472 122 550 66 600 104V240H0Z" fill="#487365"/><path d="M0 169L105 112 225 158 331 117 426 166 528 128 600 160V240H0Z" fill="#244D46"/>`);
  add(`<path d="M-20 186H173Q200 186 200 158V145Q200 122 230 122H410Q442 122 442 153V181H620" fill="none" stroke="#173932" stroke-width="33"/><path d="M-20 179H173Q200 179 200 151V138Q200 115 230 115H410Q442 115 442 146V174H620" fill="none" stroke="#D5AD67" stroke-width="24"/><path d="M-20 173H173Q194 173 194 145" fill="none" stroke="#F1DAA0" stroke-width="4"/>`);
  for(let i=0;i<5;i++)add(line(245+i*32,103,245+i*32,126,'#926C41',4));
  add(line(331,115,331,63,'#D9BE82',7));add(`<ellipse cx="331" cy="58" rx="29" ry="9" fill="none" stroke="#D9BE82" stroke-width="6"/>`);
 }else if(name==='wildfire'){
  add(circle(449,60,47,'#D67846','opacity=".4"'));
  for(let i=0;i<12;i++){let x=i*57-15,y=115+(i%3)*19;add(`<path d="M${x} ${y+77}V${y-15}M${x} ${y+15}L${x-22} ${y-5}M${x} ${y+38}L${x+27} ${y+6}" stroke="#302C2C" stroke-width="9"/>`);}
  add(`<path d="M0 204Q126 158 280 198T600 188V240H0Z" fill="#39292C"/>`);
  for(let i=0;i<7;i++){let x=79+i*54,y=174+(i%2)*10;add(`<path d="M${x-20} ${y}Q${x-41} ${y-21} ${x-6} ${y-47}Q${x+4} ${y-62} ${x-4} ${y-87}Q${x+52} ${y-45} ${x+22} ${y}Z" fill="${i%2?'#F2B65D':'#DC7044'}"/>`);}
  add(`<path d="M447 165L472 139 508 163V191H447Z" fill="#B98F69"/><path d="M441 165L472 133 514 164" fill="none" stroke="#E6BA83" stroke-width="7"/>`);
 }
  if(hybrid&&name==='summit'){
   add(`<path d="M176 151L237 145 259 155 196 165Z" fill="#FFF0C9"/><path d="M187 153L229 149M194 158L237 153" stroke="#69776A" stroke-width="2"/>`);
   add(`<path d="M358 151L398 141 422 151 381 161Z" fill="#B4D0C4"/><path d="M377 151L396 146" stroke="#1B5C5A" stroke-width="2"/>`);
  }
  if(hybrid&&name==='storm'){
   add(`<path d="M355 168H541V185H355Z" fill="#E5B75F" stroke="#132C3B" stroke-width="3"/><path d="M367 169L381 184M395 169L409 184M423 169L437 184M451 169L465 184M479 169L493 184M507 169L521 184" stroke="#743E32" stroke-width="9"/><path d="M370 185L360 211M525 185L535 211" stroke="#A5B7B7" stroke-width="5"/>`);
  }
  if(hybrid&&name==='radar'){
   add(`<path d="M277 112L292 107 288 122Z M310 136L329 129 319 146Z M347 102L363 99 356 112Z" fill="#EDE4CD"/><path d="M294 104L305 92M332 126L345 110" stroke="#F6C783" stroke-width="2" stroke-dasharray="4 4"/>`);
  }
  if(scenic&&name==='storm'){
   add(`<path d="M281 57L315 70 284 85Z" fill="#E1A04E" stroke="#FBE2A8" stroke-width="2"/><circle cx="255" cy="54" r="5" fill="#193C44"/><circle cx="254" cy="52" r="1.6" fill="#FFF4D7"/><path d="M160 67Q192 43 235 70Q206 101 172 92Z" fill="#B8885E" stroke="#F1D19B" stroke-width="2"/>`);
  }
  if(scenic&&name==='road'){
   add(`<path d="M408 89L432 101 456 89" fill="none" stroke="#FFF0BD" stroke-width="3"/><circle cx="416" cy="112" r="17" fill="#253B3F" stroke="#D6D9C7" stroke-width="7"/><circle cx="452" cy="112" r="17" fill="#253B3F" stroke="#D6D9C7" stroke-width="7"/><path d="M431 110H437M411 98L405 105M447 98L441 105" stroke="#FFF5D9" stroke-width="4"/>`);
  }
  if(deep)add(`<path d="M0 231H600" stroke="#F3D09B" stroke-width="2" opacity=".15"/>`);
 return a.join('');
}

put(`<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048"><defs>
<linearGradient id="blue" x2=".6" y2="1"><stop stop-color="#1E4359"/><stop offset="1" stop-color="#0E1E32"/></linearGradient>
<linearGradient id="green" x2=".7" y2="1"><stop stop-color="#175646"/><stop offset="1" stop-color="#0B3B2E"/></linearGradient>
<linearGradient id="red" x2=".6" y2="1"><stop stop-color="#8A4233"/><stop offset="1" stop-color="#5C161B"/></linearGradient>
<linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></linearGradient>
</defs>${rect(0,0,2048,2048,P.paper)}`);
put(text(32,49,'THE DAILY ATLAS',29,{weight:800}));
put(text(2016,49,'44 STORIES   /   13 PICTURES   /   7 REGIONS',23,{weight:700,anchor:'end'}));
put(line(32,66,2016,66,P.ink,5));
put(text(32,165,'Thursday 26 November 2026',100,{serif:true,weight:700,box:[32,70,1984,120],id:'date'}));
put(text(32,215,'EUROPE BARGAINS. GULF TENSIONS RISE. A STORM STILLS THANKSGIVING.',28,{weight:700,fill:P.maroon,box:[32,187,1984,35]}));
const metrics=[['€45BN','proposed Kyiv loan'],['2 ITALIANS','killed, Kuwait says'],['9 INJURED','Bangkok refinery fire'],['+12.2%','Australian Q3 capex'],['3 TONS','ISS supplies arrive'],['168','Hong Kong remembers']];
if(!alternate)metrics.forEach((m,i)=>{let x=32+i*330.666;put(line(x,235,x,291));put(text(x+15,260,m[0],32,{serif:true,weight:700,fill:i%2?P.emerald:P.maroon}));put(text(x+15,286,m[1],20,{fill:P.muted}));});
const regionW=1984/7;
Object.entries(regions).forEach(([region,color],i)=>{let x=32+i*regionW;let count=stories.filter(s=>s.region===region).length;put(rect(x,305-lift,regionW-2,32,color));put(text(x+regionW/2,328-lift,`${region.toUpperCase()} ${count}`,19,{fill:'#FFF',weight:700,anchor:'middle'}));});
put(rect(32,348-lift,1984,deep?58:49,P.navy));put(rect(32,348-lift,210,deep?58:49,P.maroon));put(text(46,(deep?383:379)-lift,'THE DAY IN UTC',23,{fill:'#FFF',weight:800}));
timeline.forEach(([time,label],i)=>{const slot=1742/timeline.length,x=258+i*slot;put(text(x,(deep?372:369)-lift,time,deep?23:21,{fill:P.gold,weight:800}));put(text(x,(deep?397:388)-lift,label,deep?19:16,{fill:'#FFF',box:[x,(deep?377:371)-lift,slot-12,deep?26:22]}));});

const cards=[];
for(let i=0;i<13;i++){
 const lead=i<3,row=lead?0:(i<8?1:2),col=lead?i:(i-3)%5;
 const w=lead?(1984-36)/3:(1984-64)/5;
 const x=32+col*(w+(lead?18:16));
 const y=(lead?416:(row===1?818:1116))-lift,h=lead?390:286,ah=lead?164:116;
 const s=stories[i]; cards.push({id:s.id,x,y,w,h,artHeight:ah});
 put(`<g data-story="${s.id}">${rect(x,y,w,h,'#FBF8F0',`stroke="${P.rule}" stroke-width="1.5"`)}`);
 put(`<svg x="${x}" y="${y}" width="${w}" height="${ah}" viewBox="0 0 600 240" preserveAspectRatio="none">${art(s.scene)}</svg>`);
 put(rect(x,y+ah-74,w,74,'url(#shade)'));
 if(hybrid)put(rect(x+8,y+ah-76,w-16,48,P.navy,`opacity=".92" data-stamp-backdrop="stamp-${s.id}"`));
 put(circle(x+24,y+24,17,regions[s.region],`stroke="#FFF3D9" stroke-width="2"`));
 put(text(x+24,y+30,s.id,19,{weight:800,fill:'#FFF',anchor:'middle'}));
  put(text(x+14,y+ah-37,scenic&&s.id===11?'168':s.stamp,44,{weight:800,fill:P.gold,box:[x+12,y+ah-83,w-24,55],id:`stamp-${s.id}`}));
  if(scenic&&s.id===11)put(text(x+112,y+ah-39,'REMEMBERED',22,{weight:800,fill:P.gold,box:[x+110,y+ah-70,w-124,40],id:'scene-note-11'}).replace('<text ','<text data-related-stamp="stamp-11" '));
 const badgeW=20+s.status.length*11;
  put(rect(x+w-badgeW-12,y+ah-28,badgeW,25,states[s.status],clarified?'stroke="#F7F3EB" stroke-width="1.5"':''));
 put(text(x+w-badgeW/2-12,y+ah-10,s.status,hybrid?19:17,{weight:800,fill:'#FFF',anchor:'middle'}));
 put(text(x+12,y+ah+(lead?25:22),`${s.region.toUpperCase()} · ${s.place.toUpperCase()}`,lead?21:17,{weight:700,fill:regions[s.region],box:[x+12,y+ah+3,w-24,26]}));
 const hs=lead?46:29,hy=y+ah+(lead?74:56),lh=lead?54:32;
 s.headline.split('|').forEach((v,k)=>put(text(x+12,hy+k*lh,v,hs,{serif:true,weight:700,box:[x+12,hy-hs,w-24,lh*2+16],id:`headline-${s.id}-${k}`})));
 const sy=y+(lead?ah+163:235),ss=lead?25:21,sl=lead?29:24;
  s.detail.split('|').forEach((v,k)=>put(text(x+12,sy+k*sl,v,ss,{weight:clarified&&!lead?600:400,box:[x+12,sy-ss-(clarified&&!lead?2:0),w-24,sl*2+7],id:`summary-${s.id}-${k}`})));
 put(text(x+12,y+h-(lead?11:(deep?6:7)),`SOURCE: ${s.outlet}`,lead?19:(deep?16.5:15),{fill:P.muted,weight:deep?600:400,box:[x+12,y+h-30,w-24,28]}));
 put('</g>');
}

put(line(32,1411-lift,2016,1411-lift,P.ink,3));
put(text(32,1436-lift,'WHERE IT HAPPENED',24,{weight:800}));
if(!upgrade){put(text(590,1436-lift,'31 MORE REPORTS FROM THURSDAY',24,{weight:800}));
put(text(2016,1440-lift,'Numbers connect every story to the map',18,{fill:P.muted,anchor:'end'}));}

// Original simplified geographic outlines; anchors use actual geographic positions.
const map={x:32,y:1455-lift,w:535,h:402+lift};
put(rect(map.x,map.y,map.w,map.h,P.ocean));
const plot={x:45,y:1480-lift,w:509,h:315+lift};
const project=(lon,lat)=>[plot.x+(lon+180)/360*plot.w,plot.y+(83-lat)/147*plot.h];
for(let lat=-40;lat<=80;lat+=40){let y=project(0,lat)[1];put(line(plot.x,y,plot.x+plot.w,y,'#325467',1,'opacity=".5"'));}
for(let lon=-120;lon<=120;lon+=60){let x=project(lon,0)[0];put(line(x,plot.y,x,plot.y+plot.h,'#325467',1,'opacity=".5"'));}
const land=[
[[-168,68],[-146,60],[-130,51],[-124,39],[-113,29],[-104,23],[-97,16],[-87,21],[-81,26],[-82,33],[-67,45],[-54,54],[-64,65],[-96,74],[-135,72]],
[[-81,12],[-68,10],[-52,4],[-36,-7],[-43,-22],[-54,-39],[-68,-55],[-75,-38],[-79,-12]],
[[-53,60],[-43,60],[-21,76],[-40,84],[-61,80]],
[[-17,36],[8,37],[32,30],[43,11],[51,10],[43,-12],[35,-25],[20,-35],[10,-26],[8,-6],[-2,4],[-16,15]],
[[-10,36],[-10,58],[3,60],[14,71],[30,70],[43,58],[63,58],[83,73],[127,73],[158,61],[179,66],[169,49],[143,45],[135,33],[121,24],[110,6],[102,1],[94,20],[79,8],[68,26],[51,29],[40,41],[28,42],[23,34],[12,43],[0,43]],
[[112,-12],[130,-10],[145,-18],[154,-28],[147,-39],[128,-34],[114,-25]],
[[166,-35],[176,-39],[179,-46],[169,-47],[166,-44]],
[[46,-13],[50,-15],[48,-25],[43,-23]],
[[130,31],[141,42],[145,44],[140,36]],
[[96,5],[107,-6],[116,-8],[122,-7],[131,-4],[137,-5],[131,-9],[115,-11],[104,-8]]
];
land.forEach(shape=>put(poly(shape.map(([lon,lat])=>project(lon,lat).join(',')).join(' '),P.land,`stroke="#8DB299" stroke-width="1.4" stroke-linejoin="round"`)));
const pins=stories.filter(s=>s.lat!==null).map(s=>{let [ax,ay]=project(s.lon,s.lat);return{id:s.id,region:s.region,ax,ay,x:ax+(s.id%3-1)*9,y:ay+(s.id%4-1.5)*9,r:s.id<=13?(alternate?16:13):(final||continued?11:10)};});
for(let k=0;k<240;k++){
 for(let i=0;i<pins.length;i++){
  const p=pins[i];
  p.x+=(p.ax-p.x)*(alternate?.012:.018);p.y+=(p.ay-p.y)*(alternate?.012:.018);
  for(let j=i+1;j<pins.length;j++){
   const q=pins[j],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||.1,min=p.r+q.r+(clarified?9:alternate?5:3);
   if(d<min){const v=(min-d)*.52;const ux=d===.1?.7:dx/d,uy=d===.1?.7:dy/d;p.x-=ux*v;p.y-=uy*v;q.x+=ux*v;q.y+=uy*v;}
  }
  p.x=Math.max(plot.x+15,Math.min(plot.x+plot.w-15,p.x));p.y=Math.max(plot.y+15,Math.min(plot.y+plot.h-15,p.y));
 }
}
pins.forEach(p=>put(line(p.ax,p.ay,p.x,p.y,'#ACC4B5',1.2,'opacity=".8"')));
pins.forEach(p=>{put(circle(p.ax,p.ay,2,'#EBD4A5'));if(clarified)put(circle(p.x,p.y,p.r+2.5,P.ocean));put(circle(p.x,p.y,p.r,p.id<=13&&alternate?P.gold:regions[p.region],`stroke="${p.id<=13?P.gold:'#E5E0C6'}" stroke-width="${p.id<=13?2:1}" data-pin="${p.id}"`));put(text(p.x,p.y+(p.id<=13?5:4),p.id,p.id<=13?(alternate?19:17):(final||continued?14:13),{weight:800,fill:p.id<=13&&alternate?P.ocean:'#FFF',anchor:'middle'}));});
put(rect(44,1811,511,33,'#173B4A'));put(text(55,1834,'8  ISS ORBIT   ·   17  GLOBAL SHIPPING',20,{weight:700,fill:'#F2D89D'}));
put(text(32,1884,'Pins are displaced for clarity; leaders mark anchors.',18,{fill:P.muted}));
put(text(32,1909,'Borders simplified. 1–13 features; 14–44 briefs.',18,{fill:P.muted}));

const briefs=stories.slice(13),cw=466,briefY=1464-lift,rowH=readable?51:final?50.5:alternate?49:44;
// Compact display paraphrases retain the complete reporting in the source ledger.
const briefCopy={
 14:'77th anniversary of its adoption.',
 15:'Tributes 18 years after the attacks.',
 16:'Gukesh–Sindarov, Geneva.',
 17:'UN: conflict and climate disrupt trade.',
 18:'UN bolsters civilian protection in Ituri.',
 19:'Nairobi meeting, Nov 26–27.',
 20:'Samarkand women’s centre profiled.',
 21:'Ends its BRICS-bank application.',
 22:'Asks Asian partners to curb tariff evasion.',
 23:'Groups seek audit of fuel incentives.',
 24:'Brazilian source: no inauguration invite.',
 25:'Final count due Friday.',
 26:'Jocelyn Turnbull wins Kidson Medal.',
 27:'Court backs trial; he denies rape.',
 28:'Woman tried on Russia spying charge.',
 29:'First winter walkout disrupts travel.',
 30:'Speaker announces Dec 27 election.',
 31:'Tech, banks rise; tariff fears ease.',
 32:'Ghana, Uganda, Zambia seen lower.',
 33:'Final LNG-law vote delayed to February.',
 34:'Hong Ihk-pyo: realism on North Korea.',
 35:'Beijing rejects South China Sea stance.',
 36:'ASEAN+3 seeks cross-border pay links.',
 37:'Diplomats back Hernández de Cos.',
 38:'FT: halt to 4 SE Asian nations.',
 39:'Tokyo: free journalist held in Russia.',
 40:'Houthi spokesman: four dead in Taiz.',
 41:'Ministry: attack kills a Nepalese worker.',
 42:'UKMTO: crew safe west of Dubai.',
 43:'AFP: aid cuts fuel armed-group recruitment.',
 44:'Beats India A by 8 wickets in Doha.'
};
const groups=[['Asia','World'],['Europe','Americas'],['Africa','Oceania','Middle East']];
const columnLabels=['ASIA + GLOBAL','EUROPE + AMERICAS','AFRICA + OCEANIA + MIDDLE EAST'];
const columns=upgrade?groups.map(group=>group.flatMap(region=>briefs.filter(s=>s.region===region))):[briefs.slice(0,11),briefs.slice(11,21),briefs.slice(21)];
columns.forEach((col,c)=>{
 const x=590+c*480;
 put(`<g data-brief-column="${c}">`);
 if(upgrade)put(text(x,1436-lift,`${columnLabels[c]} · ${col.length}`,c===2?21:22.5,{weight:800,box:[x,1411-lift,cw,31],id:`brief-column-${c}`}));
 if(c)put(line(x-13,1455-lift,x-13,1912,P.rule,1.5));
 col.forEach((s,i)=>{
  const y=briefY+i*rowH;
  put(`<g data-brief="${s.id}" data-region="${escape(s.region)}">`);
  put(rect(x,y-18,29,25,regions[s.region]));put(text(x+14.5,y+1,s.id,17,{fill:'#FFF',weight:800,anchor:'middle'}));
  const caution=s.status==='CLAIM'?' [CLAIM]':s.status==='FORECAST'?' [FORECAST]':'';
  const statusWidth=copyfit&&caution?24+s.status.length*8.5:0;
  put(text(x+38,y,s.headline,alternate?22.5:21,{weight:700,box:[x+38,y-25,cw-43-(statusWidth?statusWidth+12:0),31],id:`brief-head-${s.id}`}));
  if(statusWidth){
   put(rect(x+cw-statusWidth,y-20,statusWidth,24,states[s.status],`data-brief-status="${s.id}"`));
   put(text(x+cw-statusWidth/2,y-2,s.status,16,{weight:800,fill:'#FFF',anchor:'middle',id:`brief-status-${s.id}`}));
  }
  put(text(x+38,y+(alternate?24:21),`${copyfit?briefCopy[s.id]:s.detail}${copyfit?'':caution} — ${s.outlet}`,copyfit?21.5:readable?20:alternate?19:17,{weight:final||continued?600:400,box:[x+38,y+(copyfit?0:continued?4:alternate?6:4),cw-43,33],id:`brief-body-${s.id}`}));
  put('</g>');
 });
 put('</g>');
});
put(rect(32,1930,1984,62,'#ECE6D8',`stroke="${P.rule}" stroke-width="2"`));
put(text(45,1955,'DATE CHECK',23,{weight:800,fill:P.maroon}));
put(text(225,1954,'25 NOV: parade delay announced · Bangladesh wage rise · Shenzhou-24 launch · US tariff proposal.',21,{box:[225,1934,1775,29]}));
put(text(225,1980,'26 NOV: no parade on Thanksgiving; Cairo arrest update. 27 NOV: New Zealand final count still ahead.',21,{box:[225,1960,1775,29]}));
put(text(32,2022,'OFFICIAL = on record   ·   OFFICIALS = attributed statement   ·   REPORTED = news report   ·   FORECAST = outlook   ·   CLAIM = unverified allegation',21,{fill:P.muted,box:[32,1999,1984,30]}));
put('</svg>');
const source=svg.join('\n');
fs.writeFileSync(path.join(root,'artwork.svg'),source);
fs.writeFileSync(path.join(root,'.makefun-kit','source-ledger.json'),JSON.stringify({day,stories,timeline,notes:'No invented publication clocks. Explicit date-only sources retain day precision.'},null,2));

const browser=await chromium.launch({headless:true,executablePath:process.env.ATLAS_CHROME_PATH??path.join(process.env.LOCALAPPDATA,'ms-playwright','chromium-1194','chrome-win','chrome.exe')});
const page=await browser.newPage({viewport:{width:2048,height:2048},deviceScaleFactor:1});
let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.setContent(source);
await page.evaluate(()=>document.fonts.ready);
// Fit only within assigned text zones; preserve the intentionally larger hierarchy.
const fitted=await page.evaluate(({final,scenic})=>{
 const fitted=[];
 for(const t of document.querySelectorAll('text[data-bounds]')){
  const [x,y,w,h]=t.dataset.bounds.split(',').map(Number);const original=Number(t.getAttribute('font-size'));
  let box=t.getBBox();let size=original;
  while(box.x+box.width>x+w-.5&&size>Math.max(16,original*.76)){size-=.25;t.setAttribute('font-size',String(size));box=t.getBBox();}
  if(size!==original)fitted.push({id:t.id,text:t.textContent,from:original,to:size});
 }
   if(final)for(const backdrop of document.querySelectorAll('[data-stamp-backdrop]')){
   const stamp=document.getElementById(backdrop.dataset.stampBackdrop),b=stamp.getBBox();
   backdrop.setAttribute('x',String(b.x-8));backdrop.setAttribute('y',String(b.y-4));
    backdrop.setAttribute('width',String(b.width+16));backdrop.setAttribute('height',String(b.height+8));
   }
   if(scenic)for(const backdrop of document.querySelectorAll('[data-stamp-backdrop]')){
    const id=backdrop.dataset.stampBackdrop,stamp=document.getElementById(id),b=stamp.getBBox();
    const related=[...document.querySelectorAll(`[data-related-stamp="${id}"]`)].map(t=>t.getBBox());
    const left=Math.min(b.x,...related.map(r=>r.x)),right=Math.max(b.x+b.width,...related.map(r=>r.x+r.width));
    const originalWidth=Number(backdrop.getAttribute('width'));
    backdrop.setAttribute('x',String(left-8));backdrop.setAttribute('width',String(Math.min(originalWidth,right-left+16)));
    backdrop.setAttribute('opacity','.97');
   }
  return fitted;
},{final,scenic});
const rendered=await page.locator('svg').first().evaluate(el=>el.outerHTML);
fs.writeFileSync(path.join(root,'artwork.svg'),rendered);
const geometry=await page.evaluate(()=>{
 const failures=[];const all=Array.from(document.querySelectorAll('text')).map(t=>{const b=t.getBoundingClientRect();return{id:t.id,text:t.textContent,x:b.x,y:b.y,w:b.width,h:b.height};});
 for(const t of document.querySelectorAll('text[data-bounds]')){
  const [x,y,w,h]=t.dataset.bounds.split(',').map(Number),b=t.getBBox();
  if(b.x<x-.8||b.y<y-.8||b.x+b.width>x+w+.8||b.y+b.height>y+h+.8)failures.push({kind:'text-zone',id:t.id,text:t.textContent,bbox:[b.x,b.y,b.width,b.height],zone:[x,y,w,h]});
 }
 for(const t of all)if(t.x<-.5||t.y<-.5||t.x+t.w>2048.5||t.y+t.h>2048.5)failures.push({kind:'canvas',...t});
 const texts=Array.from(document.querySelectorAll('[data-story] text'));
 for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
  const a=texts[i],b=texts[j];if(a.closest('[data-story]')!==b.closest('[data-story]'))continue;
  const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();
  if(Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left)>1&&Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top)>1)failures.push({kind:'story-overlap',a:a.textContent,b:b.textContent});
 }
 const briefSizes=Array.from(document.querySelectorAll('[id^="brief-body-"]')).map(t=>Number(t.getAttribute('font-size')));
  const sceneOcclusion=[...document.querySelectorAll('[data-story]')].map(g=>{const scene=g.querySelector('svg'),backdrop=g.querySelector('[data-stamp-backdrop]');return{id:Number(g.dataset.story),ratio:backdrop?Number(backdrop.getAttribute('width'))*Number(backdrop.getAttribute('height'))/(Number(scene.getAttribute('width'))*Number(scene.getAttribute('height'))):0};});
  return{checkedTextNodes:all.length,failures,briefBodyFontMin:Math.min(...briefSizes),briefBodyFontMean:briefSizes.reduce((a,b)=>a+b,0)/briefSizes.length,sceneOcclusion};
});
const master=path.join(root,'.makefun-kit',`${pass}-master.png`);
await page.screenshot({path:master});
await browser.close();
const image=await sharp(master).resize(1024,1024,{kernel:'lanczos3'}).png({compressionLevel:9,palette:true,colours:256,dither:0}).toBuffer();
fs.writeFileSync(path.join(root,'entry.png'),image);
fs.writeFileSync(path.join(root,'.makefun-kit',`${pass}-entry.png`),image);
await sharp(image).resize(300,300,{kernel:'lanczos3'}).png().toFile(path.join(root,'.makefun-kit',`${pass}-300.png`));
const pinDistances=pins.flatMap((p,i)=>pins.slice(i+1).map(q=>Math.hypot(p.x-q.x,p.y-q.y)-p.r-q.r));
const audit={pass,storyCount:stories.length,featureCount:13,briefCount:briefs.length,regionCount:Object.keys(regions).length,bytes:image.length,dimensions:[1024,1024],consoleErrors:errors,fitted,...geometry,minPinGap:Math.min(...pinDistances),meanLeaderLength:pins.reduce((s,p)=>s+Math.hypot(p.x-p.ax,p.y-p.ay),0)/pins.length};
fs.writeFileSync(path.join(root,'.makefun-kit',`${pass}-audit.json`),JSON.stringify(audit,null,2));
console.log(JSON.stringify({pass,stories:stories.length,bytes:image.length,textNodes:geometry.checkedTextNodes,failures:geometry.failures.length,consoleErrors:errors.length,minPinGap:audit.minPinGap,fitted:fitted.length}));
if(geometry.failures.length||errors.length||image.length>=900000)process.exitCode=1;
