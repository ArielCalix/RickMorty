import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import { IInfo } from "interfaces/IInfo";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import CustomPagination from "../../../components/shared/pagination/pagination";
import CharacterModal from "./characterModal";

export default function Characters() {
    const [info, setInfo] = useState<IInfo>(undefined);
    const [groupeds, setGroupeds] = useState([])
    const [active, setActive] = useState<number>(1)
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const handleModal = (id) => {
        setId(id)
        setShowModal(true);
    }
    useEffect(() => {
        const filter = window.location.search;
        let characterData: IConnection = { url: `/character?page=${active}` }
        characterData.url = (filter) ? `/character/?page=${active}&${filter.replace("?","")}` : characterData.url
        getData(characterData).then(result => {
            let init = 0;
            let end = 5;
            const groups = [];
            const qtyGroups = result["results"].length / 5;
            for (let a = 0; a < qtyGroups; a++) {
                const spliced = result["results"].slice(init, end)
                groups.push(spliced);
                init = end;
                end = end + 5;
            }
            setGroupeds(groups);
            setInfo(result["info"])
        });
    }, [active])
    return <Fragment>
        <Texts.h2l className="my-4">Characters</Texts.h2l>
        <div className="mx-3">
            {
                !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
                    return <div key={"group-" + groupIndex} className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-sm-column flex-lg-row align-items-center">
                            {group.map((item, characterIndex) => {
                                return <CustomCard.Container key={"character-" + characterIndex} className="m-1">
                                    <div className="align-items-center">
                                        <CustomCard.Img variant="top" src={item.image} />
                                        <CustomCard.Body>
                                            <CustomCard.Title>
                                                <span><strong>{item.name}</strong></span>
                                            </CustomCard.Title>
                                            <div className="d-flex flex-column align-items-start mx-1">
                                                <Texts.pd className="mt-1">
                                                    <span><strong>Species: </strong></span>{item.species}
                                                </Texts.pd>
                                                <Texts.pd>
                                                    <span><strong>Status: </strong></span>{item.status}
                                                </Texts.pd>
                                                <Texts.pd>
                                                    <span><strong>Type: </strong></span>{item.type !== "" ? item.type : "unknow"}
                                                </Texts.pd>
                                            </div>
                                        </CustomCard.Body>
                                    </div>
                                    <CustomButtons.Default variant="primary" onClick={() => handleModal(item.id)}>More Info</CustomButtons.Default>
                                </CustomCard.Container>
                            })
                            }
                        </div>
                    </div>
                })
            }
            {showModal && <CharacterModal id={id} show={showModal} setShow={setShowModal}></CharacterModal>}
            <div className="d-flex justify-content-center mt-2">
                {isObject(info) && <CustomPagination pages={info.pages} active={active} setActive={setActive} />}
            </div>
        </div>
    </Fragment>
}
