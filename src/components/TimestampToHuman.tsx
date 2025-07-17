import React from 'react';

interface TimestampToHumanProps {
  inputTs: string;
  setInputTs: (v: string) => void;
  handleTsToHuman: () => void;
  tsError: string;
  humanTime: string;
  gmtTime: string;
  localTime: string;
  relativeTime: string;
  lang: string;
  open: boolean;
}

const TimestampToHuman: React.FC<TimestampToHumanProps> = ({ inputTs, setInputTs, handleTsToHuman, tsError, humanTime, gmtTime, localTime, relativeTime, lang, open }) => (
  open ? (
    <>
      <div style={{ color: '#888', fontSize: 14, marginTop: 6, marginBottom: 8 }}>
        {lang === 'zh'
          ? '支持秒（10位）、毫秒（13位）、微秒（16位）、纳秒（19位）的 Unix 时间戳'
          : 'Supports Unix timestamp in seconds (10), milliseconds (13), microseconds (16), nanoseconds (19)'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="text"
          inputMode="numeric"
          pattern="\\d*"
          placeholder={lang === 'zh' ? "请输入时间戳" : "Please enter a Timestamp"}
          value={inputTs}
          onChange={e => setInputTs(e.target.value.replace(/[^\d]/g, ''))}
          style={{
            fontSize: 16,
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            width: 220,
            outline: 'none',
          }}
        />
        <button
          onClick={handleTsToHuman}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#1677ff',
            color: '#fff',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'background 0.2s',
            outline: 'none',
            height: 32,
          }}
        >
          {lang === 'zh' ? '转为日期' : 'To Date'}
        </button>
      </div>
      <div style={{ marginTop: 12, minHeight: 24 }}>
        {tsError && <span style={{ color: '#d4380d', fontSize: 16 }}>{tsError}</span>}
        {!tsError && humanTime && (
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 16, border: '1px solid #eee' }}>
            <tbody>
              <tr>
                <td style={{ color: '#888', padding: '4px 8px', width: 120, border: '1px solid #eee' }}>{lang === 'zh' ? 'GMT 时间' : 'GMT'}</td>
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

export default TimestampToHuman; 