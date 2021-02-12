package main

import (
	"context"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/mattpaynedev/gobble/pkg/models/mongoDB"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type application struct {
	errorLog      *log.Logger
	infoLog       *log.Logger
	wines         *mongoDB.WineModel
	templateCache map[string]*template.Template
}

// type Wines struct {
// 	Producer    string             `json:"producer,omitempty"`
// 	Vintage     int                `json:"vintage,omitempty"`
// 	Grape       string             `json:"grape,omitempty"`
// 	Region      string             `json:"regopm,omitempty"`
// 	BottlePrice float64            `json:"bottleprice,omitempty"`
// 	Location    string             `json:"location,omitempty"`
// 	UserID      primitive.ObjectID `json:"userid,omitempty"`
// }

func main() {

	infoLog := log.New(os.Stdout, "INFO:\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	log.Println("Starting Database...")

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(context.TODO(), clientOptions)
	dbErr(err, "client.Connect")

	err = client.Ping(context.TODO(), nil)

	log.Println("Connected to Database!")

	// defer client.Disconnect(ctx)

	// userCollection := client.Database("gobble").Collection("users")
	wineCollection := client.Database("gobble").Collection("wines")

	app := &application{
		errorLog: errorLog,
		infoLog:  infoLog,
		wines:    &mongoDB.WineModel{WineCollection: wineCollection},
		// templateCache: templateCache,
	}

	srv := &http.Server{
		Addr:     ":4000",
		ErrorLog: errorLog,
		Handler:  app.routes(),
	}

	app.infoLog.Println("Starting Server on port")
	err = srv.ListenAndServe()
	errorLog.Fatal((err))

}

func (app *application) homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome home!\n")

	wine, err := app.wines.Insert("cakebread", "chardonnay", "napa", "A1", 2008, 55.45, primitive.NilObjectID)
	if err != nil {
		fmt.Fprint(w, err)
	}
	fmt.Fprint(w, wine)
	// InsertWine("cakebread", "chardonnay", "napa", "A1", 2008, 55.45)
}

// func InsertWine(producer, grape, region, location string, vintage int, bottlePrice float64) {

// 	wine := Wines{
// 		Producer:    producer,
// 		Vintage:     vintage,
// 		Grape:       grape,
// 		Region:      region,
// 		BottlePrice: bottlePrice,
// 		Location:    location,
// 		// UserID: userID
// 	}

// 	insertResult, err := wineCollection.InsertOne(context.TODO(), wine)
// 	dbErr(err)

// 	fmt.Println("Inserted a wine with information:", insertResult)
// }

func dbErr(err error, str string) {
	if err != nil {
		log.Println(str)
		log.Fatal(err)
	}
}
