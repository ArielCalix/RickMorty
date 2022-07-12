import { Card } from "react-bootstrap";
import styled from "styled-components";

const CustomContainer = styled(Card)`
width: 16.0rem;
`

const CardImg = styled(Card.Img)`
width: 15rem;
`

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