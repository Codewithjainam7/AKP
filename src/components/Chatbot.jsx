import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Cpu } from 'lucide-react';

/* ─── KNOWLEDGE ─── */
const PAT = ['Deep learning apparatus for SST prediction','Underwater pollution detection using CNNs','Cognitive state analysis via AI acoustics','Automated crop yield mapping from drone imagery','Real-time network security monitoring AI'];
const PUBS = [
  {t:'ML Based Sea Surface Temperature Prediction',j:'IJMS (CSIR)',y:'2024'},
  {t:'Underwater Image Enhancement using Fusion',j:'Dogo Rangsang',y:'2023'},
  {t:'Parrot Species ID Using CNN & SVM',j:'IREJ',y:'2023'},
  {t:'Polarimetric SAR Denoising using SOFM',j:'IREJ',y:'2023'},
  {t:'SST via EDA & Exponential Smoothening',j:'IREJ',y:'2023'},
  {t:'Marine Species Segregation (Deep Learning)',j:'IJRAR',y:'2024'},
  {t:'T20 Cricket Score Prediction (ML)',j:'IREJ',y:'2023'},
];

/* ─── GROQ AI CONFIG ─── */
const GROQ_KEY = import.meta.env.VITE_GROQ_KEY;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant';
const SYSTEM_PROMPT = `You are an AI assistant on Amit Kumar Pandey's portfolio website. Your primary knowledge is about Amit, but you should be helpful and smart.

RULES:
1. If the user types just "about", "tell me about yourself", "who are you", or any generic intro question — ALWAYS respond with Amit's full introduction (name, role, college, key stats like patents and publications).
2. If a question is about Amit, his work, research, teaching, education, skills, patents, publications, or anything related to him — answer it fully and accurately using the data below.
3. If a question is about AI, ML, Deep Learning, Computer Vision, or any topic Amit works in — answer it AND connect it back to Amit's expertise when relevant.
4. If a question mentions another person (like "who is X?") — say you're specifically designed to help with info about Amit, but do it politely.
5. ONLY refuse questions that are completely unrelated to Amit AND unrelated to his field (like cooking recipes, celebrity gossip, etc). For these, politely redirect.
6. For greetings (hi, hello, etc) — greet warmly and introduce yourself as Amit's assistant.

Keep responses concise for simple questions (3-5 lines). But when the user asks for detailed info or says "tell me everything", give a complete and thorough answer — don't cut short. End responses with a relevant follow-up suggestion when natural.

AMIT'S COMPLETE DATA:

Here is everything about Amit:

NAME: Amit Kumar Pandey
ROLE: Assistant Professor, Department of AI & ML, Thakur College of Science & Commerce, Mumbai, India
PERIOD: 2024 – Present
COURSES TAUGHT: Artificial Intelligence, Machine Learning (ML), Deep Learning (DL)

EDUCATION:
- M.Sc Information Technology, Mumbai University (Thakur College), 2022-2024
- B.Sc Information Technology, Mumbai University (Thakur College), 2014-2017

SKILLS: Artificial Intelligence, Machine Learning, Deep Learning, CNN, SVM, LSTM, Data Science, Image Processing, Python, TensorFlow, Keras, Computer Vision, NLP, SAR Analysis

PATENTS (7+ filed, all Granted):
1. Deep learning apparatus for SST prediction
2. Underwater pollution detection method using CNNs
3. Cognitive state analysis via AI generated acoustics
4. Automated crop yield mapping from drone imagery
5. Real-time network security monitoring AI
Plus 7+ Software Copyrights registered.

RESEARCH PUBLICATIONS (16+ international):
1. "ML Algorithm Based Sea Surface Temperature Prediction Model" - IJMS (CSIR-NISCPR), 2024
2. "Image Enhancement of Underwater Images using Fusion" - Dogo Rangsang Research Journal, 2023
3. "Identification of Parrot Species Using CNN and SVM Models" - IREJ, 2023 (CNN achieved 95% accuracy)
4. "Polarimetric SAR Data Denoising using SOFM" - IREJ, 2023
5. "Sea Surface Temperature Prediction by Using EDA and Exponential Smoothening" - IREJ, 2023
6. "Segregation of Marine Species using Deep Learning Techniques" - IJRAR, 2024
7. "T20 Cricket Score Prediction Using Machine Learning" - IREJ, 2023

CONTACT: amitpandey8089@gmail.com | +91 83698 31270 | Mumbai, India

MISSION: Bridging the gap between cutting-edge Machine Learning research and scalable practical solutions.`;

/* ─── LOCAL HELP COMMAND ─── */
function helpLines() {
  return [
    {c:'comment',t:'// Available commands:'},
    {c:'key',t:'help'},        {c:'txt',t:'  → Show this menu'},
    {c:'key',t:'clear / cls'}, {c:'txt',t:'  → Clear terminal'},
    {c:'key',t:'exit'},        {c:'txt',t:'  → Close terminal'},
    {c:'key',t:'reboot'},      {c:'txt',t:'  → Restart system'},
    {c:'comment',t:'// Or just ask anything naturally:'},
    {c:'str',t:'  "What are his patents?"'},
    {c:'str',t:'  "Where does he teach?"'},
    {c:'str',t:'  "Tell me about his CNN research"'},
  ];
}

/* ─── AI CALL ─── */
async function askGroq(userMsg, chatHistory) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...chatHistory.slice(-10),
    { role: 'user', content: userMsg },
  ];
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.7, max_tokens: 1500 }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

/* ─── COLOR MAP (VS Code theme) ─── */
const colorMap = {
  head: 'text-[#C586C0] font-bold text-base sm:text-lg',
  key:  'text-[#569CD6]',
  str:  'text-[#CE9178]',
  num:  'text-[#B5CEA8]',
  type: 'text-[#4EC9B0]',
  comment:'text-[#6A9955] italic',
  txt:  'text-[#D4D4D4]',
  ok:   'text-[#4EC9B0] font-bold',
  err:  'text-[#F44747]',
};

/* ─── BOOT ─── */
const BOOT = [
  {t:"[BIOS] CPU: Neural Octa-Core ............... OK", d:80},
  {t:"[BIOS] RAM: 32GB DDR5 ...................... LOADED", d:100},
  {t:"[KERNEL] RESEARCH_OS_X ..................... OK", d:150},
  {t:"[DB] Patents (7+ entries) .................. SYNCED", d:150},
  {t:"[DB] Publications (16+ entries) ............ SYNCED", d:150},
  {t:"[DB] Skills & Timeline ..................... LOADED", d:120},
  {t:"[SEC] AES-256 .............................. ACTIVE", d:100},
  {t:"[NET] Groq AI Engine ....................... CONNECTED", d:80},
];
const ASCII = `    _    __  __ ___ _____ 
   / \\  |  \\/  |_ _|_   _|
  / _ \\ | |\\/| || |  | |  
 / ___ \\| |  | || |  | |  
/_/   \\_\\_|  |_|___| |_|  
  Research Core v2.0 · AI`;

/* ─── INLINE BOLD RENDERER ─── */
function renderInlineBold(text) {
  if (!text) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="text-[#CE9178] font-semibold">{part.slice(2, -2)}</span>;
    }
    return part;
  });
}

/* ─── COMPONENT ─── */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [bootProg, setBootProg] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [chatMemory, setChatMemory] = useState([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(false);

  useEffect(() => { if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [history, isThinking]);
  useEffect(() => { if(!isBooting && !isThinking && isOpen && inputRef.current) inputRef.current.focus(); }, [isBooting, isThinking, isOpen]);

  const boot = useCallback(async () => {
    abortRef.current = false; setIsBooting(true); setHistory([]); setBootProg(0);
    setHistory([{type:'ascii', text:ASCII}]);
    await new Promise(r=>setTimeout(r,300));
    for(let i=0;i<BOOT.length;i++){
      if(abortRef.current) break;
      await new Promise(r=>setTimeout(r,BOOT[i].d));
      setHistory(p=>[...p,{type:'sys',text:BOOT[i].t}]);
      setBootProg(Math.round(((i+1)/BOOT.length)*100));
    }
    await new Promise(r=>setTimeout(r,400));
    setHistory(p=>[...p, {type:'bot',lines:[
      {c:'comment',t:'// System online. AI engine ready.'},
      {c:'txt',t:''},
      {c:'txt',t:'Welcome! I\'m Amit\'s AI assistant. Try asking:'},
      {c:'str',t:'  "Tell me about Amit"'},
      {c:'str',t:'  "What are his patents?"'},
      {c:'str',t:'  "What does he teach?"'},
      {c:'txt',t:''},
      {c:'comment',t:"// Type 'help' for terminal commands."},
    ]}]);
    setIsBooting(false); setHasBooted(true);
  }, []);

  const open = () => { setIsOpen(true); if(!hasBooted) setTimeout(boot,200); };
  const close = () => { abortRef.current=true; setIsOpen(false); };

  const exec = async () => {
    if(!input.trim()||isBooting||isThinking) return;
    const cmd = input.trim();
    setHistory(p=>[...p,{type:'user',text:cmd}]); setInput("");
    const lo = cmd.toLowerCase();

    // Local commands
    if(lo==='help'||lo==='?'){ setHistory(p=>[...p,{type:'bot',lines:helpLines()}]); return; }
    if(lo==='clear'||lo==='cls'){
      setHistory([
        {type:'ascii', text:ASCII},
        {type:'bot',lines:[
          {c:'comment',t:'// Terminal cleared. Ready for new queries.'},
          {c:'txt',t:''},
          {c:'txt',t:'Ask anything about Amit, or type \'help\' for commands.'},
        ]}
      ]);
      setChatMemory([]); return;
    }
    if(lo==='exit'||lo==='quit'){ close(); return; }
    if(lo==='reboot'){ setHasBooted(false); setChatMemory([]); boot(); return; }

    // AI response
    setIsThinking(true);
    try {
      const aiReply = await askGroq(cmd, chatMemory);
      setChatMemory(prev => [...prev, {role:'user',content:cmd}, {role:'assistant',content:aiReply}]);
      const lines = aiReply.split('\n').map(line => {
        const trimmed = line.trim();
        if(!trimmed) return {c:'txt', t:''};
        // Heading: line is all bold like **Key Features:**
        if(/^\*\*[^*]+\*\*:?$/.test(trimmed)) return {c:'head', t:trimmed.replace(/\*\*/g,'')};
        // Key-Value: **Label:** rest of text
        if(/^\*\*[^*]+:\*\*/.test(trimmed)) {
          const match = trimmed.match(/^\*\*([^*]+):\*\*\s*(.*)/);
          if(match) return {c:'kv', k:match[1]+':', v:match[2]};
        }
        // Numbered list: 1. **Bold text:** description
        if(/^\d+\.\s/.test(trimmed)) return {c:'list', t:trimmed};
        // Bullet list
        if(trimmed.startsWith('- ') || trimmed.startsWith('• ')) return {c:'bullet', t:trimmed};
        // Follow-up suggestion (usually last line with ?)
        if(trimmed.includes('?') && trimmed.length < 120) return {c:'suggest', t:trimmed};
        return {c:'txt', t:trimmed};
      });
      setHistory(p=>[...p,{type:'bot',lines}]);
    } catch(err) {
      setHistory(p=>[...p,{type:'bot',lines:[{c:'err',t:`Error: ${err.message}`},{c:'comment',t:'// Check network connection and try again.'}]}]);
    }
    setIsThinking(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999]">
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={open}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1E1E1E] text-[#569CD6] flex items-center justify-center shadow-[0_0_30px_rgba(86,156,214,0.25)] border border-[#569CD6]/30 relative" aria-label="Open Terminal">
          <Terminal className="w-7 h-7 sm:w-8 sm:h-8"/>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4EC9B0] rounded-full border-2 border-[#1E1E1E] animate-pulse"/>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{clipPath:'circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))'}}
            animate={{clipPath:'circle(150% at calc(100% - 2.5rem) calc(100% - 2.5rem))'}}
            exit={{clipPath:'circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))'}}
            transition={{duration:0.5,ease:[0.4,0,0.2,1]}}
            className="fixed inset-0 z-[1000] bg-[#1E1E1E] flex flex-col font-mono"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#333] bg-[#252526] shrink-0">
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex gap-1.5">
                  <button onClick={close} className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-label="Close"/>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"/>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"/>
                </div>
                <div className="flex items-center gap-2 text-[#808080] text-xs sm:text-sm tracking-[0.15em] uppercase">
                  <Cpu size={14} className="text-[#569CD6]"/>
                  <span className="hidden sm:inline">AMIT — RESEARCH TERMINAL</span>
                  <span className="sm:hidden">TERMINAL</span>
                </div>
              </div>
              {isBooting && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#FFBD2E] font-bold">{bootProg}%</span>
                  <div className="w-16 sm:w-28 h-1.5 bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-[#569CD6] rounded-full transition-all duration-200" style={{width:`${bootProg}%`}}/>
                  </div>
                </div>
              )}
              <button onClick={close} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#333] hover:bg-[#FF5F56]/20 text-[#808080] hover:text-[#FF5F56] transition-all text-xs font-medium">
                <X size={14}/>
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Body */}
            <div ref={scrollRef} data-lenis-prevent className="chatbot-scroll flex-1 px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto text-sm sm:text-base leading-relaxed"
              onClick={()=>!isBooting&&inputRef.current?.focus()}>
              <div className="max-w-4xl mx-auto space-y-1">
                {history.map((h,i)=>(
                  <motion.div key={i} initial={{opacity:0,x:-4}} animate={{opacity:1,x:0}} transition={{duration:0.08}}>
                    {h.type==='ascii'?(
                      <pre className="text-[#569CD6] text-xs sm:text-sm leading-tight font-bold py-2 overflow-x-auto">{h.text}</pre>
                    ):h.type==='sys'?(
                      <div className="text-[#808080] text-xs sm:text-sm py-0.5">{h.text}</div>
                    ):h.type==='user'?(
                      <div className="flex gap-2 py-3 text-sm sm:text-base">
                        <span className="text-[#4EC9B0] shrink-0">amit@core:~$</span>
                        <span className="text-[#DCDCAA] font-bold">{h.text}</span>
                      </div>
                    ):h.type==='bot'?(
                      <div className="py-3 pl-3 sm:pl-4 border-l-2 border-[#569CD6]/30 ml-1 space-y-1.5">
                        {h.lines.map((l,j)=>(
                          <div key={j}>
                            {l.t===''||l.t===undefined&&!l.k?<div className="h-2"/>:
                            l.c==='head'?(
                              <div className="text-[#C586C0] font-bold text-base sm:text-lg mt-2 mb-1">{l.t}</div>
                            ):l.c==='kv'?(
                              <div className="flex gap-1 flex-wrap text-sm sm:text-base">
                                <span className="text-[#569CD6] font-semibold">{l.k}</span>
                                <span className="text-[#D4D4D4]">{renderInlineBold(l.v)}</span>
                              </div>
                            ):l.c==='list'?(
                              <div className="text-[#D4D4D4] text-sm sm:text-base pl-2 py-0.5">{renderInlineBold(l.t)}</div>
                            ):l.c==='bullet'?(
                              <div className="flex gap-2 text-sm sm:text-base pl-2">
                                <span className="text-[#4EC9B0]">▹</span>
                                <span className="text-[#D4D4D4]">{renderInlineBold(l.t.replace(/^[-•]\s/,''))}</span>
                              </div>
                            ):l.c==='suggest'?(
                              <div className="text-[#6A9955] italic text-sm sm:text-base mt-2 pt-2 border-t border-[#333]">{l.t}</div>
                            ):(
                              <div className="text-[#D4D4D4] text-sm sm:text-base">{renderInlineBold(l.t)}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ):null}
                  </motion.div>
                ))}

                {/* AI Thinking indicator */}
                {isThinking && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex gap-2 py-3 items-center">
                    <span className="text-[#569CD6] shrink-0 text-sm sm:text-base">amit@core:~$</span>
                    <span className="text-[#808080] text-sm sm:text-base flex items-center gap-1">
                      processing
                      <motion.span animate={{opacity:[0.2,1,0.2]}} transition={{repeat:Infinity,duration:1.2}}>▊</motion.span>
                    </span>
                  </motion.div>
                )}

                {!isBooting && !isThinking && (
                  <div className="flex gap-2 pt-4 items-center">
                    <span className="text-[#4EC9B0] shrink-0 text-sm sm:text-base">amit@core:~$</span>
                    <input ref={inputRef} type="text" value={input} onChange={e=>setInput(e.target.value)}
                      onKeyDown={e=>e.key==='Enter'&&exec()}
                      placeholder="Ask anything about Amit..."
                      className="flex-1 bg-transparent border-none outline-none text-[#DCDCAA] font-bold text-sm sm:text-base caret-[#DCDCAA] placeholder:text-[#555] placeholder:font-normal"
                      autoFocus autoComplete="off" spellCheck="false"/>
                  </div>
                )}
                <div className="h-20"/>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#007ACC] px-4 sm:px-8 py-2 flex items-center justify-between text-[10px] sm:text-xs text-white/80 font-medium shrink-0">
              <div className="flex items-center gap-3 sm:gap-5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block animate-pulse"/>main</span>
                <span className="hidden sm:inline">UTF-8</span>
                <span>LF</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                <span className="hidden sm:inline">Research_OS</span>
                <span>Ln 1, Col 1</span>
                <span className="hidden sm:inline">Spaces: 2</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
