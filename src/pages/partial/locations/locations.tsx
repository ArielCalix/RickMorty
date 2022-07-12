import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import CustomPagination from "../../../components/shared/pagination/pagination";
import { IInfo } from "interfaces/IInfo";

export default function Locations() {
    const [info, setInfo] = useState<IInfo>(undefined);
    const [groupeds, setGroupeds] = useState([])
    const [active, setActive] = useState<number>(1)
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
        <Texts.h2l>Locations</Texts.h2l>
        {
            !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
                return <div key={"group-" + groupIndex} className="d-flex justify-content-center" >
                    <div className="d-flex flex-lg-row flex-sm-column flex-md-column align-items-center">
                        {group.map((item, episodeIndex) => {
                            return <CustomCard.Container key={"episode-" + episodeIndex} className="m-1">
                                <CustomCard.Body>
                                    <CustomCard.Title>{item.name}</CustomCard.Title>
                                    <Texts.pd className="mt-1">{item.dimension}</Texts.pd>
                                    <Texts.pd>{item.type !== "" ? item.type : ""}</Texts.pd>
                                    {/* <Button variant="primary">Go somewhere</Button> */}
                                </CustomCard.Body>
                            </CustomCard.Container>
                        })
                        }
                    </div>
                </div>
            })
        }
        <div className="d-flex justify-content-center mt-2">
            {isObject(info) && <CustomPagination pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </Fragment>
}
