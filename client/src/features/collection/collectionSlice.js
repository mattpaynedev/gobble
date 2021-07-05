import axios from 'axios';
import store from '../../store';
import { apiAddress } from '../../utils';

/* 
Wine example:
{
        ID:           primitive.NewObjectID(),
        Producer:     producer,
        Vintage:      vintage,
        Grape:        grape,
        Region:       region,
        BottlePrice:  bottlePrice,
        Location:     location,
        CollectionID: collection,
        UserID:       userID,
        HasDrunk:     false,
    }

Collection example:
{
        ID:       primitive.NewObjectID(),
        Name:     name,
        Rows:     rows,
        Columns:  columns,
        Capacity: rows * columns,
        UserID:   userID,
    }
*/



// const initialState = {};

export default function collectionReducer(state = {}, action) {
    switch (action.type) {
        case 'collection/collectionsLoaded': {
            return action.payload
        }

        default: {
            return state;
        }
    }
}

export function fetchCollections(userID) {
    return function fetchCollectionThunk(dispatch) {
        axios
            .get(apiAddress + "/collections")
            .then(response => {
                store.dispatch({
                    type: 'collection/collectionsLoaded',
                    payload: response.data,
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })
    }
}




    // const params = JSON.stringify(
    //     {
    //         collID: collectionID,
    //         userID: userID,
    //         hasDrunk: false,
    //     }
    // )