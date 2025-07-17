import React from 'react';

interface HumanToTimestampProps {
  inputYear: string;
  setInputYear: (v: string) => void;
  inputMonth: string;
  setInputMonth: (v: string) => void;
  inputDay: string;
  setInputDay: (v: string) => void;
  inputHour: string;
  setInputHour: (v: string) => void;
  inputMinute: string;
  setInputMinute: (v: string) => void;
  inputSecond: string;
  setInputSecond: (v: string) => void;
  handleHumanToTs: () => void;
  ts3Error: string;
  outputTs: string;
  lang: string;
  open: boolean;
  gmtTime: string;
  localTime: string;
  relativeTime: string;
}

const HumanToTimestamp: React.FC<HumanToTimestampProps> = ({ inputYear, setInputYear, inputMonth, setInputMonth, inputDay, setInputDay, inputHour, setInputHour, inputMinute, setInputMinute, inputSecond, setInputSecond, handleHumanToTs, ts3Error, outputTs, lang, open, gmtTime, localTime, relativeTime }) => (
  open ? (
    <>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
        {lang === 'zh' ? '请输入日期和时间' : 'Please enter date and time'}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '年' : 'Year'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={4}
            value={inputYear}
            onChange={e => setInputYear(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 60, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '月' : 'Month'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={2}
            value={inputMonth}
            onChange={e => setInputMonth(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 50, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '日' : 'Day'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={2}
            value={inputDay}
            onChange={e => setInputDay(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 50, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '时' : 'Hour'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={2}
            value={inputHour}
            onChange={e => setInputHour(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 50, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '分' : 'Minute'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={2}
            value={inputMinute}
            onChange={e => setInputMinute(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 50, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'black', fontSize: 13, marginBottom: 2, marginLeft: 4 }}>{lang === 'zh' ? '秒' : 'Second'}</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d*"
            maxLength={2}
            value={inputSecond}
            onChange={e => setInputSecond(e.target.value.replace(/[^\d]/g, ''))}
            style={{ fontSize: 16, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd', width: 50, outline: 'none' }}
          />
        </div>
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
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 16, border: '1px solid #eee' }}>
            <tbody>
              <tr>
                <td style={{ color: '#888', padding: '4px 8px', width: 140, border: '1px solid #eee' }}>Unix Timestamp</td>
                <td style={{ padding: '4px 8px', border: '1px solid #eee' }}>{outputTs}</td>
              </tr>
              <tr>
                <td style={{ color: '#888', padding: '4px 8px', width: 140, border: '1px solid #eee' }}>GMT</td>
                <td style={{ padding: '4px 8px', border: '1px solid #eee' }}>{gmtTime}</td>
              </tr>
              <tr>
                <td style={{ color: '#888', padding: '4px 8px', border: '1px solid #eee' }}>{lang === 'zh' ? '你所在时区' : 'Your time zone'}</td>
                <td style={{ padding: '4px 8px', border: '1px solid #eee' }}>{localTime}</td>
              </tr>
              <tr>
                <td style={{ color: '#888', padding: '4px 8px', border: '1px solid #eee' }}>{lang === 'zh' ? '相对当前时间' : 'Relative'}</td>
                <td style={{ padding: '4px 8px', border: '1px solid #eee' }}>{relativeTime}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  ) : null
);

export default HumanToTimestamp; 