import { CustomCard } from "../../../components/shared/cards/cards";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import Carousel from "react-bootstrap/esm/Carousel";


export default function Characters() {
    const [data, setData] = useState([]);
    const [groupeds, setGroupeds] = useState([])
    let characterData: IConnection = { url: "/character" }
    useEffect(() => {
        getData(characterData).then(result => {
            console.log(result.results)
            let init = 0;
            let end = 5;
            const groups = [];
            for (let a = 0; a < result["results"].length / 5; a++) {
                const spliced = result["results"].slice(init, end)
                groups.push(spliced);
                init = end;
                end = end + 5;
            }
            setGroupeds(groups);
            setData(result["results"])
        });
    }, [])
    return <div>Characters
        <Carousel pause={"hover"}>
            {
                !isEmpty(groupeds) && groupeds.map(group => {
                    return <Carousel.Item>
                        <div className="d-flex">
                            {group.map(item => {
                                return <CustomCard.Container>
                                    <CustomCard.Img variant="top" src={item.image} />
                                    <CustomCard.Body>
                                        <CustomCard.Title>{item.name}</CustomCard.Title>
                                        <CustomCard.Text>
                                            <div>{item.species}</div>
                                            <div>{item.status}</div>
                                            {item.type !== "" ? <div>{item.type}</div> : ""}
                                        </CustomCard.Text>
                                        {/* <Button variant="primary">Go somewhere</Button> */}
                                    </CustomCard.Body>
                                </CustomCard.Container>
                            })
                            }
                        </div>
                    </Carousel.Item>
                })
            }
        </Carousel>
    </div>
}
