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

	c, err := app.coll.GetAllCollections()
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, r, "home.page.tmpl", &templateData{Colls: c})

}

func (app *application) myCollectionsHandler(w http.ResponseWriter, r *http.Request) {

	c, err := app.coll.GetAllCollections()
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, r, "mycollections.page.tmpl", &templateData{Colls: c})

}

func (app *application) addWineHandler(w http.ResponseWriter, r *http.Request) {
	//TO DO: add the ability to have the program choose an open space in your cellar

	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.errorLog.Println("addWineHandler")
		app.notFound(w)
		return
	}

	coll, err := app.coll.GetCollectionByID(id)
	if err != nil {
		app.serverError(w, err)
		return
	}

	years := app.generateDateValues()

	app.render(w, r, "addwine.page.tmpl", &templateData{Coll: coll, Years: years})

}

func (app *application) collectionsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	coll, err := app.coll.GetCollectionByID(id)
	if err != nil {
		app.serverError(w, err)
		return
	}

	wines, err := app.wines.GetCollection(id, false)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, r, "collection.page.tmpl", &templateData{Coll: coll, Wines: wines})

}

func (app *application) viewWineHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	wine, err := primitive.ObjectIDFromHex(vars["wine"])
	if err != nil {
		app.notFound(w)
		return
	}
	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	coll, err := app.coll.GetCollectionByID(collect)
	if err != nil {
		app.serverError(w, err)
		return
	}

	result, err := app.wines.GetWineByID(wine, collect)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			fmt.Println("get wine by ID")
			app.serverError(w, err)
		}
		return
	}

	app.render(w, r, "show.page.tmpl", &templateData{Wine: result, Coll: coll})

}

func (app *application) insertWineHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		fmt.Println("parseform")
		app.clientError(w, http.StatusBadRequest)
	}

	vintage := 0
	collect, err := primitive.ObjectIDFromHex(r.PostForm.Get("collection"))
	if err != nil {
		app.notFound(w)
		return
	}
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

	wine, err := app.wines.InsertWine(producer, grape, region, location, vintage, bottlePrice, collect, primitive.NilObjectID)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Inserted a wine with ID:", wine)

	http.Redirect(w, r, fmt.Sprintf("/collection/%s", collect.Hex()), http.StatusSeeOther)

}

func (app *application) deleteWineHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["wine"])
	if err != nil {
		app.notFound(w)
		return
	}

	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	coll, err := app.coll.GetCollectionByID(collect)
	if err != nil {
		app.serverError(w, err)
		return
	}

	c, err := app.wines.GetWineByID(id, collect)
	if err != nil {
		if errors.Is(err, models.ErrNoRecords) {
			app.notFound(w)
		} else {
			fmt.Println("get wine by ID")
			app.serverError(w, err)
		}
		return
	}

	app.render(w, r, "delete.page.tmpl", &templateData{Coll: coll, Wine: c})

}

func (app *application) confirmDeleteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(vars["wine"])
	if err != nil {
		app.notFound(w)
		return
	}

	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	deleteResult, err := app.wines.DeleteWineByID(id, collect)
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

	http.Redirect(w, r, fmt.Sprintf("/collection/%s", collect.Hex()), http.StatusSeeOther)

}

func (app *application) addCollectionHandler(w http.ResponseWriter, r *http.Request) {
	//TO DO: add the ability to have the program choose an open space in your cellar

	app.render(w, r, "addcoll.page.tmpl", nil)

}

func (app *application) insertCollectionHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		fmt.Println("parseform")
		app.clientError(w, http.StatusBadRequest)
	}

	name := r.PostForm.Get("name")
	rows, err := strconv.Atoi(r.PostForm.Get("rows"))
	if err != nil {
		fmt.Println("rows")
		app.clientError(w, http.StatusBadRequest)
		return
	}
	columns, err := strconv.Atoi(r.PostForm.Get("columns"))
	if err != nil {
		fmt.Println("columns")
		app.clientError(w, http.StatusBadRequest)
		return
	}

	//UserID: should be equal to the current user ID
	//CollectionID: should be equal to the current collection ID

	coll, err := app.coll.InsertCollection(name, rows, columns, primitive.NilObjectID)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Inserted a collection with ID:", coll)

	http.Redirect(w, r, fmt.Sprint("/"), http.StatusSeeOther)

}

func (app *application) drinkWineHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	wine, err := primitive.ObjectIDFromHex(vars["wine"])
	if err != nil {
		app.notFound(w)
		return
	}
	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	result, err := app.wines.DrinkWineByID(wine, collect)
	if err != nil {
		app.infoLog.Println("get wine by ID")
		app.serverError(w, err)
		return
	}

	app.infoLog.Printf("Drink Result: %v wine(s) marked as consumed.", result.ModifiedCount)

	http.Redirect(w, r, fmt.Sprintf("/collection/%s", collect.Hex()), http.StatusSeeOther)

}

func (app *application) collectionInfoHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	coll, err := app.coll.GetCollectionByID(collect)
	if err != nil {
		app.serverError(w, err)
		return
	}

	app.render(w, r, "collinfo.page.tmpl", &templateData{Coll: coll})

}

func (app *application) editCollectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	err := r.ParseForm()
	if err != nil {
		fmt.Println("parseform")
		app.clientError(w, http.StatusBadRequest)
	}

	name := r.PostForm.Get("name")
	rows, err := strconv.Atoi(r.PostForm.Get("rows"))
	if err != nil {
		fmt.Println("rows")
		app.clientError(w, http.StatusBadRequest)
		return
	}
	columns, err := strconv.Atoi(r.PostForm.Get("columns"))
	if err != nil {
		fmt.Println("columns")
		app.clientError(w, http.StatusBadRequest)
		return
	}

	collect, err := primitive.ObjectIDFromHex(vars["collect"])
	if err != nil {
		app.notFound(w)
		return
	}

	_, err = app.coll.EditCollectionByID(collect, primitive.NilObjectID, name, rows, columns)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Inserted a collection with ID:", collect)

	http.Redirect(w, r, fmt.Sprint("/mycollections"), http.StatusSeeOther)

}
