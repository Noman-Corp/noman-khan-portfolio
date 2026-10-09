// ---- Edit these two lines, then redeploy. Leave '' to hide the button. ----
const LINKS={linkedin:'https://www.linkedin.com/in/noman-khan-b90914289',github:'https://github.com/Noman-Corp'};

const PROJECTS=[
 {k:'cv ml',type:'Master\'s project',t:'Facial Biometrics System',d:'Face verification (1:1) and identification (1:N) built on face embeddings, with tracked evaluation.',tags:['Python','FaceNet','MTCNN','OpenCV','MLflow'],more:['Face detection and alignment, then embedding extraction with FaceNet.','Verification and identification modes evaluated with distance thresholds.','Experiments logged and compared with MLflow.']},
 {k:'cv ml',type:'Research paper',t:'SolarAI: Solar-Panel Defect Detection',d:'CNN-based detection of defects in solar panels, co-authored and published in my final bachelor year.',tags:['CNN','Deep Learning','Python','Image Classification'],more:['Trained a convolutional neural network to separate defective from healthy panels.','Written and published with colleagues on ResearchGate.','Motivation: catch faults early to keep solar output high.']},
 {k:'cv',type:'Computer vision',t:'Feature Extraction & Image Analysis',d:'Image features, matching and geometry with practical Python pipelines.',tags:['OpenCV','SIFT','BFMatcher','NumPy'],more:['Keypoint detection and descriptor matching with SIFT.','Brute-force matching and filtering of good matches.','Geometric relationships between image pairs.']},
 {k:'ml',type:'Machine learning',t:'Face Recognition Experiments',d:'Embeddings, distance thresholds, KNN and clustering to understand recognition performance.',tags:['Scikit-learn','KNN','K-Means','Embeddings'],more:['Compared classification and clustering on face embeddings.','Studied how thresholds trade false accepts against false rejects.']},
 {k:'ml cv',type:'Deep learning',t:'Metric Learning for Faces',d:'Triplet Loss, SphereFace, CosFace and ArcFace: how embeddings become more discriminative.',tags:['Triplet Loss','ArcFace','CosFace','Deep Learning'],more:['Explored margin-based losses that tighten identity clusters.','Compared loss functions on embedding quality.']},
 {k:'sw',type:'Software & data',t:'Python Data Pipelines',d:'Data retrieval, processing, databases and visualization from my Python specialization and capstone.',tags:['Python','SQL','Pandas','Matplotlib','APIs'],more:['University of Michigan "Python for Everybody" (5 courses, 2023).','Web data access, SQLite databases and a data-visualization capstone.','Certificate verifiable on Coursera.']}
];
const SKILLS=[
 {g:'ai',t:'AI & Machine Learning',i:['Machine Learning','Deep Learning','CNNs','Neural Networks','Metric Learning','Model Evaluation','Scikit-learn','PyTorch / TensorFlow','Data Science']},
 {g:'cv',t:'Computer Vision & Biometrics',i:['OpenCV','Face Recognition','FaceNet','MTCNN','SIFT','Image Processing','Feature Extraction','Defect Detection']},
 {g:'dev',t:'Software Development',i:['Python','Flask','JavaScript','HTML / CSS','SQL','REST APIs','Git / GitHub','Software Design']},
 {g:'dev ai',t:'Data & Tools',i:['Pandas','NumPy','Matplotlib','Jupyter','MLflow','Conda','Databases']},
 {g:'soft',t:'Working Style',i:['Client communication','Teamwork','Time management','Meeting deadlines','Attention to detail','Reliability','Quick adaptability','Digital skills','English C1']}
];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

// progress + mobile menu + theme
addEventListener('scroll',()=>{$('#progress').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'});
$('#burger').onclick=()=>$('#nav').classList.toggle('open');$$('nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
const root=document.documentElement,saved=localStorage.getItem('theme');
if(saved)root.dataset.theme=saved;else if(matchMedia('(prefers-color-scheme:dark)').matches)root.dataset.theme='dark';
$('#theme').onclick=()=>{const d=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=d;localStorage.setItem('theme',d)};

// typing roles
const ROLES={en:['sees.','learns.','solves problems.','lasts.','ships.'],fr:['voient.','apprennent.','résolvent des problèmes.','durent.','fonctionnent.']};let roles=ROLES.en,ri=0,ci=0,del=false;
(function type(){const w=roles[ri],el=$('#typed');el.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(type,1500)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(type,del?40:85)})();

// face scan: auto-show once, tag changes
const scan=$('#scan');setTimeout(()=>scan.classList.add('on'),1500);setTimeout(()=>scan.classList.remove('on'),4200);
scan.addEventListener('click',()=>scan.classList.toggle('on'));
const tags=['face detected · 99.8%','identity: Noman Khan','match: open to opportunities'];let n=0;
scan.addEventListener('mouseenter',()=>{$('#tag').textContent=tags[n++%tags.length]});

// projects
$('#pgrid').innerHTML=PROJECTS.map((p,i)=>`<button class="card" data-k="${p.k}" data-i="${i}"><span class="kind">${p.type}</span><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div></button>`).join('');
$$('.card').forEach(c=>c.onclick=()=>{const p=PROJECTS[c.dataset.i];
 $('#dbody').innerHTML=`<span class="kind">${p.type}</span><h3>${p.t}</h3><p>${p.d}</p><ul>${p.more.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div>`;$('#dlg').showModal()});
$('#close').onclick=()=>$('#dlg').close();$('#dlg').onclick=e=>{if(e.target.id==='dlg')e.target.close()};
function filt(box,items,attr){$(box).onclick=e=>{const b=e.target.closest('button');if(!b)return;$$(box+' button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 $$(items).forEach(el=>el.hidden=!(b.dataset.f==='all'||el.dataset[attr].split(' ').includes(b.dataset.f)))}}
filt('#pfilter','.card','k');

// skills
$('#sgrid').innerHTML=SKILLS.map(s=>`<div class="sk" data-g="${s.g}"><h3>${s.t}</h3><div class="tags">${s.i.map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('');
filt('#sfilter','.sk','g');

// contact
$('#copy').onclick=async e=>{try{await navigator.clipboard.writeText('noman.khan.job@gmail.com');e.target.textContent=lang==='fr'?'Copié ✓':'Copied ✓'}catch{e.target.textContent='noman.khan.job@gmail.com'}setTimeout(()=>e.target.textContent=e.target.dataset.en,2200)};
[['li','linkedin'],['gh','github']].forEach(([id,k])=>{if(LINKS[k]){const a=$('#'+id);a.href=LINKS[k];a.target='_blank';a.rel='noopener';a.hidden=false}});

// EN / FR toggle
var lang=localStorage.getItem('lang')||((navigator.language||'').startsWith('fr')?'fr':'en');
function setLang(l){lang=l;localStorage.setItem('lang',l);document.documentElement.lang=l;roles=ROLES[l];ri=0;ci=0;del=false;
 $$('[data-fr]').forEach(el=>{if(!el.dataset.en)el.dataset.en=el.innerHTML;el.innerHTML=l==='fr'?el.dataset.fr:el.dataset.en});$('#lang').textContent=l==='fr'?'EN':'FR'}
$('#lang').onclick=()=>setLang(lang==='fr'?'en':'fr');setLang(lang);
