import React from 'react';
import { Bell, Command, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark"><ShieldCheck size={20}/></div>
        <span>AgentGuard</span>
        <span className="header-tier">Enterprise</span>
      </div>
      <div className="top-actions">
        <button className="command" type="button" aria-label="Search AgentGuard">
          <Command size={15}/><span>Search anything</span><kbd>⌘ K</kbd>
        </button>
        <button className="icon-button" type="button" aria-label="Toggle Theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={19}/><i/>
        </button>
      </div>
    </header>
  );
}
