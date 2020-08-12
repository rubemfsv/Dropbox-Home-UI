import React, { useState, useEffect } from 'react';

import { Container } from './styles';

const scrollTrashHold = 300;

declare global {
  interface Window {
    toggleActiveMenu:(() => void) | undefined;
  }
}

const SideMenu: React.FC = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() =>{
    function onScroll() {
      setScrollY(window.scrollY);
      setIsActive(false);
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const classes = [
    isActive ? 'open' : '',
    scrollY <= scrollTrashHold ? 'scrollOpen' : ''
  ]

  function toggleActiveMenu() {
    setIsActive(prev => !prev);
  }

  window.toggleActiveMenu = toggleActiveMenu;

  const className = classes.join(' ').trim();

  return<Container className={className}>{children}</Container>
}

export default SideMenu;
