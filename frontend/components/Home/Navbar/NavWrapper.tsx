'use client';

import { useState } from 'react';
import MobileNav from './MobileNav';
import Nav from './Nav';

const NavWrapper = () => {
  const [showNav, setShowNav] = useState(false);
  const closeNav = () => setShowNav(false);
  const openNav = () => setShowNav(true);

  return (
    <div>
      <Nav openNav={openNav} />
      <MobileNav showNav={showNav} closeNav={closeNav} />
    </div>
  );
};

export default NavWrapper;
