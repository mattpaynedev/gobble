import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchSingleCollection, toggleWineDrunk } from "../features/wine/wineSlice";
import WineCard from "./WineCard";
import Filters from "./Filters";
import store from "../store";


const getWinesInCollection = (state) => {
    return Object.values(state.wine).slice();
}

const getCollectionName = (collectionID) => {
    return (state) => {
        return state.collection[collectionID].name
    }
}

function Wines() {
    let { collectionID } = useParams();
    useEffect(fetchSingleCollection(collectionID), []);
    const dispatch = useDispatch();


    const wineList = useSelector(getWinesInCollection, shallowEqual)
    const collectionName = useSelector(getCollectionName(collectionID))
    let renderedWine
    let renderedPage

    const handleDrinkWineClick = (wineID, collectionID) => {

        const handleClickFunc = () => {
            dispatch(toggleWineDrunk(wineID, collectionID))
        }

        return handleClickFunc
    }


    if (wineList) {
        // renderedWine = wineList
        //     .filter(wine => wine.hasdrunk === false)
        //     .map(wine => {
        //         return (

        //             <tr key={wine.id}>
        //                 <td><Link to={'/collection/' + wine.id + '/'}>{wine.producer}</Link></td>
        //                 {(wine.vintage === 0) ? <td>N/V</td> : <td>{wine.vintage}</td>}
        //                 <td>{wine.region}</td>
        //                 <td>{wine.grape}</td>
        //                 <td>{wine.location}</td>
        //                 <td><button onClick={handleDrinkWineClick(wine.id, collectionID)}>Drink It!</button>
        //                     <Link to={'/collection/' + wine.id +
        //                         '/ delete '}><button
        //                             className='btn-smalldelete'>Delete</button></Link>
        //                 </td>
        //             </tr>
        //         )
        //     })

        renderedWine = wineList.map(wine => {
            return (
                <div className='card-wrapper'>
                    <WineCard
                        id={wine.id}
                        producer={wine.producer}
                        grape={wine.grape}
                        region={wine.region}
                        vintage={wine.vintage}
                        location={wine.location}
                        bottleprice={wine.bottleprice}
                        numberavailable={wine.hasdrunk}
                    />
                </div>
            )
        })


        renderedPage = (
            <div>
                <h2>Collection Component</h2>
                <div className='collection-container'>
                    <div className='filter-wrapper'>
                        <Filters />
                    </div>
                    {renderedWine}
                </div>
            </div>
        )
        // (
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th key="producer">Producer</th>
        //                 <th key="vintage">Vintage</th>
        //                 <th key="region">Region</th>
        //                 <th key="grape">Grape/Style</th>
        //                 <th key="location">Location</th>
        //                 <th key="actions">Actions</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {renderedWine}
        //         </tbody>
        //     </table>
        // )
    } else {
        renderedPage = (
            <p> There's nothing to see here yet!</p>
        )
    }

    return (

        <div>
            <h2>Collection: {collectionName}
                <span style={{ float: "right" }}>
                    <Link to={'/collection/' + collectionID + '/addwine'}>+ Add a New Wine</Link>
                </span>
            </h2>
            {renderedPage}
        </div >
    )
}

export default Wines
