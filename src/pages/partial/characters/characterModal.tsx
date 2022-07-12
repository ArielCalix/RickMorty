import { Texts } from "../../../components/layout/text";
import { isEmpty } from "lodash";
import React, { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";
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
            <Modal.Body>
                <img src={info["image"]} />
                <Texts.pd className="mt-1">{info["species"]}</Texts.pd>
                <Texts.pd>{info["status"]}</Texts.pd>
                <Texts.pd>{info["gender"]}</Texts.pd>
                <Texts.pd>{info["origin"].name}</Texts.pd>
                <Texts.pd>{info["type"] !== "" ? info["type"] : "unknow"}</Texts.pd>
                <Texts.pd>{episodes.join(", ")}</Texts.pd>
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