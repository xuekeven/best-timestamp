import React from 'react';

interface HeaderProps {
  lang: string;
  setLang: (lang: string) => void;
  dropdown: boolean;
  setDropdown: (v: boolean) => void;
  langRef: React.RefObject<HTMLDivElement>;
  LANGUAGES: { code: string; label: string }[];
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, dropdown, setDropdown, langRef, LANGUAGES }) => (
  <header className="sticky-header">
    <h1 className="header-title" style={{
      background: 'linear-gradient(90deg, #1677ff 0%, #52c41a 100%)',
      color: '#fff',
      padding: '8px',
      margin: '0 0 0 0',
      borderRadius: 8,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: 1
    }}>
      The Best Timestamp
    </h1>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div
        className="header-lang"
        ref={langRef as React.RefObject<HTMLDivElement>}
        onClick={() => setDropdown(!dropdown)}
        style={{ userSelect: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <div className="lang-icon" style={{ marginTop: 3 }} role="img" aria-label="language">🌐</div>
        <div className="lang-label">{LANGUAGES.find(l => l.code === lang)?.label ?? lang}</div>
        <div className="lang-arrow">▼</div>
        {dropdown && (
          <ul className="lang-dropdown">
            {LANGUAGES.map(l => (
              <li
                key={l.code}
                className={l.code === lang ? 'active' : ''}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <a
        href="https://github.com/xuekeven/best-timestamp"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          color: '#24292f',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          fontSize: '20px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="GitHub Repository"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={{ display: 'block' }}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
    </div>
  </header>
);

export default Header; 