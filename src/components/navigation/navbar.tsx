import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const CustomNavigation = styled(Nav)`
color: ${props => props.theme.RickMortyMainBrand};
`

const CustomNavLink = styled(NavLink)`
color: ${props => props.theme.ColorTextWhite}!important;
text-decoration: none;
&:hover {
    color: ${props => props.theme.TextWhite}!important;
    background-color: ${props => props.theme.RickMortyLightAccentTransparent};
}
`
const CustomNavItem = styled(Nav.Item)`
`

const CustomNavbar = styled(Navbar)`
background-color: ${props => props.theme.RickMortyMainBrand};

`

const CustomNavBarBrand = styled(Navbar.Brand)`
color: ${props => props.theme.ColorTextWhite}!important;

`

const CustomNavBarCollapse = styled(Navbar.Collapse)``

export const CustomNavBar = {
    NavBar: CustomNavbar,
    Brand: CustomNavBarBrand,
    Collapse: CustomNavBarCollapse
}

export const CustomNav = {
    Nav: CustomNavigation,
    NavLink: CustomNavLink,
    NavItem: CustomNavItem
}