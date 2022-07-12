import Button from "react-bootstrap/esm/Button"
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

export const CustomButtons = {
    Default: ButtonDefault,
    Cancel: ButtonCancel
}