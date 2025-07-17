import React, { useState, useEffect, useRef } from 'react';
// import { Helmet } from 'react-helmet';
import './App.css';

import Header from './components/Header';
import Section from './components/Section';
import TimestampDisplay from './components/TimestampDisplay';
import TimestampToHuman from './components/TimestampToHuman';
import HumanToTimestamp from './components/HumanToTimestamp';
import CodeExamples from './components/CodeExamples';
import Intro from './components/Intro';

// Google Analytics 类型声明
declare global {
  interface Window {
    dataLayer: any;
    gtag: (...args: any[]) => void;
  }
}

const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
];

const codeExamples = [
  {
    lang: 'JavaScript',
    getNow: `// 获取当前 Unix 时间戳（秒）\nconst ts = Math.floor(Date.now() / 1000);`,
    tsToDate: `// Unix 时间戳转日期\nconst date = new Date(1752651600 * 1000);`,
    dateToTs: `// 日期转 Unix 时间戳（秒）\nconst ts = Math.floor(new Date('2025-07-16T15:40:00').getTime() / 1000);`,
    getNowEn: `// Get current Unix timestamp (seconds)\nconst ts = Math.floor(Date.now() / 1000);`,
    tsToDateEn: `// Unix timestamp to date\nconst date = new Date(1752651600 * 1000);`,
    dateToTsEn: `// Date to Unix timestamp (seconds)\nconst ts = Math.floor(new Date('2025-07-16T15:40:00').getTime() / 1000);`,
  },
  {
    lang: 'Python',
    getNow: `# 获取当前 Unix 时间戳（秒）\nimport time\nts = int(time.time())`,
    tsToDate: `# Unix 时间戳转日期\ntime_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(1752651600))`,
    dateToTs: `# 日期转 Unix 时间戳（秒）\nimport time\nts = int(time.mktime(time.strptime('2025-07-16 15:40:00', '%Y-%m-%d %H:%M:%S')))`,
    getNowEn: `# Get current Unix timestamp (seconds)\nimport time\nts = int(time.time())`,
    tsToDateEn: `# Unix timestamp to date\ntime_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(1752651600))`,
    dateToTsEn: `# Date to Unix timestamp (seconds)\nimport time\nts = int(time.mktime(time.strptime('2025-07-16 15:40:00', '%Y-%m-%d %H:%M:%S')))`,
  },
  {
    lang: 'PHP',
    getNow: `// 获取当前 Unix 时间戳（秒）\n$ts = time();`,
    tsToDate: `// Unix 时间戳转日期\n$date = date('Y-m-d H:i:s', 1752651600);`,
    dateToTs: `// 日期转 Unix 时间戳（秒）\n$ts = strtotime('2025-07-16 15:40:00');`,
    getNowEn: `// Get current Unix timestamp (seconds)\n$ts = time();`,
    tsToDateEn: `// Unix timestamp to date\n$date = date('Y-m-d H:i:s', 1752651600);`,
    dateToTsEn: `// Date to Unix timestamp (seconds)\n$ts = strtotime('2025-07-16 15:40:00');`,
  },
  {
    lang: 'MySQL',
    getNow: `-- 获取当前 Unix 时间戳（秒）\nSELECT UNIX_TIMESTAMP();`,
    tsToDate: `-- Unix 时间戳转日期\nSELECT FROM_UNIXTIME(1752651600);`,
    dateToTs: `-- 日期转 Unix 时间戳（秒）\nSELECT UNIX_TIMESTAMP('2025-07-16 15:40:00');`,
    getNowEn: `-- Get current Unix timestamp (seconds)\nSELECT UNIX_TIMESTAMP();`,
    tsToDateEn: `-- Unix timestamp to date\nSELECT FROM_UNIXTIME(1752651600);`,
    dateToTsEn: `-- Date to Unix timestamp (seconds)\nSELECT UNIX_TIMESTAMP('2025-07-16 15:40:00');`,
  },
  {
    lang: 'Java',
    getNow: `// 获取当前 Unix 时间戳（秒）\nlong ts = System.currentTimeMillis() / 1000;`,
    tsToDate: `// Unix 时间戳转日期\nDate date = new Date(1752651600L * 1000);`,
    dateToTs: `// 日期转 Unix 时间戳（秒）\nlong ts = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2025-07-16 15:40:00").getTime() / 1000;`,
    getNowEn: `// Get current Unix timestamp (seconds)\nlong ts = System.currentTimeMillis() / 1000;`,
    tsToDateEn: `// Unix timestamp to date\nDate date = new Date(1752651600L * 1000);`,
    dateToTsEn: `// Date to Unix timestamp (seconds)\nlong ts = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2025-07-16 15:40:00").getTime() / 1000;`,
  },
  {
    lang: 'Ruby',
    getNow: `# 获取当前 Unix 时间戳（秒）\nts = Time.now.to_i`,
    tsToDate: `# Unix 时间戳转日期\ndate = Time.at(1752651600)`,
    dateToTs: `# 日期转 Unix 时间戳（秒）\nts = Time.local(2025, 7, 16, 15, 40, 0).to_i`,
    getNowEn: `# Get current Unix timestamp (seconds)\nts = Time.now.to_i`,
    tsToDateEn: `# Unix timestamp to date\ndate = Time.at(1752651600)`,
    dateToTsEn: `# Date to Unix timestamp (seconds)\nts = Time.local(2025, 7, 16, 15, 40, 0).to_i`,
  },
  {
    lang: 'Go',
    getNow: `// 获取当前 Unix 时间戳（秒）\nts := time.Now().Unix()`,
    tsToDate: `// Unix 时间戳转日期\ndate := time.Unix(1752651600, 0)`,
    dateToTs: `// 日期转 Unix 时间戳（秒）\nt, _ := time.Parse("2006-01-02 15:04:05", "2025-07-16 15:40:00")\nts := t.Unix()`,
    getNowEn: `// Get current Unix timestamp (seconds)\nts := time.Now().Unix()`,
    tsToDateEn: `// Unix timestamp to date\ndate := time.Unix(1752651600, 0)`,
    dateToTsEn: `// Date to Unix timestamp (seconds)\nt, _ := time.Parse("2006-01-02 15:04:05", "2025-07-16 15:40:00")\nts := t.Unix()`,
  },
  {
    lang: 'C#',
    getNow: `// 获取当前 Unix 时间戳（秒）\nlong ts = DateTimeOffset.Now.ToUnixTimeSeconds();`,
    tsToDate: `// Unix 时间戳转日期\nvar date = DateTimeOffset.FromUnixTimeSeconds(1752651600).LocalDateTime;`,
    dateToTs: `// 日期转 Unix 时间戳（秒）\nvar ts = (long)(DateTime.Parse("2025-07-16 15:40:00").ToUniversalTime().Subtract(new DateTime(1970, 1, 1))).TotalSeconds;`,
    getNowEn: `// Get current Unix timestamp (seconds)\nlong ts = DateTimeOffset.Now.ToUnixTimeSeconds();`,
    tsToDateEn: `// Unix timestamp to date\nvar date = DateTimeOffset.FromUnixTimeSeconds(1752651600).LocalDateTime;`,
    dateToTsEn: `// Date to Unix timestamp (seconds)\nvar ts = (long)(DateTime.Parse("2025-07-16 15:40:00").ToUniversalTime().Subtract(new DateTime(1970, 1, 1))).TotalSeconds;`,
  },
];

function App() {
  // 多语言
  const [lang, setLang] = useState('en');
  const [dropdown, setDropdown] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  // 实时 Unix 时间戳
  const [timestamp, setTimestamp] = useState(() => Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState(false);
  // 时间戳转人类时间
  const [inputTs, setInputTs] = useState('');
  const [humanTime, setHumanTime] = useState('');
  const [tsError, setTsError] = useState('');
  const [gmtTime, setGmtTime] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [relativeTime, setRelativeTime] = useState('');
  // 人类时间转时间戳
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const [inputYear, setInputYear] = useState(now.getFullYear().toString());
  const [inputMonth, setInputMonth] = useState(pad(now.getMonth() + 1));
  const [inputDay, setInputDay] = useState(pad(now.getDate()));
  const [inputHour, setInputHour] = useState(pad(now.getHours()));
  const [inputMinute, setInputMinute] = useState(pad(now.getMinutes()));
  const [inputSecond, setInputSecond] = useState(pad(now.getSeconds()));
  const [outputTs, setOutputTs] = useState('');
  const [gmtTime2, setGmtTime2] = useState('');
  const [localTime2, setLocalTime2] = useState('');
  const [relativeTime2, setRelativeTime2] = useState('');
  const [ts3Error, setTs3Error] = useState('');
  // 代码区块复制状态
  const [copyIdx, setCopyIdx] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  // 区块展开收起状态
  const [openSections, setOpenSections] = useState({
    ts: true,
    toHuman: true,
    toTs: true,
    code: true,
    intro: true,
  });
  const handleToggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 点击外部关闭多语言下拉
  useEffect(() => {
    if (!dropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdown]);

  // Google Analytics
  useEffect(() => {
    // 加载 gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9C7KLL032Q';
    document.body.appendChild(script);

    // 初始化 GA
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-9C7KLL032Q');

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(timestamp));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const handleTsToHuman = () => {
    if (!/^\d{10,}$/.test(inputTs)) {
      setHumanTime('');
      setTsError(lang === 'zh' ? '请输入有效的时间戳' : 'Please enter a valid timestamp');
      setGmtTime('');
      setLocalTime('');
      setRelativeTime('');
      return;
    }
    setTsError('');
    let tsNum = parseInt(inputTs, 10);
    let date: Date | null = null;
    if (inputTs.length === 10) {
      date = new Date(tsNum * 1000);
    } else if (inputTs.length === 13) {
      date = new Date(tsNum);
    } else if (inputTs.length === 16) {
      date = new Date(Math.floor(tsNum / 1000));
    } else if (inputTs.length === 19) {
      date = new Date(Math.floor(tsNum / 1000000));
    } else {
      setHumanTime('');
      setTsError(lang === 'zh' ? '不支持的时间戳长度' : 'Unsupported timestamp length');
      setGmtTime('');
      setLocalTime('');
      setRelativeTime('');
      return;
    }
    if (!isNaN(date.getTime())) {
      setGmtTime(date.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        timeZone: 'UTC', 
        hour12: true, 
        weekday: 'short', 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
      const localStr = date.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
        hour12: true, 
        weekday: 'short', 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;
      const gmtStr = `GMT${sign}${hours}${minutes !== 0 ? ':' + String(minutes).padStart(2, '0') : ''}`;
      setLocalTime(`${localStr}（${gmtStr}）`);
      setRelativeTime(getRelativeTime(date));
      setHumanTime('ok');
    } else {
      setHumanTime('');
      setTsError(lang === 'zh' ? '无效的时间戳' : 'Invalid timestamp');
      setGmtTime('');
      setLocalTime('');
      setRelativeTime('');
    }
  };

  const handleHumanToTs = () => {
    if (!inputYear || !inputMonth || !inputDay || !inputHour || !inputMinute || !inputSecond) {
      setOutputTs('');
      setTs3Error(lang === 'zh' ? '请填写完整的年月日时分秒' : 'Please fill in all fields (year, month, day, hour, minute, second)');
      setGmtTime2('');
      setLocalTime2('');
      setRelativeTime2('');
      return;
    }
    const y = parseInt(inputYear, 10);
    const m = parseInt(inputMonth, 10) - 1;
    const d = parseInt(inputDay, 10);
    const h = parseInt(inputHour, 10);
    const min = parseInt(inputMinute, 10);
    const s = parseInt(inputSecond, 10);
    const dateObj = new Date(y, m, d, h, min, s);
    if (isNaN(dateObj.getTime())) {
      setOutputTs('');
      setTs3Error(lang === 'zh' ? '无效的日期时间' : 'Invalid date/time');
      setGmtTime2('');
      setLocalTime2('');
      setRelativeTime2('');
      return;
    }
    setTs3Error('');
    setOutputTs(String(Math.floor(dateObj.getTime() / 1000)));
    setGmtTime2(dateObj.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      timeZone: 'UTC',
      hour12: true,
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }));
    const localStr = dateObj.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      hour12: true,
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const offset = -dateObj.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    const gmtStr = `GMT${sign}${hours}${minutes !== 0 ? ':' + String(minutes).padStart(2, '0') : ''}`;
    setLocalTime2(`${localStr}（${gmtStr}）`);
    setRelativeTime2(getRelativeTime(dateObj));
  };

  function getRelativeTime(target: Date) {
    const now = new Date();
    const diff = Math.floor((now.getTime() - target.getTime()) / 1000);
    const absDiff = Math.abs(diff);
    let str = '';
    if (absDiff < 60) {
      str = lang === 'zh' ? `${absDiff}秒${diff > 0 ? '前' : '后'}` : `${absDiff} seconds ${diff > 0 ? 'ago' : 'later'}`;
    } else if (absDiff < 3600) {
      str = lang === 'zh' ? `${Math.floor(absDiff/60)}分钟${diff > 0 ? '前' : '后'}` : `${Math.floor(absDiff/60)} minutes ${diff > 0 ? 'ago' : 'later'}`;
    } else if (absDiff < 86400) {
      str = lang === 'zh' ? `${Math.floor(absDiff/3600)}小时${diff > 0 ? '前' : '后'}` : `${Math.floor(absDiff/3600)} hours ${diff > 0 ? 'ago' : 'later'}`;
    } else {
      str = lang === 'zh' ? `${Math.floor(absDiff/86400)}天${diff > 0 ? '前' : '后'}` : `${Math.floor(absDiff/86400)} days ${diff > 0 ? 'ago' : 'later'}`;
    }
    return str;
  }

  const handleCopyCode = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  };

  return (
    <div className="App">
      {/* <Helmet htmlAttributes={{ lang: lang }}>...</Helmet> */}
      <Header lang={lang} setLang={setLang} dropdown={dropdown} setDropdown={setDropdown} langRef={langRef as React.RefObject<HTMLDivElement>} LANGUAGES={LANGUAGES} />
      <main className="main-content">
        <Section title={lang === 'zh' ? '当前时间戳（Unix Timestamp）' : 'The Current Epoch Unix Timestamp'} open={openSections.ts} onToggle={() => handleToggleSection('ts')} showToggle onMouseEnter={() => setCopyIdx('ts')} onMouseLeave={() => setCopyIdx(null)}>
          <TimestampDisplay timestamp={timestamp} copied={copied} onCopy={handleCopy} lang={lang} open={openSections.ts} />
        </Section>
        <Section title={lang === 'zh' ? '时间戳（Unix Timestamp）转日期' : 'Unix Timestamp to Date'} open={openSections.toHuman} onToggle={() => handleToggleSection('toHuman')} showToggle onMouseEnter={() => setCopyIdx('toHuman')} onMouseLeave={() => setCopyIdx(null)}>
          <TimestampToHuman inputTs={inputTs} setInputTs={setInputTs} handleTsToHuman={handleTsToHuman} tsError={tsError} humanTime={humanTime} gmtTime={gmtTime} localTime={localTime} relativeTime={relativeTime} lang={lang} open={openSections.toHuman} />
        </Section>
        <Section title={lang === 'zh' ? '日期转时间戳（Unix Timestamp）' : 'Date to Unix Timestamp'} open={openSections.toTs} onToggle={() => handleToggleSection('toTs')} showToggle onMouseEnter={() => setCopyIdx('toTs')} onMouseLeave={() => setCopyIdx(null)}>
          <HumanToTimestamp
            inputYear={inputYear} setInputYear={setInputYear}
            inputMonth={inputMonth} setInputMonth={setInputMonth}
            inputDay={inputDay} setInputDay={setInputDay}
            inputHour={inputHour} setInputHour={setInputHour}
            inputMinute={inputMinute} setInputMinute={setInputMinute}
            inputSecond={inputSecond} setInputSecond={setInputSecond}
            handleHumanToTs={handleHumanToTs}
            ts3Error={ts3Error} outputTs={outputTs} lang={lang} open={openSections.toTs}
            gmtTime={gmtTime2} localTime={localTime2} relativeTime={relativeTime2}
          />
        </Section>
        <Section title={lang === 'zh' ? '多语言代码示例' : 'Code Examples in Multiple Languages'} open={openSections.code} onToggle={() => handleToggleSection('code')} showToggle onMouseEnter={() => setCopyIdx('code')} onMouseLeave={() => setCopyIdx(null)}>
          <CodeExamples codeExamples={codeExamples} lang={lang} copyIdx={copyIdx} setCopyIdx={setCopyIdx} copiedIdx={copiedIdx} handleCopyCode={handleCopyCode} open={openSections.code} />
        </Section>
        <Section title={lang === 'zh' ? '常见问题' : 'FAQ'} open={openSections.intro} onToggle={() => handleToggleSection('intro')} showToggle onMouseEnter={() => setCopyIdx('intro')} onMouseLeave={() => setCopyIdx(null)}>
          <Intro lang={lang} open={openSections.intro} />
        </Section>
      </main>
      <footer className="footer">© 2025 Keven's Tools.</footer>
    </div>
  );
}

export default App;
