import { CustomModal } from "../../../components/shared/modal/modal";
import { Texts } from "../../../components/layout/text";
import { isEmpty } from "lodash";
import React, { useEffect, useState, Fragment } from "react";
import { Accordion, Button } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";

export default function CharacterModal({ id, show, setShow }) {
    const [info, setInfo] = useState({});
    const [episodes, setEpisodes] = useState([]);
    useEffect(() => {
        console.log(id)
        let characterData: IConnection = { url: `/character/${id}` }
        getData(characterData).then(result => {
            console.log(result)
            const episodesList = result["episode"].map(ep => {
                const splitted = ep.split("/");
                return `${splitted[4]}-${splitted[5]}`
            })
            setEpisodes(episodesList);
            setInfo(result)
        });
    }, []);
    const handleClose = () => {
        setShow(false)
        setInfo({})
    };
    return (<Modal show={show} onHide={handleClose}>
        {!isEmpty(info) && <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{info["name"]}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <CustomModal.BodyContainer className="d-flex flex-row mx-2">
                    <CustomModal.BodyContainer className="mx-2">
                        <CustomModal.Img src={info["image"]} />
                    </CustomModal.BodyContainer>
                    <CustomModal.BodyContainer className="mx-2">
                        <Texts.pd className="mt-1">
                            <span>
                                <strong>Especie: </strong>
                            </span>{info["species"]}</Texts.pd>
                        <Texts.pd><span>
                            <strong>Status: </strong>
                        </span>{info["status"]}</Texts.pd>
                        <Texts.pd><span>
                            <strong>Gender: </strong>
                        </span>{info["gender"]}</Texts.pd>
                        <Texts.pd><span>
                            <strong>Origin: </strong>
                        </span>{info["origin"].name}</Texts.pd>
                        <Texts.pd><span>
                            <strong>Type: </strong>
                        </span>{info["type"] !== "" ? info["type"] : "unknow"}</Texts.pd>
                    </CustomModal.BodyContainer>
                </CustomModal.BodyContainer>
                <CustomModal.BodyContainer className="mx-2">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><strong>Episodes</strong></Accordion.Header>
                            <Accordion.Body>
                                <Texts.pd>{episodes.join(", ")}</Texts.pd>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </CustomModal.BodyContainer>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Fragment>
        }
    </Modal>
    );
}