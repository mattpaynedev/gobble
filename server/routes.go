package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (app *application) routes() http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/collections", app.myCollectionsHandler).Methods("GET")
	r.HandleFunc("/collections/{collect}", app.singleCollectionHandler).Methods("GET")
	r.HandleFunc("/collections/{collect}/{wineID}/drinkwine", app.drinkWineHandler).Methods("PUT")

	return r
}
