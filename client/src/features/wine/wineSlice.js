import axios from 'axios';
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

        case 'wine/addWine': {
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

export function addWine(wineInfo, collectionInfo, collectionID, userID) {
    return function addWineThunk(dispatch) {

        const wineAddress = apiAddress + "/collections/" + collectionID + "/addwine"
        // const collAddress = apiAddress + "/collections/" + collectionID + "/update"

        const wineData = JSON.stringify(wineInfo)
        // const collData = JSON.stringify(collectionInfo)

        // const addWineRequest = () => axios.post(wineAddress, wineData)
        // const updateCollRequest = () => axios.put(collAddress, collData)

        axios
            .post(wineAddress, wineData)
            .then(wineResponse => {
                store.dispatch({
                    type: 'wine/addWine',
                    payload: wineResponse.data,
                })


            })
            .catch(err => {
                console.log("ERROR FETCHING DATA: ", err)
            })
    }
}