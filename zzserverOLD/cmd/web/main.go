package main

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/mattpaynedev/gobble/server/pkg/models/mongoDB"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type application struct {
	errorLog      *log.Logger
	infoLog       *log.Logger
	wines         *mongoDB.WineModel
	coll          *mongoDB.CollectionsModel
	templateCache map[string]*template.Template
}

func main() {

	infoLog := log.New(os.Stdout, "INFO:\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	infoLog.Println("Starting Database...")

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		errorLog.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	infoLog.Println("Connected to Database!")

	templateCache, err := newTemplateCache("./ui/html/")
	if err != nil {
		errorLog.Fatal(err)
	}

	// defer client.Disconnect(ctx)

	// userCollection := client.Database("gobble").Collection("users")
	wineCollection := client.Database("gobble").Collection("wines")
	collCollection := client.Database("gobble").Collection("collections")

	app := &application{
		errorLog:      errorLog,
		infoLog:       infoLog,
		wines:         &mongoDB.WineModel{WineCollection: wineCollection},
		coll:          &mongoDB.CollectionsModel{CollCollection: collCollection},
		templateCache: templateCache,
	}

	srv := &http.Server{
		Addr:         ":4000",
		ErrorLog:     errorLog,
		Handler:      app.routes(),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	app.infoLog.Println("Starting Server on port")
	err = srv.ListenAndServe()
	errorLog.Fatal((err))

}
