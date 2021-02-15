package main

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/mattpaynedev/gobble/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (app *application) homeHandler(w http.ResponseWriter, r *http.Request) {

	c, err := app.wines.GetCollection()
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, r, "home.page.tmpl", &templateData{Wines: c})

}

func (app *application) addWineHandler(w http.ResponseWriter, r *http.Request) {
	//TO DO: add the ability to have the program choose an open space in your cellar

	app.render(w, r, "addwine.page.tmpl", nil)

}

func (app *application) collectionsHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get(":id")

	c, err := app.wines.GetWineByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			app.serverError(w, err)
		}
		return
	}

	app.render(w, r, "show.page.tmpl", &templateData{Wine: c})

}

func (app *application) insertWineHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
	}

	producer := r.PostForm.Get("producer")
	grape := r.PostForm.Get("grape")
	region := r.PostForm.Get("region")
	location := r.PostForm.Get("location")
	vintage, err := strconv.Atoi(r.PostForm.Get("vintage"))
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}
	bottlePrice, err := strconv.ParseFloat(r.PostForm.Get("bottleprice"), 64)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}
	//UserID: should be equal to the current user ID
	//CollectionID: should be equal to the current collection ID

	wine, err := app.wines.Insert(producer, grape, region, location, vintage, bottlePrice, primitive.NilObjectID)
	if err != nil {
		app.serverError(w, err)
	}

	http.Redirect(w, r, fmt.Sprintf("/collection/%h", wine), http.StatusSeeOther)

}
