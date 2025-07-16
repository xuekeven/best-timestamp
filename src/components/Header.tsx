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
    <div className="header-title">The Best Timestamp</div>
    <div
      className="header-lang"
      ref={langRef as React.RefObject<HTMLDivElement>}
      onClick={() => setDropdown(!dropdown)}
      style={{ userSelect: 'none' }}
    >
      <span className="lang-icon" role="img" aria-label="language">🌐</span>
      <span className="lang-label">{LANGUAGES.find(l => l.code === lang)?.label ?? lang}</span>
      <span className="lang-arrow">▼</span>
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