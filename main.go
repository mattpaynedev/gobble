package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/", homeHandler)

	http.ListenAndServe(":4000", r)

}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome home!")
}
