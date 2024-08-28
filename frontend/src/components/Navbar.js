import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4046f7;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.span`
  font-size: 28px;
  margin-right: 8px;
`;

const NewPoemButton = styled(motion.button)`
  background-color: ##ffdcb2;
  color: #000000;
  border: none;
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid #ff8c00;
`;

const PlusIcon = styled.span`
  margin-right: 4px;
`;

const Navbar = () => {
  const handleNewPoemClick = (event) => {
    window.location.reload();
  };
  return (
    <NavbarContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo>
        <LogoIcon>✧</LogoIcon>
        VerseCraft
      </Logo>
      <NewPoemButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={handleNewPoemClick}>
        <PlusIcon>
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
          </svg>
        </PlusIcon>
        New Poem
      </NewPoemButton>
    </NavbarContainer>
  );
};

export default Navbar;
