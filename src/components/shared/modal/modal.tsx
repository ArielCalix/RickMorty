import Modal from "react-bootstrap/esm/Modal";
import styled from "styled-components";

const CustomModalHeader = styled(Modal.Header)``

const CustomModalTitle = styled(Modal.Title)``

const CustomModalImg = styled.img`
width: 10rem;
`

const CustomModalBodyContainer = styled.div``

export const CustomModal = {
    Header: CustomModalHeader,
    Title: CustomModalTitle,
    Img: CustomModalImg,
    BodyContainer: CustomModalBodyContainer
}