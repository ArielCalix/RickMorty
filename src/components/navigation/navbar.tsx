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
    color: ${props => props.theme.ColorTextWhite}!important;
    background-color: ${props => props.theme.RickMortyLightShades};
}
`
const CustomNavLinkDark = styled(NavLink)`
color: ${props => props.theme.ColorTextBlack}!important;
text-decoration: none;
&:hover {
    color: ${props => props.theme.ColorTextWhite}!important;
    background-color: ${props => props.theme.RickMortyLightShades};
}
`
const CustomNavItem = styled(Nav.Item)`
`

const CustomNavbar = styled(Navbar)`
background-color: ${props => props.theme.RickMortyMainBrand}!important;

`

const CustomNavBarBrand = styled(Navbar.Brand)`
color: ${props => props.theme.ColorTextWhite}!important;

`

const CustomNavBarToggle = styled(Navbar.Toggle)`
color: ${props => props.theme.ColorTextWhite}!important;
`

const CustomNavBarCollapse = styled(Navbar.Collapse)`
color: ${props => props.theme.ColorTextWhite}!important;
`

export const CustomNavBar = {
    NavBar: CustomNavbar,
    Brand: CustomNavBarBrand,
    Collapse: CustomNavBarCollapse,
    Toggle: CustomNavBarToggle
}

export const CustomNav = {
    Nav: CustomNavigation,
    NavLink: CustomNavLink,
    NavLinkDark: CustomNavLinkDark,
    NavItem: CustomNavItem
}