import { ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

export default function SidebarNavigation({ items, contextNavigation }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeModuleSlug = pathParts[0] || 'overview';
  
  // Find the label for the active module based on slug
  const activeModuleItem = items.find(item => slugify(item.label) === activeModuleSlug);
  const activeModule = activeModuleItem ? activeModuleItem.label : 'Overview';
  
  const pages = contextNavigation[activeModule] || [];

  return (
    <aside className="sidebar" aria-label="AgentGuard navigation">
      <div className="nav-label">Workspace</div>
      <nav aria-label="Workspace navigation">
        {items.map(({ label, Icon, badge }) => {
          const slug = slugify(label);
          return (
            <NavLink 
              key={label} 
              to={`/${slug}`} 
              className={({ isActive }) => `nav-item ${isActive || activeModuleSlug === slug ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
              aria-label={badge ? `${label}, ${badge.label}` : label}
            >
              <Icon size={18}/><span>{label}</span>
              {badge && <b className={`nav-badge ${badge.severity}`} aria-hidden="true">{badge.count}</b>}
            </NavLink>
          );
        })}
      </nav>
      {pages.length > 0 && (
        <section className="child-navigation" aria-label={`${activeModule} pages`}>
          <div className="child-heading"><strong>{activeModule}</strong></div>
          <nav aria-label={`${activeModule} page navigation`}>
            {pages.map((page) => {
              const pageSlug = slugify(page);
              return (
                <NavLink 
                  key={page} 
                  to={`/${activeModuleSlug}/${pageSlug}`} 
                  className={({ isActive }) => `child-nav-item ${isActive ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span>{page}</span>
                  <ChevronRight className="chevron-icon" size={14} aria-hidden="true"/>
                </NavLink>
              );
            })}
          </nav>
        </section>
      )}
    </aside>
  );
}
