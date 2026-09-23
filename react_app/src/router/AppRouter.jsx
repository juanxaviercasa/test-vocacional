import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  // Obtener ruta inicial desde pathname o hash (#/ruta)
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return { path: '/', hash: '' };
    
    // Si usa hash routing (ej. #/glosario#ipip-neo o #/transparencia)
    const hashStr = window.location.hash;
    if (hashStr && hashStr.startsWith('#/')) {
      const parts = hashStr.slice(2).split('#');
      return {
        path: '/' + (parts[0] || ''),
        hash: parts[1] ? '#' + parts[1] : ''
      };
    }

    // Ruta de URL estándar
    const pathname = window.location.pathname || '/';
    const hash = window.location.hash || '';
    return { path: pathname, hash };
  };

  const [routeState, setRouteState] = useState(getInitialRoute);

  const navigate = useCallback((to, options = {}) => {
    if (!to) return;
    
    let path = to;
    let hash = '';

    if (to.includes('#')) {
      const parts = to.split('#');
      path = parts[0] || '/';
      hash = '#' + parts[1];
    }

    // Normalizar path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    setRouteState({ path, hash });

    // Actualizar historial del navegador de forma dual (pushState y hash)
    const newUrl = `${path}${hash}`;
    if (window.history.pushState) {
      window.history.pushState({ path, hash }, '', newUrl);
    } else {
      window.location.hash = `#${newUrl}`;
    }

    // Desplazamiento suave al elemento objetivo si hay hash
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, options.delay ?? 100);
    } else if (!options.preventScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Escuchar cambios de navegación del usuario (botón Atrás/Adelante y cambios de hash)
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(getInitialRoute());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Desplazamiento inicial al elemento con hash al cargar la página
  useEffect(() => {
    if (routeState.hash) {
      const targetId = routeState.hash.replace(/^#/, '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [routeState.path, routeState.hash]);

  const value = {
    currentPath: routeState.path,
    currentHash: routeState.hash,
    navigate
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useAppRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useAppRouter debe ser utilizado dentro de un RouterProvider');
  }
  return context;
}

/**
 * Componente <Link> ligero y accesible para navegación entre páginas y saltos a hashes
 */
export function Link({ href, to, children, className = '', onClick, title, id, ...props }) {
  const { navigate } = useAppRouter();
  const target = href || to || '/';

  const handleClick = (e) => {
    // Si se presiona Ctrl/Cmd/Shift o es enlace externo, usar comportamiento nativo
    if (e.metaKey || e.ctrlKey || e.shiftKey || target.startsWith('http://') || target.startsWith('https://')) {
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    navigate(target);
  };

  return (
    <a
      id={id}
      href={target}
      onClick={handleClick}
      className={className}
      title={title}
      {...props}
    >
      {children}
    </a>
  );
}
