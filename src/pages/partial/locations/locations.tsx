import { useEffect, useState, Fragment } from "react";
import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty, isObject } from "lodash";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { Texts } from "../../../components/layout/text";
import { Pagination } from "react-bootstrap";
import { IInfo } from "interfaces/IInfo";


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
            {isObject(info) && <PaginationBasic pages={info.pages} active={active} setActive={setActive} />}
        </div>
    </Fragment>
}
