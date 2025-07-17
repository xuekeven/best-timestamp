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
      fontSize: 28,
      letterSpacing: 1
    }}>
      The Best Timestamp
    </h1>
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
  </header>
);

export default Header; 