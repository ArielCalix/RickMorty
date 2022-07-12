import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import { Pagination } from "react-bootstrap";
import { IInfo } from "interfaces/IInfo";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import CharacterModal from "./characterModal";


function PaginationBasic({ pages, active, setActive }) {
    let items = [];
    const disabledPrev = active === 1;
    const disabledNext = active === pages;
    let numb = (active > 2) ? active - 2 : (active > 1) ? active - 1 : active;
    const length = (active < pages - 2) ? active + 2 : pages;
    numb = (length < pages - 2) ? numb : (length < pages) ? numb : numb;
    for (let number = numb; number <= length; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return <Fragment>
        <Pagination>
            <Pagination.Prev disabled={disabledPrev} onClick={() => setActive(active - 1)} />
            <Pagination>{items}</Pagination>
            <Pagination.Next disabled={disabledNext} onClick={() => setActive(active + 1)} />
        </Pagination>
    </Fragment>
}

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
        let characterData: IConnection = { url: `/character?page=${active}` }
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
    return <div className="mx-3">
        <Texts.h2d>Characters</Texts.h2d>
        {
            !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
                return <div key={"group-" + groupIndex} className="d-flex justify-content-center">
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
            {isObject(info) && <PaginationBasic pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </div>
}
