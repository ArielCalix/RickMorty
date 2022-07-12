import { isEmpty } from "lodash";
import { useEffect, useState, Fragment } from "react";
import Modal from "react-bootstrap/esm/Modal";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import { CustomNav } from '../../../components/navigation/navbar';
import { Unordered } from '../../../components/shared/list/lists';

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
                <Unordered.ul>
                    {
                        episodeCharacters.map(char => {
                            let name = char.split(" - ")[0].split(" ")[0];
                            let status = char.split(" - ")[1].split(" ")[0];
                            return <Unordered.li>
                                <CustomNav.NavLinkDark className="nav-link" to={`/Characters/?name=${name}&status=${status}`}>
                                    {char}
                                </CustomNav.NavLinkDark>
                            </Unordered.li>
                        })
                    }
                </Unordered.ul>
                <CustomButtons.Cancel variant="secondary" onClick={handleClose}>
                    Close
                </CustomButtons.Cancel>
            </Modal.Body>
        </Fragment>
        }
    </Modal>
    );
}