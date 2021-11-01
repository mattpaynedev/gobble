import axios from 'axios';
import { useDispatch } from 'react-redux';
import store from '../../store';
import { apiAddress } from '../../utils';

/* 
Wine example:
{
        id:           primitive.NewObjectID(),
        producer:     producer,
        vintage:      vintage,
        grape:        grape,
        region:       region,
        bottleprice:  bottlePrice,
        locations:    locations,
        collectionid: collection,
        userid:       userID,
        hasdrunk:     false,
    }

Collection example:
{
        id:       primitive.NewObjectID(),
        name:     name,
        rows:     rows,
        columns:  columns,
        capacity: rows * columns,
        userid:   userID,
    }
*/

const initialState = {};

export default function wineReducer(state = initialState, action) {
    switch (action.type) {
        case 'wine/wineLoaded': {
            return action.payload;
        }

        case 'wine/singleCollectionLoaded': {
            return action.payload;
        }

        case 'wine/drinkWine': {
            const wineID = action.payload.id
            return {
                ...state,
                [wineID]: action.payload
            }
        }

        case 'wine/changeQuantity': {
            const wineID = action.payload.id
            return {
                ...state,
                [wineID]: action.payload
            }
        }

        case 'wine/editWine': {
            const wineID = action.payload.id
            return {
                ...state,
                [wineID]: action.payload
            }
        }

        case 'wine/getState': {
            return state;
        }

        default: {
            return state;
        }
    }
}

export function fetchSingleCollection(collectionID, userID) {
    return function fetchSigngleCollectionThunk(dispatch) {
        console.log(apiAddress + "/collections/" + collectionID)
        axios
            .get(apiAddress + "/collections/" + collectionID)
            .then(response => {
                store.dispatch({
                    type: 'wine/singleCollectionLoaded',
                    payload: response.data,
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })
    }
}

export function drinkWine(wineID, collectionID, userID) {


    return function drinkWineThunk(dispatch) {

        const address = apiAddress + "/collections/" + collectionID + "/" + wineID + "/drinkwine"

        axios
            .put(address)
            .then(response => {
                store.dispatch({
                    type: 'wine/drinkWine',
                    payload: response.data,
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })


    }
}

export function changeWineQuantity(amountToAdd, wineID, collectionID, userID) {


    return function changeWineQuantityThunk(dispatch) {

        const address = apiAddress + "/collections/" + collectionID + "/" + wineID + "/changequantity?quantity=" + String(amountToAdd)

        axios
            .put(address)
            .then(response => {
                store.dispatch({
                    type: 'wine/changeQuantity',
                    payload: response.data,
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })


    }
}

export function editWine(changes, wineID, collectionID, userID) {


    return function changeWineQuantityThunk(dispatch) {

        const address = apiAddress + "/collections/" + collectionID + "/" + wineID + "/editwine"

        const data = JSON.stringify(changes)

        console.log(data)

        axios
            .put(address, data)
            .then(response => {
                store.dispatch({
                    type: 'wine/editWine',
                    payload: response.data,
                })
            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })


    }
}