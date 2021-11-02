package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (app *application) routes() http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/collections", app.myCollectionsHandler).Methods("GET")
	r.HandleFunc("/collections/{collect}", app.singleCollectionHandler).Methods("GET")
	r.HandleFunc("/collections/{collect}/addwine", app.addWineHandler).Methods("POST")
	// r.HandleFunc("/collections/{collect}/{wineID}/drinkwine", app.drinkWineHandler).Methods("PUT")
	r.HandleFunc("/collections/{collect}/{wineID}/editwine", app.editWineHandler).Methods("PUT")

	return r
}
