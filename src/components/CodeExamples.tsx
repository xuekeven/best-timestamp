import React from 'react';

interface CodeExample {
  lang: string;
  toTs: string;
  toTsEn: string;
}

interface CodeExamplesProps {
  codeExamples: CodeExample[];
  lang: string;
  copyIdx: string | null;
  setCopyIdx: (v: string | null) => void;
  copiedIdx: number | null;
  handleCopyCode: (code: string, idx: number) => void;
  open: boolean;
}

const CodeExamples: React.FC<CodeExamplesProps> = ({ codeExamples, lang, copyIdx, setCopyIdx, copiedIdx, handleCopyCode, open }) => (
  open ? (
    <>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
        {lang === 'zh'
          ? '常见编程语言的时间戳与日期互转代码片段'
          : 'Code snippets for timestamp/date conversion in popular languages'}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {codeExamples.map((ex, idx) => {
          const code = lang === 'zh' ? ex.toTs : ex.toTsEn;
          return (
            <div
              key={ex.lang}
              style={{
                flex: '1 1 320px',
                minWidth: 260,
                background: '#f7f8fa',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                padding: 16,
                marginBottom: 12,
                position: 'relative',
              }}
            >
              <div style={{ fontWeight: 500, marginBottom: 8 }}>{ex.lang}</div>
              <pre style={{ background: '#fff', borderRadius: 6, padding: 12, fontSize: 14, overflowX: 'auto', border: '1px solid #eee', margin: 0 }}>
                {code}
              </pre>
              {/* 复制按钮 */}
              {copyIdx === `${idx}` && (
                <button
                  onClick={() => handleCopyCode(code, idx)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid #eee',
                    borderRadius: 4,
                    padding: '2px 8px',
                    cursor: 'pointer',
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    zIndex: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  title={lang === 'zh' ? '复制代码' : 'Copy code'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1677ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                  <span style={{ fontSize: 13, color: '#1677ff' }}>{copiedIdx === idx ? (lang === 'zh' ? '已复制' : 'Copied!') : (lang === 'zh' ? '复制' : 'Copy')}</span>
                </button>
              )}
              <div
                style={{ position: 'absolute', inset: 0 }}
                onMouseEnter={() => setCopyIdx(`${idx}`)}
                onMouseLeave={() => setCopyIdx(null)}
              />
            </div>
          );
        })}
      </div>
    </>
  ) : null
);

export default CodeExamples; 