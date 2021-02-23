package main

import (
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func (app *application) routes() http.Handler {
	//UPDATE with POST PUT DELETE Methods to clean up URLs
	//Fix Delete handlers to work with Collections
	//Undo Stack for marking a wine as Drunk

	r := mux.NewRouter()
	r.HandleFunc("/", app.homeHandler).Methods("GET")
	r.HandleFunc("/mycollections", app.myCollectionsHandler).Methods("GET")
	r.HandleFunc("/addcollection", app.addCollectionHandler).Methods("GET")
	r.HandleFunc("/insertcollection", app.insertCollectionHandler).Methods("POST")
	r.HandleFunc("/collection/{collect}", app.collectionsHandler).Methods("GET")
	r.HandleFunc("/collection/{collect}/{wine}", app.viewWineHandler).Methods("GET")
	r.HandleFunc("/addwine", app.addWineHandler).Methods("GET")
	r.HandleFunc("/insertwine", app.insertWineHandler).Methods("POST")
	r.HandleFunc("/deletewine/{id}", app.deleteWineHandler).Methods("GET")
	r.HandleFunc("/confirmdelete/{id}", app.confirmDeleteHandler).Methods("GET")
	r.HandleFunc("/collection/{collect}/drinkwine/{wine}", app.drinkWineHandler).Methods("GET")

	fileServer := http.FileServer(http.Dir("./ui/static"))

	// serveStatic(r, "./ui/static/")
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static", fileServer))

	return r
}

func serveStatic(r *mux.Router, staticDirectory string) {
	staticPaths := map[string]string{
		"css": staticDirectory + "/css/",
		"img": staticDirectory + "/img/",
		"js":  staticDirectory + "/js/",
	}
	for pathName, pathValue := range staticPaths {
		pathPrefix := "/" + pathName + "/"
		r.PathPrefix(staticDirectory + pathPrefix).Handler(http.StripPrefix(pathPrefix, http.FileServer(http.Dir(pathValue))))
	}

}

type neuteredFileSystem struct {
	fs http.FileSystem
}

func (nfs neuteredFileSystem) Open(path string) (http.File, error) {
	f, err := nfs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, err := f.Stat()
	if s.IsDir() {
		index := filepath.Join(path, "index.html")
		if _, err := nfs.fs.Open(index); err != nil {
			closeErr := f.Close()
			if closeErr != nil {
				return nil, closeErr
			}
			return nil, err
		}
	}
	return f, nil
}
