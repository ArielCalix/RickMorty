import Button from "react-bootstrap/esm/Button"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const ButtonDefault = styled(Button)`
color: ${props => props.theme.ColorTextWhite};
background-color: ${props => props.theme.RickMortyLightShades};
border: 1px solid ${props => props.theme.RickMortyDarkAccent};
&:hover{
    color: ${props => props.theme.ColorTextWhite};
    background-color: ${props => props.theme.RickMortyLightShadesTransparent};
    border: 1px solid ${props => props.theme.RickMortyDarkAccent};
}
&:focus{
    color: ${props => props.theme.ColorTextWhite};
    background-color: ${props => props.theme.RickMortyLightShades};
    border: 1px solid ${props => props.theme.RickMortyDarkAccent};
}
`

const ButtonLink = styled(NavLink)`
color: ${props => props.theme.ColorTextWhite}!important;
background-color: ${props => props.theme.RickMortyLightShades}!important;
border: 1px solid ${props => props.theme.RickMortyDarkAccent}!important;
&:hover{
    color: ${props => props.theme.ColorTextWhite}!important;
    background-color: ${props => props.theme.RickMortyLightShadesTransparent}!important;
    border: 1px solid ${props => props.theme.RickMortyDarkAccent}!important;
}
&:focus{
    color: ${props => props.theme.ColorTextWhite}!important;
    background-color: ${props => props.theme.RickMortyLightShades}!important;
    border: 1px solid ${props => props.theme.RickMortyDarkAccent}!important;
}
`

const ButtonCancel = styled(Button)`
color: ${props => props.theme.ColorTextWhite};
background-color: ${props => props.theme.RickMortyDarkAccent};
border: 1px solid ${props => props.theme.RickMortyDarkAccent};
&:hover{
    color: ${props => props.theme.ColorTextWhite};
    background-color: ${props => props.theme.RickMortyDarkAccentTransparent};
    border: 1px solid ${props => props.theme.RickMortyDarkAccent};
}
`

NavLink

export const CustomButtons = {
    Default: ButtonDefault,
    Link: ButtonLink,
    Cancel: ButtonCancel
}