import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../features/collection/collectionSlice";
import { useEffect } from "react";
import ShowCollection from "../ShowCollection";
import Header from "../Header";
import Footer from "../Footer";
import { Box, Button } from "grommet";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import { fetchSingleCollection } from "../../features/wine/wineSlice";

const getCollections = (state) => {
    return Object.values(state.wine).slice();
}

function Collections() {
    useEffect(fetchSingleCollection("6032def2900ef3a9b2b1d8f4"), [])


    const collection = useSelector(getCollections, shallowEqual)

    return (
        <Box
            minHeight='100vh'
        >
            <HeaderComponent />
            {collection ? <ShowCollection collection={collection} /> : null}
            <FooterComponent />
        </Box>
    )
}

export default Collections