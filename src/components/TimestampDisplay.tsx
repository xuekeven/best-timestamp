import React from 'react';

interface TimestampDisplayProps {
  timestamp: number;
  copied: boolean;
  onCopy: () => void;
  lang: string;
  open: boolean;
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp, copied, onCopy, lang, open }) => (
  open ? (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>{timestamp}</span>
        <button
          className="copy-btn"
          onClick={onCopy}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: copied ? '#52c41a' : '#1677ff',
            color: '#fff',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.2s',
            outline: 'none',
          }}
        >
          {copied ? (lang === 'zh' ? '已复制' : 'Copied!') : (lang === 'zh' ? '复制' : 'Copy')}
        </button>
      </div>
      <div style={{ color: '#888', fontSize: 14, marginTop: 8 }}>
        {lang === 'zh' ? '当前时间的 Unix 时间戳（每秒自动刷新）' : 'Current Unix timestamp (updates every second)'}
      </div>
    </>
  ) : null
);

export default TimestampDisplay; 