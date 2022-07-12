import { Card } from "react-bootstrap";
import styled from "styled-components";

const CustomContainer = styled(Card)`
width: 20rem;`


const CardImg = styled(Card.Img)``

const CardBody = styled(Card.Body)``

const CardTitle = styled(Card.Title)``

const CardText = styled(Card.Text)``

export const CustomCard = {
    Container: CustomContainer,
    Img: CardImg,
    Body: CardBody,
    Title: CardTitle,
    Text: CardText
}