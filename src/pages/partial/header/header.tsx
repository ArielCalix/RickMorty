import { CustomNavBar, CustomNav } from '../../../components/navigation/navbar';
import { isEmpty } from 'lodash';
import { Container } from 'react-bootstrap';

export default function Header({ Menu }): JSX.Element {
    return <CustomNavBar.NavBar bg="dark" expand="md">
        <Container>
            <CustomNavBar.Brand><CustomNavBar.Img className="p-0 m-0" src='https://res.cloudinary.com/psicocloud/image/upload/v1657687217/RickMorty/Rick-and-Morty_mocfan.png' />Wiki</CustomNavBar.Brand>
            <CustomNavBar.Toggle aria-controls="basic-navbar-nav" />
            <CustomNavBar.Collapse id="basic-navbar-nav">
                <CustomNav.Nav className="justify-content-center">
                    {(!isEmpty(Menu)) && Menu.map((item, itemIndex) => {
                        return <CustomNav.NavItem key={"navItem-" + itemIndex} >
                            <CustomNav.NavLink className="nav-link" to={item.route}>
                                {item.title}
                            </CustomNav.NavLink>
                        </CustomNav.NavItem>
                    })
                    }
                </CustomNav.Nav>
            </CustomNavBar.Collapse>
        </Container>
    </CustomNavBar.NavBar>
}