import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { getData } from "../../../utillities/connection/crud";
import { IConnection } from "../../../utillities/connection/IConnection";
import { CustomButtons } from "../../../components/shared/buttons/buttons";
import { Texts } from "../../../components/layout/text";
import { CustomCard } from "../../../components/shared/cards/cards";
import CharacterModal from "../characters/characterModal";

export default function Location() {
    const [groupeds, setGroupeds] = useState([])
    const [active, setActive] = useState<number>(1);
    const [locationInfo, setLocationInfo] = useState({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const handleModal = (id) => {
        setId(id)
        setShowModal(true);
    }
    const getResidents = (locationResidents) => {
        const residents = locationResidents.map(resident => {
            return resident.replace("https://rickandmortyapi.com/api/character/", "");
        })
        let characterData: IConnection = { url: `/character/${residents.join(',')}` }
        getData(characterData).then(result => {
            let init = 0;
            let end = 5;
            const groups = [];
            const qtyGroups = result.length / 5;
            for (let a = 0; a < qtyGroups; a++) {
                const spliced = result.slice(init, end)
                groups.push(spliced);
                init = end;
                end = end + 5;
            }
            setGroupeds(groups);
        });
    }
    useEffect(() => {
        const filter = window.location.search;
        let locationData: IConnection = { url: `/location/${filter.split("=")[1]}` }
        console.log(locationData)
        getData(locationData).then(result => {
            let init = 0;
            let end = 5;
            const groups = [];
            console.log(result)
            if (result)
                getResidents(result["residents"])
            setLocationInfo(result)
        });
    }, [active])
    return <div>
        {locationInfo && <div className="d-flex flex-column align-items-center mx-5">
            <h1 className="text-light">{locationInfo["name"]}</h1>
            <div className="d-flex col-12 flex-column align-items-start">
                <h3 className="text-light"><span><strong>type: </strong></span> {`${locationInfo["type"]}`}</h3>
                <h3 className="text-light"><span><strong>dimension: </strong></span>{`${locationInfo["dimension"]}`}</h3>
            </div>
        </div>
        }
        {!isEmpty(groupeds) && !isEmpty(groupeds) && groupeds.map((group, groupIndex) => {
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
    </div>
}