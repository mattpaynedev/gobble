package main

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
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

	years := app.generateDateValues()

	app.render(w, r, "addwine.page.tmpl", &templateData{Years: years})

}

func (app *application) collectionsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		app.notFound(w)
		return
	}

	c, err := app.wines.GetWineByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			fmt.Println("get wine by ID")
			app.serverError(w, err)
		}
		return
	}

	app.render(w, r, "show.page.tmpl", &templateData{Wine: c})

}

func (app *application) insertWineHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		fmt.Println("parseform")
		app.clientError(w, http.StatusBadRequest)
	}

	vintage := 0
	producer := r.PostForm.Get("producer")
	grape := r.PostForm.Get("grape")
	region := r.PostForm.Get("region")
	location := r.PostForm.Get("location")

	if r.PostForm.Get("nonvintage") == "true" {
		vintage = 0
	} else {
		vintage, err = strconv.Atoi(r.PostForm.Get("vintage"))
		if err != nil {
			fmt.Println("vintage")
			app.clientError(w, http.StatusBadRequest)
			return
		}
	}

	bottlePrice, err := strconv.ParseFloat(r.PostForm.Get("bottleprice"), 64)
	if err != nil {
		fmt.Println("bottleprice")
		app.clientError(w, http.StatusBadRequest)
		return
	}
	//UserID: should be equal to the current user ID
	//CollectionID: should be equal to the current collection ID

	wine, err := app.wines.Insert(producer, grape, region, location, vintage, bottlePrice, primitive.NilObjectID)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Inserted a wine with ID:", wine)

	http.Redirect(w, r, fmt.Sprintf("/collection/%s", wine), http.StatusSeeOther)

}

func (app *application) deleteWineHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		app.notFound(w)
		return
	}

	c, err := app.wines.GetWineByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			fmt.Println("get wine by ID")
			app.serverError(w, err)
		}
		return
	}

	app.render(w, r, "delete.page.tmpl", &templateData{Wine: c})

}

func (app *application) confirmDeleteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		app.notFound(w)
		return
	}

	deleteResult, err := app.wines.DeleteWineByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			fmt.Println("get wine by ID")
			app.serverError(w, err)
		}
		return
	}

	app.infoLog.Println("Delete Result:", deleteResult.DeletedCount, "documents deleted.")

	http.Redirect(w, r, fmt.Sprint("/"), http.StatusSeeOther)

}
