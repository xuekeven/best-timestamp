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
      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
        {lang === 'zh' ? '当前时间是' : 'Current time is'}
      </div>
      <span
        style={{
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 1,
          background: '#f6f8fa',
          borderRadius: 8,
          padding: '8px',
          minWidth: 220,
          display: 'inline-block',
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        {new Date(timestamp * 1000).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </span>
      <div style={{ color: '#888', fontSize: 14, marginTop: 8, marginBottom: 8 }}>
        {lang === 'zh' ? '从 1970 年 1 月 1 日 00:00:00 UTC 以来的秒数是' : 'The number of seconds since 1970-01-01 00:00:00 UTC is'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 1,
            background: '#f6f8fa',
            borderRadius: 8,
            padding: '8px',
            minWidth: 180,
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {timestamp}
        </span>
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
            fontSize: 14,
            height: 32,
            transition: 'background 0.2s',
            outline: 'none',
            marginLeft: 8,
          }}
        >
          {copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}
        </button>
      </div>
    </>
  ) : null
);

export default TimestampDisplay; 