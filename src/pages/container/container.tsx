import Characters from "../partial/characters/characters"
import Episodes from "../partial/episodes/episodes"
import Locations from "../partial/locations/locations"
import { Routes, Route } from "react-router-dom"
import ContainerDiv from "../../components/container/ContainerDiv"

export default function Container() {
    return <ContainerDiv>
        <Routes>
            <Route path="/" element={<Characters />}>
                <Route path="characters" element={<Characters />} />
            </Route>
            <Route path="episodes" element={<Episodes />} />
            <Route path="locations" element={<Locations />} />
        </Routes>
    </ContainerDiv>
}