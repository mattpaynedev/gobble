package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime/debug"
	"time"

	"github.com/gorilla/handlers"
	"github.com/mattpaynedev/gobble/server/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type application struct {
	errorLog   *log.Logger
	infoLog    *log.Logger
	collection mongodb.CollectionModel
	wine       mongodb.WineModel
}

func main() {
	infoLog := log.New(os.Stdout, "INFO:\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	infoLog.Println("Starting Database...")

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		errorLog.Fatal(err)
	}
	defer client.Disconnect(ctx)

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		errorLog.Fatal(err)
	}

	infoLog.Println("Connected to Database!")

	collectionDB := client.Database("gobble").Collection("collections")
	wineDB := client.Database("gobble").Collection("wines")

	app := &application{
		errorLog: errorLog,
		infoLog:  infoLog,
		collection: mongodb.CollectionModel{
			Collectiondb: collectionDB,
		},
		wine: mongodb.WineModel{
			WineDB: wineDB,
		},
	}

	srv := &http.Server{
		Addr:         ":4000",
		ErrorLog:     errorLog,
		Handler:      handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(app.routes()),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	app.infoLog.Println("Starting server on port", srv.Addr)
	err = srv.ListenAndServe()
	errorLog.Fatal(err)
}

func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.errorLog.Output(2, trace)

	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

func (app *application) notFound(w http.ResponseWriter) {
	trace := fmt.Sprint(debug.Stack())
	app.errorLog.Output(2, trace)
	app.serverError(w, errors.New("no records found"))
}
