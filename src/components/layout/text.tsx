import styled from "styled-components";

const ParagraphWhite = styled.p`
color: ${props => props.theme.ColorTextWhite};
`
const ParagraphDark = styled.p`
color: ${props => props.theme.ColorTextBlack};
`
const H2White = styled.h2`
color: ${props => props.theme.ColorTextWhite};
`
const H2Dark = styled.h2`
color: ${props => props.theme.ColorTextBlack};
`

export const Texts = {
    pl: ParagraphWhite,
    pd: ParagraphDark,
    h2l: H2White,
    h2d: H2Dark
}