import { Card } from "react-bootstrap";
import styled from "styled-components";

const CustomContainer = styled(Card)`
width: 16.8rem;
`


const CardImg = styled(Card.Img)``

const CardBody = styled(Card.Body)`
height: 13rem;
`

const CardTitle = styled(Card.Title)`
height: 3rem;
`

const CardText = styled(Card.Text)``

export const CustomCard = {
    Container: CustomContainer,
    Img: CardImg,
    Body: CardBody,
    Title: CardTitle,
    Text: CardText
}