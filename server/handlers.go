package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mattpaynedev/gobble/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// var requestCount int

func (app *application) myCollectionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	// w.Header().Set("Access-Control-Allow-Origin", "*")

	c, err := app.collection.GetAllCollections()
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(c)
	// w.Write(c)

}

func (app *application) singleCollectionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	// w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	// coll, err := app.collection.GetCollectionByID(id)
	// if err != nil {
	// 	app.serverError(w, err)
	// 	return
	// }

	wines, err := app.wine.GetSingleCollectionByID(id, -1)
	if err != nil {
		app.serverError(w, err)
		return
	}

	// app.render(w, r, "collection.page.tmpl", &templateData{Coll: coll, Wines: wines})

	// requestCount++

	json.NewEncoder(w).Encode(wines)
	app.infoLog.Println("Collections Requested:", id)
	// w.Write(c)

}

// func (app *application) drinkWineHandler(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("content-type", "application/json")
// 	// w.Header().Set("Access-Control-Allow-Origin", "*")

// 	vars := mux.Vars(r)
// 	wineID, err := primitive.ObjectIDFromHex(vars["wineID"])
// 	if err != nil {
// 		app.notFound(w)
// 		return
// 	}
// 	collectionID, err := primitive.ObjectIDFromHex(vars["collect"])
// 	if err != nil {
// 		app.notFound(w)
// 		return
// 	}

// 	updatedWine, err := app.wine.DrinkWineByID(wineID, collectionID)
// 	if err != nil {
// 		app.serverError(w, err)
// 		return
// 	}

// 	app.infoLog.Printf("Wine %v marked as consumed.", updatedWine.ID.String())

// 	json.NewEncoder(w).Encode(updatedWine)
// }

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

	app.infoLog.Printf("Wine updated:", updatedWine.ID.String())

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

	fmt.Println("Handler", newWine)

	insertedWine, err := app.wine.AddNewWine(newWine, collectionID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Printf("Wine inserted:", insertedWine.ID.String())

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

	app.infoLog.Printf("Wine updated:", updatedCollection.ID.String())

	json.NewEncoder(w).Encode(updatedCollection)
}
