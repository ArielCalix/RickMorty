import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import CustomPagination from "../../../components/shared/pagination/pagination";
import { IInfo } from "interfaces/IInfo";
import EpisodeModal from "./episodeModal";

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
        <Texts.h2l className="my-4">Episodes</Texts.h2l>
        {
            !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
                return <div key={"group-" + groupIndex} className="d-flex justify-content-center" >
                    <div className="d-flex flex-sm-column flex-lg-row align-items-center">
                        {group.map((item, episodeIndex) => {
                            return <CustomCard.Container key={"episode-" + episodeIndex} className="m-1">
                                <CustomCard.Body>
                                    <CustomCard.Title>{item.name}</CustomCard.Title>
                                    <Texts.pd className="mt-1"><span><strong>Emision: </strong></span>{item.air_date}</Texts.pd>
                                    <Texts.pd><span><strong>Episode: </strong></span>{item.episode}</Texts.pd>
                                </CustomCard.Body>
                                <CustomButtons.Default variant="primary" onClick={() => handleModal(item.name, item.characters)}>View Characters</CustomButtons.Default>
                            </CustomCard.Container>
                        })
                        }
                    </div>
                </div>
            })
        }
        {showModal && <EpisodeModal
            episodeData={episodeCharacters}
            show={showModal} setShow={setShowModal} />}
        <div className="d-flex justify-content-center mt-2">
            {isObject(info) && <CustomPagination pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </Fragment>
}
