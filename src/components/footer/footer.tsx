import React from 'react';
import styled from 'styled-components';

const CustomFooterContainer = styled.footer`
background-color: ${props => props.theme.RickMortyDarkShades};
height: 8vh;
`

export const FooterContainer = {
    Container: CustomFooterContainer
} 