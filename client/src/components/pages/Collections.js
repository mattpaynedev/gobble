import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShowCollection from "../ShowCollection";
import { Box } from "grommet";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";

const getAllCollections = (state) => Object.values(state.collections)

function Collections() {
    const [collID, setCollID] = useState("")
    const allCollections = useSelector(getAllCollections, shallowEqual)

    useEffect(() => {
        if (allCollections.length) {
            setCollID(allCollections[0].id)
        }
    }, [allCollections])

    return (
        <Box
            minHeight='100vh'
        >
            <HeaderComponent />
            {allCollections.length ? <ShowCollection collID={collID} changeCollFunc={setCollID} allCollections={Object.values(allCollections)} /> : null}
            <FooterComponent />
        </Box>
    )
}

export default Collections