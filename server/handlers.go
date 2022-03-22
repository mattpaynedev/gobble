package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mattpaynedev/gobble/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (app *application) myCollectionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	c, err := app.collection.GetAllCollections()
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(c)
}

func (app *application) singleCollectionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	wines, err := app.wine.GetSingleCollectionByID(id, -1)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(wines)
	app.infoLog.Println("Collections Requested:", id)
}

func (app *application) editWineHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	vars := mux.Vars(r)
	wineID, err := primitive.ObjectIDFromHex(vars["wineID"])
	if err != nil {
		app.notFound(w)
		return
	}
	collectionID, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	var updates *models.Wines

	err = json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		app.serverError(w, err)
		return
	}

	updatedWine, err := app.wine.EditWineByID(updates, wineID, collectionID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Println("Wine updated:", updatedWine.ID.String())

	json.NewEncoder(w).Encode(updatedWine)
}

func (app *application) addWineHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	vars := mux.Vars(r)
	collectionID, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	var newWine *models.Wines

	err = json.NewDecoder(r.Body).Decode(&newWine)
	if err != nil {
		app.serverError(w, err)
		return
	}

	newWine.ID = primitive.NewObjectID()

	insertedWine, err := app.wine.AddNewWine(newWine, collectionID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Println("Wine inserted:", insertedWine.ID.String())

	json.NewEncoder(w).Encode(insertedWine)
}

func (app *application) updateCollectionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	vars := mux.Vars(r)
	collectionID, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	var updates *models.Collection

	err = json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		app.serverError(w, err)
		return
	}

	updatedCollection, err := app.collection.EditCollection(updates, collectionID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Println("Wine updated:", updatedCollection.ID.String())

	json.NewEncoder(w).Encode(updatedCollection)
}

func (app *application) addCollectionHandler(w http.ResponseWriter, r *http.Request) {
	app.infoLog.Println("new Collection")
	w.Header().Set("content-type", "application/json")

	var newCollection *models.Collection

	err := json.NewDecoder(r.Body).Decode(&newCollection)
	if err != nil {
		app.serverError(w, err)
		return
	}

	newCollection.ID = primitive.NewObjectID()

	app.infoLog.Println("new coll JSON:", newCollection)

	completedCollection, err := app.collection.AddNewCollection(newCollection)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Println("Collection inserted:", completedCollection.ID.String())

	json.NewEncoder(w).Encode(completedCollection)

}
