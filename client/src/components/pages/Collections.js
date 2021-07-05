import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../features/collection/collectionSlice";
import { useEffect } from "react";
import Collection from "./Collection";

const getCollections = (state) => {
    return Object.values(state.collection).slice();
}

function Collections() {
    useEffect(fetchCollections(), [])


    const collectionsList = useSelector(getCollections, shallowEqual)
    let renderedCollections
    let renderedPage

    if (collectionsList) {
        renderedCollections = collectionsList.map((collection) => {
            return (
                <tr key={collection.id}>
                    <td><Link to={'/collections/' + collection.id}>{collection.name}</Link></td>
                    <td>{collection.capacity}</td>
                    <td><Link to={'/collections/' + collection.id + '/edit'}><button>Edit</button></Link></td>
                </tr>
            )
        })

        renderedPage = (
            <table>
                <thead>
                    <tr>
                        <th key="name">Name</th>
                        <th key="capacity">Capacity</th>
                        <th key="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedCollections}
                </tbody>
            </table>
        )
    } else {
        renderedPage = (
            <p> There's nothing to see here yet!</p>
        )
    }



    return (
        <div>

            <h2>Your Collections</h2>
            {renderedPage}
            <br />
            <Collection />
        </div>
    );
}

export default Collections