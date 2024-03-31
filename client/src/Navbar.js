import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components for the navigation bar
const NavWrapper = styled.nav`
  background-color: #333;
  padding: 12px 0; /* Adjusted padding */
  position: fixed;
  width: 100%; /* Changed width to 100% */
  top: 0;
  left: 0; /* Added left: 0 to ensure the navbar starts from the left edge */
  z-index: 100; /* Ensure it's above other elements */
  margin: 0; /* Removed margin */
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "flex" : "none")};
  }
`;

const DropdownMenu = styled.div`
  display: none;
  background-color: #333;
  top: 100%;
  left: 0;
  width: 40%;
  z-index: 99;
  @media (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "block" : "none")};
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  margin-left: 10px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 4px 0;
`;

// Navigation bar component
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle the display of the mobile dropdown menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <NavWrapper>
      {/* Main navigation menu */}
      <NavList>
        {/* Hamburger icon for mobile */}
        <HamburgerIcon onClick={toggleMenu}>
          <Bar />
          <Bar />
          <Bar />
        </HamburgerIcon>
        {/* Navigation items */}
        <NavItem>
          <NavLink to="/" showMenu={showMenu}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/CreateFeed" showMenu={showMenu}>
            Create News Feed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ManageFeed" showMenu={showMenu}>
            Manage News Feeds
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/PerformanceReports" showMenu={showMenu}>
            Performance Reports
          </NavLink>
        </NavItem>
      </NavList>
      {/* Dropdown menu for mobile */}
      <DropdownMenu showMenu={showMenu}>
        <NavItem>
          <NavLink to="/" onClick={toggleMenu}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/CreateFeed" onClick={toggleMenu}>
            Create News Feed
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ManageFeed" onClick={toggleMenu}>
            Manage News Feeds
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/PerformanceReports" onClick={toggleMenu}>
            Performance Reports
          </NavLink>
        </NavItem>
      </DropdownMenu>
    </NavWrapper>
  );
};

export default NavBar;
