import React from 'react';

interface SectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showToggle?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, open, onToggle, children, onMouseEnter, onMouseLeave, showToggle }) => (
  <section
    className="section"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ position: 'relative' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ fontWeight: 600, fontSize: 18, marginTop: 0, marginBottom: open ? 8 : 4 }}>{title}</h2>
      {showToggle && (
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 8 }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          )}
        </button>
      )}
    </div>
    {open && children}
  </section>
);

export default Section; 