import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAYQnKL6kUse8v2iYEOynEGrq-yq1MbBHw",
  authDomain: "april-ai-challenge.firebaseapp.com",
  databaseURL: "https://april-ai-challenge-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "april-ai-challenge",
  storageBucket: "april-ai-challenge.firebasestorage.app",
  messagingSenderId: "159044613514",
  appId: "1:159044613514:web:c8f7f81c65652b95320473"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const DAYS=[{d:1,tasks:[{t:"Harvard L1: Intro to GenAI (60 min)",c:"purple",url:"https://lnkd.in/e9rWNjBE"},{t:"Read: what is a large language model?",c:"blue",url:"https://en.wikipedia.org/wiki/Large_language_model"}]},{d:2,tasks:[{t:"AI Fluency module 1 (45 min)",c:"blue",url:"https://www.aiflucency.com"},{t:"Journal: 3 things you noticed",c:"amber",url:""}]},{d:3,tasks:[{t:"Harvard L2: Prompt engineering (60 min)",c:"purple",url:"https://lnkd.in/e5nekvS2"}]},{d:4,tasks:[{t:"AI Fluency module 2 (45 min)",c:"blue",url:"https://www.aiflucency.com"},{t:"Experiment: rewrite 3 prompts better",c:"amber",url:""}]},{d:5,tasks:[{t:"Anthropic docs: prompt engineering guide",c:"teal",url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"}]},{d:6,tasks:[{t:"Deep session: re-watch L1+L2 highlights (90 min)",c:"purple",url:"https://lnkd.in/e9rWNjBE"},{t:"Journal: what clicked",c:"amber",url:""}]},{d:7,tasks:[{t:"Rest / catch-up day",c:"gray",url:""}]},{d:8,tasks:[{t:"Harvard L3: Beyond chatbots + RAG (60 min)",c:"purple",url:"https://lnkd.in/exsX5tP7"}]},{d:9,tasks:[{t:"AI Fluency module 3 (45 min)",c:"blue",url:"https://www.aiflucency.com"},{t:"Journal: how could RAG help AutoReclaim?",c:"amber",url:""}]},{d:10,tasks:[{t:"CS50x bonus: LLMs and neural nets (75 min)",c:"purple",url:"https://lnkd.in/eYg6vdCr"}]},{d:11,tasks:[{t:"AI Fluency module 4 (45 min)",c:"blue",url:"https://www.aiflucency.com"}]},{d:12,tasks:[{t:"Anthropic docs: Claude model overview",c:"teal",url:"https://docs.anthropic.com/en/docs/about-claude/models/overview"}]},{d:13,tasks:[{t:"Deep session: apply L3 concepts (90 min)",c:"amber",url:""}]},{d:14,tasks:[{t:"Rest / catch-up day",c:"gray",url:""}]},{d:15,tasks:[{t:"Harvard L4: GenAI in teaching (60 min)",c:"purple",url:"https://lnkd.in/erdwPRvu"}]},{d:16,tasks:[{t:"AI Fluency module 5 (45 min)",c:"blue",url:"https://www.aiflucency.com"},{t:"Note 3 LinkedIn post ideas",c:"amber",url:""}]},{d:17,tasks:[{t:"Harvard L5: Teaching with AI (60 min)",c:"purple",url:"https://lnkd.in/eWXskwWG"}]},{d:18,tasks:[{t:"CS50x bonus: GPT-4 how it works (75 min)",c:"purple",url:"https://lnkd.in/eeh7QXUM"}]},{d:19,tasks:[{t:"Anthropic docs: AI safety",c:"teal",url:"https://www.anthropic.com/safety"},{t:"AI Fluency module 6",c:"blue",url:"https://www.aiflucency.com"}]},{d:20,tasks:[{t:"Deep session: map AI to AutoReclaim (90 min)",c:"amber",url:""}]},{d:21,tasks:[{t:"Rest / catch-up day",c:"gray",url:""}]},{d:22,tasks:[{t:"Harvard L6: Basics of GenAI (60 min)",c:"purple",url:"https://lnkd.in/eSCJ62Bi"}]},{d:23,tasks:[{t:"CS50x bonus: prompt engineering deep dive (75 min)",c:"purple",url:"https://lnkd.in/eJH4DWQR"}]},{d:24,tasks:[{t:"CS50x bonus: LLMs and end of programming (60 min)",c:"purple",url:"https://lnkd.in/e3JbSFi7"}]},{d:25,tasks:[{t:"Anthropic research blog",c:"teal",url:"https://www.anthropic.com/research"},{t:"AI Fluency: complete remaining modules",c:"blue",url:"https://www.aiflucency.com"}]},{d:26,tasks:[{t:"Draft your first LinkedIn post",c:"amber",url:""}]},{d:27,tasks:[{t:"Full review: explain AI without notes (90 min)",c:"coral",url:""}]},{d:28,tasks:[{t:"Rest / catch-up day",c:"gray",url:""}]},{d:29,tasks:[{t:"Final reflection: 300 words on what you now know",c:"coral",url:""}]},{d:30,tasks:[{t:"Publish your first LinkedIn post!",c:"coral",url:"https://www.linkedin.com"}]}];
const TL={purple:"Harvard",blue:"AI Fluency",teal:"Anthropic",amber:"Apply",coral:"Review",gray:"Rest"};
const RD=[7,14,21,28];
const C={simon:"#4A3FA0",simonL:"#EEEDFE",simonM:"#7F77DD",nikki:"#C2436A",nikkiL:"#FBEAF0",nikkiM:"#ED93B1",bg:"#FAFAF8",card:"#fff",border:"rgba(0,0,0,0.08)",muted:"#6B6B66",subtle:"#A8A89E",text:"#1A1A18",tags:{purple:{bg:"#EEEDFE",color:"#3C3489"},blue:{bg:"#E6F1FB",color:"#185FA5"},teal:{bg:"#E1F5EE",color:"#0F6E56"},amber:{bg:"#FAEEDA",color:"#BA7517"},coral:{bg:"#FAECE7",color:"#993C1D"},gray:{bg:"#F1EFE8",color:"#444441"}}};
const DL=["","Apr 1","Apr 2","Apr 3","Apr 4","Apr 5","Apr 6","Apr 7","Apr 8","Apr 9","Apr 10","Apr 11","Apr 12","Apr 13","Apr 14","Apr 15","Apr 16","Apr 17","Apr 18","Apr 19","Apr 20","Apr 21","Apr 22","Apr 23","Apr 24","Apr 25","Apr 26","Apr 27","Apr 28","Apr 29","Apr 30"];
function streak(data){const t=new Date();const m=t.getFullYear()===2026&&t.getMonth()===3?t.getDate():30;let s=0;for(let d=m;d>=1;d--){if(data[d]&&data[d].done)s++;else break;}return s;}
function Btn({label,player,current,onClick}){const a=current===player;const col=player==="simon"?C.simon:C.nikki;return <button onClick={onClick} style={{padding:"10px 28px",borderRadius:100,border:"1.5px solid "+(a?col:C.border),background:a?col:C.card,color:a?"#fff":C.muted,fontFamily:"inherit",fontSize:14,fontWeight:500,cursor:"pointer"}}>{label}</button>;}
function Card({player,data,leading}){const col=player==="simon"?C.simon:C.nikki;const light=player==="simon"?C.simonL:C.nikkiL;const name=player==="simon"?"Simon":"Princess Nikki";const score=Object.values(data).filter(v=>v&&v.done).length;const s=streak(data);const pct=Math.round(score/30*100);return(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:16,padding:"20px 22px",position:"relative",borderTop:"3px solid "+col}}>{leading&&<span style={{position:"absolute",top:14,right:14,fontSize:9,fontWeight:700,padding:"3px 8px",borderRadius:20,background:light,color:col}}>LEADING</span>}<div style={{fontSize:13,color:C.muted,marginBottom:4}}>{name}</div><div style={{fontSize:38,fontFamily:"Georgia,serif",color:col,lineHeight:1,marginBottom:6}}>{score}<span style={{fontSize:16,color:C.subtle}}>/30</span></div><div style={{fontSize:12,color:C.muted}}>{s>0?s+" day streak"+(s>=3?" 🔥":""):"No streak yet"}</div><div style={{marginTop:10,height:4,background:C.bg,borderRadius:2,overflow:"hidden"}}><div style={{height:4,borderRadius:2,background:col,width:pct+"%",transition:"width 0.4s"}}/></div></div>);}
function Cell({d,sd,nd,isToday,onClick}){const sdone=sd&&sd.done;const ndone=nd&&nd.done;const note=(sd&&sd.note)||(nd&&nd.note);let bg=C.card,bc=C.border;if(sdone&&ndone){bg="linear-gradient(135deg,"+C.simonL+" 50%,"+C.nikkiL+" 50%)";bc=C.simonM;}else if(sdone){bg=C.simonL;bc=C.simonM;}else if(ndone){bg=C.nikkiL;bc=C.nikkiM;}return(<div onClick={onClick} style={{aspectRatio:"1",borderRadius:10,border:(isToday?"2px":"1px")+" solid "+(isToday?C.simon:bc),background:bg,cursor:"pointer",opacity:RD.includes(d)?0.6:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"4px",position:"relative"}}><div style={{fontSize:12,fontWeight:500,color:C.text}}>{d}</div><div style={{display:"flex",gap:2}}>{sdone&&<div style={{width:5,height:5,borderRadius:"50%",background:C.simon}}/>}{ndone&&<div style={{width:5,height:5,borderRadius:"50%",background:C.nikki}}/>}</div>{note&&<div style={{position:"absolute",bottom:3,right:3,width:4,height:4,borderRadius:"50%",background:"#BA7517"}}/>}</div>);}
function Detail({day,player,pd,onToggle,onNote}){const dd=DAYS.find(x=>x.d===day);const p=pd[day]||{done:false,note:""};const [note,setNote]=useState(p.note||"");const col=player==="simon"?C.simon:C.nikki;const light=player==="simon"?C.simonL:C.nikkiL;const name=player==="simon"?"Simon":"Princess Nikki";useEffect(()=>{setNote((pd[day]&&pd[day].note)||"");},[day,player,pd]);return(<div style={{background:C.card,border:"1px solid "+C.border,borderRadius:16,padding:22,marginBottom:24}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,fontFamily:"Georgia,serif",fontSize:18}}>{DL[day]}<span style={{fontFamily:"inherit",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,background:light,color:col}}>{name}</span></div><div style={{marginBottom:14}}>{dd&&dd.tasks.map((t,i)=>{const tc=C.tags[t.c];return(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:"1px solid "+C.bg,fontSize:13,color:C.text}}><span style={{fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:4,background:tc.bg,color:tc.color,flexShrink:0,marginTop:1}}>{TL[t.c]}</span>{t.url?<a href={t.url} target="_blank" rel="noreferrer" style={{color:"inherit",textDecoration:"underline",textDecorationColor:"rgba(0,0,0,0.2)",textUnderlineOffset:2}}>{t.t}</a>:<span>{t.t}</span>}</div>);})}</div><div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5}}>Your note</div><textarea value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>onNote(day,note)} placeholder="What did you learn today?" style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid "+C.border,background:C.bg,fontFamily:"inherit",fontSize:13,color:C.text,resize:"vertical",minHeight:60,marginBottom:12,outline:"none"}}/><button onClick={()=>onToggle(day)} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:p.done?"#EAF3DE":col,color:p.done?"#3B6D11":"#fff",fontFamily:"inherit",fontSize:14,fontWeight:600,cursor:"pointer"}}>{p.done?"✓ Completed — click to undo":"Mark as complete"}</button></div>);}

const S = {
  page: {background:"#0D1117",minHeight:"100vh"},
  wrap: {maxWidth:900,margin:"0 auto",padding:"0 20px 80px",fontFamily:"'IBM Plex Mono','Courier New',monospace"},
  hero: {padding:"48px 0 32px",borderBottom:"1px solid #1E2D3D",marginBottom:32,position:"relative",overflow:"hidden"},
  heroEye: {position:"absolute",top:0,right:0,width:320,height:180,background:"radial-gradient(ellipse at top right,rgba(0,212,170,0.08) 0%,transparent 70%)",pointerEvents:"none"},
  eyebrow: {fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:"#00D4AA",marginBottom:12,fontFamily:"inherit"},
  title: {fontSize:"clamp(32px,6vw,56px)",fontWeight:700,color:"#E6EDF3",lineHeight:1.05,marginBottom:8,letterSpacing:"-0.02em",fontFamily:"'IBM Plex Mono','Courier New',monospace"},
  titleAccent: {color:"#00D4AA"},
  subtitle: {fontSize:13,color:"#7D8590",letterSpacing:"0.02em"},
  switcher: {display:"flex",gap:0,marginBottom:28,border:"1px solid #1E2D3D",borderRadius:8,overflow:"hidden",width:"fit-content"},
  switchBtnBase: {padding:"10px 28px",border:"none",fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.15s",letterSpacing:"0.05em"},
  lbGrid: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28},
  lbCard: {borderRadius:8,padding:"22px 24px",position:"relative",overflow:"hidden"},
  lbEyebrow: {fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8},
  lbScore: {fontSize:52,fontWeight:700,lineHeight:1,marginBottom:6,letterSpacing:"-0.03em",fontFamily:"'IBM Plex Mono','Courier New',monospace"},
  lbSub: {fontSize:12,letterSpacing:"0.05em"},
  lbBar: {marginTop:14,height:3,borderRadius:2,overflow:"hidden"},
  nudge: {borderRadius:6,padding:"10px 16px",fontSize:12,marginBottom:20,letterSpacing:"0.03em",fontFamily:"'IBM Plex Mono','Courier New',monospace"},
  calWrap: {marginBottom:28},
  calHead: {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},
  calTitle: {fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",color:"#7D8590"},
  dow: {display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4},
  dowLabel: {textAlign:"center",fontSize:9,fontWeight:600,color:"#3D4F61",textTransform:"uppercase",letterSpacing:"0.1em",padding:"4px 0"},
  grid: {display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4},
  detailCard: {background:"#161B22",border:"1px solid #1E2D3D",borderRadius:8,padding:24,marginBottom:24},
  detailDate: {fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#7D8590",marginBottom:16},
  taskRow: {display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid #1E2D3D",fontSize:13},
  noteLabel: {fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"#3D4F61",marginBottom:6,marginTop:16},
  textarea: {width:"100%",padding:"10px 12px",borderRadius:6,border:"1px solid #1E2D3D",background:"#0D1117",fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:12,color:"#E6EDF3",resize:"vertical",minHeight:64,marginBottom:14,outline:"none"},
};
const TEAL="#00D4AA"; const PINK="#FF6B9D";
const TC={simon:{col:TEAL,bg:"#0D2420",border:"#00D4AA33",text:"#00D4AA",barBg:"#1E3A35"},nikki:{col:PINK,bg:"#2D1020",border:"#FF6B9D33",text:"#FF6B9D",barBg:"#3D1A28"}};


function PlayerBtn({label,player,current,onClick}){
  const a=current===player;
  const col=player==="simon"?TEAL:PINK;
  return <button onClick={onClick} style={{...S.switchBtnBase,background:a?col+"22":"transparent",color:a?col:"#7D8590",borderRight:player==="simon"?"1px solid #1E2D3D":"none"}}>{label}</button>;
}
function LeaderCard({player,data,leading}){
  const t=TC[player];
  const name=player==="simon"?"SIMON":"PRINCESS NIKKI";
  const score=Object.values(data).filter(v=>v&&v.done).length;
  const s=streak(data);
  const pct=Math.round(score/30*100);
  return(
    <div style={{...S.lbCard,background:t.bg,border:"1px solid "+t.border}}>
      <div style={{position:"absolute",top:0,right:0,width:120,height:120,background:"radial-gradient(circle at top right,"+t.col+"15 0%,transparent 70%)",pointerEvents:"none"}}/>
      {leading&&<div style={{position:"absolute",top:14,right:14,fontSize:9,letterSpacing:"0.15em",fontWeight:700,padding:"3px 8px",borderRadius:3,background:t.col+"22",color:t.col,border:"1px solid "+t.col+"44"}}>LEADING</div>}
      <div style={{...S.lbEyebrow,color:t.text}}>{name}</div>
      <div style={{...S.lbScore,color:t.col}}>{String(score).padStart(2,"0")}<span style={{fontSize:20,color:t.col+"66"}}>/30</span></div>
      <div style={{...S.lbSub,color:t.col+"99"}}>{s>0?s+" DAY STREAK"+(s>=3?" //FIRE//":""):"NO STREAK YET"}</div>
      <div style={{...S.lbBar,background:t.barBg}}>
        <div style={{height:3,borderRadius:2,background:t.col,width:pct+"%",transition:"width 0.5s ease",boxShadow:"0 0 8px "+t.col+"88"}}/>
      </div>
    </div>
  );
}
function DayCell({d,sd,nd,isToday,onClick}){
  const sdone=sd&&sd.done;const ndone=nd&&nd.done;const note=(sd&&sd.note)||(nd&&nd.note);
  const isRest=RD.includes(d);
  let bg="#161B22",bc="#1E2D3D",glow="none";
  if(sdone&&ndone){bg="#0D2420";bc="#00D4AA44";glow="0 0 12px #00D4AA33";}
  else if(sdone){bg="#0D2420";bc="#00D4AA33";glow="0 0 8px #00D4AA22";}
  else if(ndone){bg="#2D1020";bc="#FF6B9D33";glow="0 0 8px #FF6B9D22";}
  return(
    <div onClick={onClick} style={{aspectRatio:"1",borderRadius:6,border:(isToday?"1px solid "+(sdone?TEAL:PINK):"1px solid "+bc),background:bg,cursor:"pointer",opacity:isRest?0.4:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"4px",position:"relative",boxShadow:isToday?"0 0 0 2px "+(sdone?TEAL:PINK)+"44":glow,transition:"all 0.15s"}}>
      <div style={{fontSize:11,fontWeight:700,color:isToday?TEAL:"#7D8590",fontFamily:"'IBM Plex Mono','Courier New',monospace"}}>{String(d).padStart(2,"0")}</div>
      <div style={{display:"flex",gap:2}}>
        {sdone&&<div style={{width:4,height:4,borderRadius:"50%",background:TEAL,boxShadow:"0 0 4px "+TEAL}}/>}
        {ndone&&<div style={{width:4,height:4,borderRadius:"50%",background:PINK,boxShadow:"0 0 4px "+PINK}}/>}
      </div>
      {note&&<div style={{position:"absolute",bottom:3,right:3,width:3,height:3,borderRadius:"50%",background:"#F0A500"}}/>}
    </div>
  );
}
function Detail({day,player,pd,onToggle,onNote}){
  const dd=DAYS.find(x=>x.d===day);
  const p=pd[day]||{done:false,note:""};
  const [note,setNote]=useState(p.note||"");
  const t=TC[player];
  const name=player==="simon"?"SIMON":"PRINCESS NIKKI";
  useEffect(()=>{setNote((pd[day]&&pd[day].note)||"");},[day,player,pd]);
  const tagStyle=(c)=>{const map={purple:{bg:"#1A1A3E",col:"#7B7FFF"},blue:{bg:"#0D1F35",col:"#58A6FF"},teal:{bg:"#0D2420",col:TEAL},amber:{bg:"#2D2000",col:"#F0A500"},coral:{bg:"#2D1010",col:"#FF7B72"},gray:{bg:"#1C2128",col:"#7D8590"}};return map[c]||map.gray;};
  return(
    <div style={S.detailCard}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"#7D8590"}}>{DL[day]}</div>
        <div style={{fontSize:10,letterSpacing:"0.15em",fontWeight:700,padding:"3px 10px",borderRadius:3,background:t.bg,color:t.col,border:"1px solid "+t.border}}>{name}</div>
      </div>
      <div style={{marginBottom:4}}>
        {dd&&dd.tasks.map((task,i)=>{const ts=tagStyle(task.c);return(
          <div key={i} style={{...S.taskRow,borderBottom:i===dd.tasks.length-1?"none":"1px solid #1E2D3D"}}>
            <span style={{fontSize:9,fontWeight:700,padding:"3px 7px",borderRadius:3,background:ts.bg,color:ts.col,flexShrink:0,marginTop:2,letterSpacing:"0.1em",border:"1px solid "+ts.col+"33"}}>{TL[task.c].toUpperCase()}</span>
            {task.url?<a href={task.url} target="_blank" rel="noreferrer" style={{color:"#C9D1D9",textDecoration:"none",borderBottom:"1px solid #3D4F61",paddingBottom:1}}>{task.t}</a>:<span style={{color:"#C9D1D9"}}>{task.t}</span>}
          </div>
        );})}
      </div>
      <div style={S.noteLabel}>// YOUR NOTE</div>
      <textarea value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>onNote(day,note)} placeholder="// log your learning here..." style={S.textarea}/>
      <button onClick={()=>onToggle(day)} style={{width:"100%",padding:"12px",borderRadius:6,border:"1px solid "+(p.done?TEAL+"66":t.col+"66"),background:p.done?TEAL+"22":t.bg,color:p.done?TEAL:t.col,fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:12,fontWeight:700,cursor:"pointer",letterSpacing:"0.1em",transition:"all 0.15s",boxShadow:p.done?"0 0 12px "+TEAL+"44":"none"}}>
        {p.done?"// COMPLETED — CLICK TO UNDO":"// MARK AS COMPLETE"}
      </button>
    </div>
  );
}


export default function App(){
  const [player,setPlayer]=useState("simon");
  const [sd,setSd]=useState({});const [nd,setNd]=useState({});
  const [day,setDay]=useState(1);const [nudge,setNudge]=useState(null);
  useEffect(()=>{
    const u1=onValue(ref(db,"players/simon"),s=>setSd(s.val()||{}));
    const u2=onValue(ref(db,"players/nikki"),s=>setNd(s.val()||{}));
    return()=>{u1();u2();};
  },[]);
  useEffect(()=>{const t=new Date();if(t.getFullYear()===2026&&t.getMonth()===3)setDay(t.getDate());},[]);
  const toggle=async(d)=>{
    const data=player==="simon"?sd:nd;const cur=data[d]||{done:false,note:""};
    await update(ref(db,"players/"+player+"/"+d),{done:!cur.done,note:cur.note||""});
    const sc=Object.values(sd).filter(v=>v&&v.done).length+(!cur.done&&player==="simon"?1:0);
    const nc=Object.values(nd).filter(v=>v&&v.done).length+(!cur.done&&player==="nikki"?1:0);
    let msg="";
    if(sc===nc&&sc>0)msg="// LEVEL PEGGING — BOTH ON "+sc+" DAYS";
    else if(player==="simon"&&sc>nc)msg="// YOU'RE AHEAD SIMON — "+sc+" VS "+nc;
    else if(player==="simon"&&nc>sc)msg="// NIKKI LEADS "+nc+" VS "+sc+" — MOVE.";
    else if(player==="nikki"&&nc>sc)msg="// YOU'RE WINNING NIKKI — "+nc+" VS "+sc;
    else if(player==="nikki"&&sc>nc)msg="// SIMON LEADS "+sc+" VS "+nc+" — DON'T LET HIM.";
    if(msg){setNudge({msg,player});setTimeout(()=>setNudge(null),6000);}
  };
  const saveNote=async(d,note)=>{const data=player==="simon"?sd:nd;const cur=data[d]||{done:false,note:""};await update(ref(db,"players/"+player+"/"+d),{done:cur.done||false,note});};
  const today=new Date();const todayD=today.getFullYear()===2026&&today.getMonth()===3?today.getDate():-1;
  const sc=Object.values(sd).filter(v=>v&&v.done).length;const nc=Object.values(nd).filter(v=>v&&v.done).length;
  const t=TC[player];
  return(
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={S.wrap}>
        <div style={S.hero}>
          <div style={S.heroEye}/>
          <div style={S.eyebrow}>// APRIL 2026 · 30-DAY CHALLENGE</div>
          <div style={S.title}>APRIL<br/><span style={S.titleAccent}>AI CHALLENGE</span></div>
          <div style={S.subtitle}>SIMON vs PRINCESS NIKKI — WHO FINISHES FIRST?</div>
        </div>
        <div style={{marginBottom:28}}>
          <div style={S.switcher}>
            <PlayerBtn label="SIMON" player="simon" current={player} onClick={()=>setPlayer("simon")}/>
            <PlayerBtn label="PRINCESS NIKKI" player="nikki" current={player} onClick={()=>setPlayer("nikki")}/>
          </div>
        </div>
        <div style={S.lbGrid}>
          <LeaderCard player="simon" data={sd} leading={sc>nc}/>
          <LeaderCard player="nikki" data={nd} leading={nc>sc}/>
        </div>
        {nudge&&<div style={{...S.nudge,background:nudge.player==="simon"?TEAL+"11":PINK+"11",color:nudge.player==="simon"?TEAL:PINK,border:"1px solid "+(nudge.player==="simon"?TEAL+"33":PINK+"33")}}>{nudge.msg}</div>}
        <div style={S.calWrap}>
          <div style={S.calHead}>
            <div style={S.calTitle}>// APRIL 2026</div>
            <div style={{display:"flex",gap:16}}>
              {[["simon",TEAL,"SIMON"],["nikki",PINK,"NIKKI"]].map(([p,col,l])=>(
                <div key={p} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#7D8590",letterSpacing:"0.1em"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:col,boxShadow:"0 0 4px "+col}}/>{l}
                </div>
              ))}
            </div>
          </div>
          <div style={S.dow}>{["WED","THU","FRI","SAT","SUN","MON","TUE"].map(d=>(<div key={d} style={S.dowLabel}>{d}</div>))}</div>
          <div style={S.grid}>{Array.from({length:30},(_,i)=>i+1).map(d=>(<Cell key={d} d={d} sd={sd[d]} nd={nd[d]} isToday={d===todayD} onClick={()=>setDay(d)}/>))}</div>
        </div>
        <Detail day={day} player={player} pd={player==="simon"?sd:nd} onToggle={toggle} onNote={saveNote}/>
        <div style={{background:"#161B22",border:"1px solid #1E2D3D",borderRadius:8,padding:"20px 24px"}}>
          <div style={{fontSize:10,letterSpacing:"0.2em",color:TEAL,marginBottom:14}}>// HOW TO USE</div>
          {["Both of you open the URL and bookmark it — works on any device.","Select your name at the top before marking days complete.","Leaderboard syncs in real time via Firebase — no refresh needed.","Click any day to see tasks, mark complete, and log your notes.","3+ day streaks glow. Don't break the chain."].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:12,fontSize:12,color:"#7D8590",padding:"5px 0",lineHeight:1.6}}>
              <span style={{color:TEAL,flexShrink:0,fontWeight:700}}>{String(i+1).padStart(2,"0")}.</span>{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
