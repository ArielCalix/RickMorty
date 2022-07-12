import { isEmpty } from "lodash";
import { useEffect, useState, Fragment } from "react";
import Modal from "react-bootstrap/esm/Modal";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { CustomButtons } from "../../../components/shared/buttons/buttons";

export default function EpisodeModal({ episodeData, show, setShow }) {
    console.log(episodeData)
    const [episodeCharacters, setEpisodesCharacters] = useState([]);
    useEffect(() => {
        const characters = episodeData.characters.map(res => {
            return res.replace("https://rickandmortyapi.com/api/character/", "")
        })
        let characterData: IConnection = { url: `/character/${characters.join(",")}` }
        getData(characterData).then(response => {
            const chars = response.map(item => {
                return `${item.name} - ${item.status}`
            })
            console.log(chars)
            setEpisodesCharacters(chars)
        })
    }, []);
    const handleClose = () => {
        setShow(false)
    };
    return (<Modal show={show} onHide={handleClose}>
        {!isEmpty(episodeCharacters) && <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{episodeData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <ul>
                    {
                        episodeCharacters.map(char => {
                            return <li>{char}</li>
                        })
                    }
                </ul>
                <CustomButtons.Cancel variant="secondary" onClick={handleClose}>
                    Close
                </CustomButtons.Cancel>
            </Modal.Body>
        </Fragment>
        }
    </Modal>
    );
}