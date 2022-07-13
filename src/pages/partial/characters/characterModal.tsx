import { CustomModal } from "../../../components/shared/modal/modal";
import { Texts } from "../../../components/layout/text";
import { isEmpty } from "lodash";
import { useEffect, useState, Fragment } from "react";
import { Carousel, Tab, Tabs } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { CustomButtons } from "../../../components/shared/buttons/buttons";

export default function CharacterModal({ id, show, setShow }) {
    const [info, setInfo] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [key, setKey] = useState('info');
    useEffect(() => {
        let characterData: IConnection = { url: `/character/${id}` }
        getData(characterData).then(result => {
            const episodesList = result["episode"].map(ep => {
                let episode = ep.split("/")[4];
                let episodeNumber = ep.split("/")[5];
                return `${episode.charAt(0).toUpperCase() + episode.slice(1)} ${episodeNumber}`
            })
            let init = 0;
            let end = 10;
            const groups = [];
            const qtyGroups = episodesList.length / 10;
            for (let a = 0; a < qtyGroups; a++) {
                const spliced = episodesList.slice(init, end)
                groups.push(spliced);
                init = end;
                end = end + 10;
            }
            console.log(groups)
            setEpisodes(groups);
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
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="info" title="Information">
                        <CustomModal.BodyContainer className="d-flex flex-row mx-2">
                            <CustomModal.BodyContainer className="mx-2">
                                <CustomModal.Img src={info["image"]} />
                            </CustomModal.BodyContainer>
                            <CustomModal.BodyContainer className="mx-2">
                                <Texts.pd className="mt-1">
                                    <span>
                                        <strong>Especie: </strong>
                                    </span>
                                    {info["species"]}
                                </Texts.pd>
                                <Texts.pd>
                                    <span>
                                        <strong>Status: </strong>
                                    </span>
                                    {info["status"]}
                                </Texts.pd>
                                <Texts.pd>
                                    <span>
                                        <strong>Gender: </strong>
                                    </span>
                                    {info["gender"]}
                                </Texts.pd>
                                <Texts.pd>
                                    <span>
                                        <strong>Origin: </strong>
                                    </span>
                                    {info["origin"].name}
                                </Texts.pd>
                                <Texts.pd>
                                    <span>
                                        <strong>Type: </strong>
                                    </span>
                                    {info["type"] !== "" ? info["type"] : "unknow"}
                                </Texts.pd>
                            </CustomModal.BodyContainer>
                        </CustomModal.BodyContainer>
                    </Tab>
                    <Tab eventKey="epsodes" title="Episodes">
                        <CustomModal.BodyContainer className="mx-2">
                            <Carousel variant="dark" indicators={false} controls={(episodes.length > 1)}>
                                {!isEmpty(episodes) &&
                                    episodes.map(group => {
                                        console.log(group)
                                        return <Carousel.Item>
                                            <ul className="d-flex flex-column align-items-center">
                                                {
                                                    group.map(episode => {
                                                        return <li>{episode}</li>
                                                    })
                                                }
                                            </ul>
                                        </Carousel.Item>
                                    })
                                }
                            </Carousel>
                        </CustomModal.BodyContainer>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <CustomButtons.Cancel variant="secondary" onClick={handleClose}>
                    Close
                </CustomButtons.Cancel>
            </Modal.Footer>
        </Fragment>
        }
    </Modal>
    );
}