import { CustomNavBar, CustomNav } from '../../../components/navigation/navbar';
import { isEmpty } from 'lodash';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Header({ Menu }): JSX.Element {
    return <CustomNavBar.NavBar>
        <Container>
            <CustomNavBar.Brand>Rick and Morty Wiki</CustomNavBar.Brand>
            <CustomNav.Nav className="justify-content-center">
                {(!isEmpty(Menu)) && Menu.map(item => {
                    return <CustomNav.NavItem>
                        <CustomNav.NavLink className="nav-link" to={item.route}>
                            {item.title}
                        </CustomNav.NavLink>
                    </CustomNav.NavItem>
                })
                }
            </CustomNav.Nav>
        </Container>
    </CustomNavBar.NavBar>
}