import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../features/collection/collectionSlice";
import { useEffect, useState } from "react";
import ShowCollection from "../ShowCollection";
import Header from "../Header";
import Footer from "../Footer";
import { Box, Button } from "grommet";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import { fetchSingleCollection } from "../../features/wine/wineSlice";

const getCollections = (state) => {
    return Object.values(state.wine);
}

const getAllCollections = (state) => state.collections

function Collections() {
    const [collID, setCollID] = useState("6032def2900ef3a9b2b1d8f4")
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchSingleCollection(collID))
    }, [dispatch, collID])

    const collection = useSelector(getCollections, shallowEqual)
    const allCollections = useSelector(getAllCollections, shallowEqual)

    return (
        <Box
            minHeight='100vh'
        >
            <HeaderComponent />
            {collection ? <ShowCollection collection={collection} allCollections={Object.values(allCollections)} /> : null}
            <FooterComponent />
        </Box>
    )
}

export default Collections