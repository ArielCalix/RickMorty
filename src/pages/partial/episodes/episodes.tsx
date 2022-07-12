import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import { Pagination } from "react-bootstrap";
import { IInfo } from "interfaces/IInfo";
import EpisodeModal from "./episodeModal";

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
    const [episodeCharacters, setEpisodeCharacters] = useState({});
    const handleModal = (episodeName, episodeChars) => {
        setEpisodeCharacters({ name: episodeName, characters: episodeChars })
        setShowModal(true);
    }
    useEffect(() => {
        let episodeData: IConnection = { url: `/episode?page=${active}` }
        getData(episodeData).then(result => {
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
        <Texts.h2l>Episodes</Texts.h2l>
        {
            !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
                return <div key={"group-" + groupIndex} className="d-flex justify-content-center" >
                    <div className="d-flex flex-sm-column flex-lg-row align-items-center">
                        {group.map((item, episodeIndex) => {
                            return <CustomCard.Container key={"episode-" + episodeIndex} className="m-1">
                                <CustomCard.Body>
                                    <CustomCard.Title>{item.name}</CustomCard.Title>
                                    <Texts.pd className="mt-1">{item.air_date}</Texts.pd>
                                    <Texts.pd>{item.episode}</Texts.pd>
                                </CustomCard.Body>
                                <CustomButtons.Default variant="primary" onClick={() => handleModal(item.name, item.characters)}>View Characters</CustomButtons.Default>
                            </CustomCard.Container>
                        })
                        }
                    </div>
                </div>
            })
        }
        {showModal && <EpisodeModal episodeData={episodeCharacters} show={showModal} setShow={setShowModal}></EpisodeModal>}
        <div className="d-flex justify-content-center mt-2">
            {isObject(info) && <PaginationBasic pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </Fragment>
}
