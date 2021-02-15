package main

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
)

func (app *application) routes() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/", app.homeHandler).Methods("GET")
	r.HandleFunc("/collection/:id", app.collectionsHandler).Methods("GET")
	r.HandleFunc("/addwine", app.addWineHandler).Methods("GET")
	r.HandleFunc("/insertwine", app.insertWineHandler).Methods("POST")

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
		fmt.Println(staticDirectory + pathName)
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
