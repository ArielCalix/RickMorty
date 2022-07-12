import styled from "styled-components";

const UnorderedList = styled.ul``
const UnorderedListItem = styled.li`
color: ${props => props.theme.ColorTextBlack}!important;
`


export const Unordered = {
    ul: UnorderedList,
    li: UnorderedListItem
}