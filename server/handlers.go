package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var requestCount int

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

	wines, err := app.wine.GetSingleCollectionByID(id, 0)
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

func (app *application) drinkWineHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	// w.Header().Set("Access-Control-Allow-Origin", "*")

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

	updatedWine, err := app.wine.DrinkWineByID(wineID, collectionID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.infoLog.Printf("Wine %v marked as consumed.", updatedWine.ID.String())

	json.NewEncoder(w).Encode(updatedWine)
}
