import React from 'react';

interface CodeExample {
  lang: string;
  getNow: string;
  tsToDate: string;
  dateToTs: string;
  getNowEn: string;
  tsToDateEn: string;
  dateToTsEn: string;
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
        {codeExamples.map((ex, idx) => (
          <div
            key={ex.lang}
            style={{
              flex: '1 1 340px',
              minWidth: 260,
              background: '#f7f8fa',
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              padding: 16,
              marginBottom: 12,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ fontWeight: 500 }}>{ex.lang}</div>
            {/* 获取当前时间戳 */}
            <div>
              <div style={{ color: '#1677ff', fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {lang === 'zh' ? '获取当前 Unix 时间戳' : 'Get current Unix timestamp'}
                </div>
                <button
                  onClick={() => handleCopyCode(lang === 'zh' ? ex.getNow : ex.getNowEn, idx * 3)}
                  style={{ marginTop: 4, background: '#fff', border: '1px solid #eee', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 14, color: '#1677ff' }}
                  title={lang === 'zh' ? '复制代码' : 'Copy code'}
                >
                  {copiedIdx === idx * 3 ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}
                </button>
              </div>
              <pre style={{ background: '#fff', borderRadius: 6, padding: 12, fontSize: 14, overflowX: 'auto', border: '1px solid #eee', margin: 0 }}>
                {(lang === 'zh' ? ex.getNow : ex.getNowEn) as string}
              </pre>
            </div>
            {/* 时间戳转日期 */}
            <div>
              <div style={{ color: '#1677ff', fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {lang === 'zh' ? 'Unix 时间戳转日期' : 'Unix timestamp to date'}
                </div>  
                <button
                  onClick={() => handleCopyCode(lang === 'zh' ? ex.tsToDate : ex.tsToDateEn, idx * 3 + 1)}
                  style={{ marginTop: 4, background: '#fff', border: '1px solid #eee', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 14, color: '#1677ff' }}
                  title={lang === 'zh' ? '复制代码' : 'Copy code'}
                >
                  {copiedIdx === idx * 3 + 1 ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}
                </button>
              </div>
              <pre style={{ background: '#fff', borderRadius: 6, padding: 12, fontSize: 14, overflowX: 'auto', border: '1px solid #eee', margin: 0 }}>
                {(lang === 'zh' ? ex.tsToDate : ex.tsToDateEn) as string}
              </pre>
            </div>
            {/* 日期转时间戳 */}
            <div>
              <div style={{ color: '#1677ff', fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {lang === 'zh' ? '日期转 Unix 时间戳' : 'Date to Unix timestamp'}
                </div>
                <button
                  onClick={() => handleCopyCode(lang === 'zh' ? ex.dateToTs : ex.dateToTsEn, idx * 3 + 2)}
                  style={{ marginTop: 4, background: '#fff', border: '1px solid #eee', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', fontSize: 14, color: '#1677ff' }}
                  title={lang === 'zh' ? '复制代码' : 'Copy code'}
                >
                  {copiedIdx === idx * 3 + 2 ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}
                </button>
              </div>
              <pre style={{ background: '#fff', borderRadius: 6, padding: 12, fontSize: 14, overflowX: 'auto', border: '1px solid #eee', margin: 0 }}>
                {(lang === 'zh' ? ex.dateToTs : ex.dateToTsEn) as string}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : null
);

export default CodeExamples; 