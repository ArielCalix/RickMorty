import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import CustomPagination from "../../../components/shared/pagination/pagination";
import { IInfo } from "interfaces/IInfo";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import { Spinner } from "react-bootstrap"

export default function Locations() {
    const [info, setInfo] = useState<IInfo>(undefined);
    const [groupeds, setGroupeds] = useState([]);
    const [active, setActive] = useState<number>(1);
    const handleModal = (episodeName, episodeChars) => {
        // setEpisodeCharacters({ name: episodeName, characters: episodeChars })
        // setShowModal(true);
    }
    useEffect(() => {
        let characterData: IConnection = { url: `/location?page=${active}` }
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
        <Texts.h2l className="my-4">Locations</Texts.h2l>
        {
            !isEmpty(groupeds) ? groupeds.map((group, groupIndex) => {
                return <div key={"group-" + groupIndex} className="d-flex justify-content-center" >
                    <div className="d-flex flex-lg-row flex-sm-column flex-md-column align-items-center">
                        {group.map((item, episodeIndex) => {
                            return <CustomCard.Container key={"episode-" + episodeIndex} className="m-1">
                                <CustomCard.Body>
                                    <CustomCard.Title>{item.name}</CustomCard.Title>
                                    <Texts.pd className="mt-1"><span><strong>Dimension: </strong></span>{item.dimension}</Texts.pd>
                                    <Texts.pd><span><strong>Type: </strong></span>{item.type !== "" ? item.type : ""}</Texts.pd>
                                </CustomCard.Body>
                                <CustomButtons.Link className="btn" to={`/Location/?id=${item.id}`}>
                                    view Residents
                                </CustomButtons.Link>
                            </CustomCard.Container>
                        })
                        }
                    </div>
                </div>
            }) : <Spinner variant="light" animation="grow" />
        }
        <div className="d-flex justify-content-center mt-2">
            {isObject(info) && <CustomPagination pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </Fragment>
}
