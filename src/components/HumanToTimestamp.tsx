import React from 'react';

interface HumanToTimestampProps {
  inputDate: string;
  setInputDate: (v: string) => void;
  inputTime: string;
  setInputTime: (v: string) => void;
  tsUnit: string;
  setTsUnit: (v: string) => void;
  handleHumanToTs: () => void;
  ts3Error: string;
  outputTs: string;
  lang: string;
  open: boolean;
}

const HumanToTimestamp: React.FC<HumanToTimestampProps> = ({ inputDate, setInputDate, inputTime, setInputTime, tsUnit, setTsUnit, handleHumanToTs, ts3Error, outputTs, lang, open }) => (
  open ? (
    <>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
        {lang === 'zh' ? '请选择日期和时间，支持秒、毫秒、微秒、纳秒' : 'Select date and time, supports seconds, ms, μs, ns'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <input
          type="date"
          value={inputDate}
          onChange={e => setInputDate(e.target.value)}
          style={{ fontSize: 16, padding: '6px 12px', borderRadius: 6, border: '1px solid #ddd', outline: 'none' }}
        />
        <input
          type="time"
          value={inputTime}
          onChange={e => setInputTime(e.target.value)}
          style={{ fontSize: 16, padding: '6px 12px', borderRadius: 6, border: '1px solid #ddd', outline: 'none' }}
          step="1"
        />
        <select
          value={tsUnit}
          onChange={e => setTsUnit(e.target.value)}
          style={{ fontSize: 16, padding: '6px 12px', borderRadius: 6, border: '1px solid #ddd', outline: 'none' }}
        >
          <option value="s">{lang === 'zh' ? '秒' : 'Seconds'}</option>
          <option value="ms">{lang === 'zh' ? '毫秒' : 'Milliseconds'}</option>
          <option value="us">{lang === 'zh' ? '微秒' : 'Microseconds'}</option>
          <option value="ns">{lang === 'zh' ? '纳秒' : 'Nanoseconds'}</option>
        </select>
        <button
          onClick={handleHumanToTs}
          style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#1677ff', color: '#fff', fontWeight: 500, cursor: 'pointer', fontSize: 16, transition: 'background 0.2s', outline: 'none' }}
        >
          {lang === 'zh' ? '转为时间戳' : 'To Timestamp'}
        </button>
      </div>
      <div style={{ marginTop: 12, minHeight: 24 }}>
        {ts3Error && <span style={{ color: '#d4380d', fontSize: 16 }}>{ts3Error}</span>}
        {!ts3Error && outputTs && (
          <span style={{ fontWeight: 500, fontSize: 18 }}>{outputTs}</span>
        )}
      </div>
    </>
  ) : null
);

export default HumanToTimestamp; 