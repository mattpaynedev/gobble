package mongoDB

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type WineModel struct {
	// DB 				*mongo.Client
	WineCollection *mongo.Collection
}

type Wines struct {
	Producer    string             `json:"producer,omitempty"`
	Vintage     int                `json:"vintage,omitempty"`
	Grape       string             `json:"grape,omitempty"`
	Region      string             `json:"regopm,omitempty"`
	BottlePrice float64            `json:"bottleprice,omitempty"`
	Location    string             `json:"location,omitempty"`
	UserID      primitive.ObjectID `json:"userid,omitempty"`
}

func (m *WineModel) Insert(producer, grape, region, location string, vintage int, bottlePrice float64, userID primitive.ObjectID) (interface{}, error) {
	wine := Wines{
		Producer:    producer,
		Vintage:     vintage,
		Grape:       grape,
		Region:      region,
		BottlePrice: bottlePrice,
		Location:    location,
		UserID:      userID,
	}

	insertResult, err := m.WineCollection.InsertOne(context.TODO(), wine)
	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a wine with information:", insertResult.InsertedID)

	return insertResult.InsertedID, nil
}

/*
DATABASE SCHEMAS

Collection: users
*/

// type Users struct {
// 	ID primitive.ObjectID `json:"id,omitempty"`
// 	Username string `json:"username,omitempty"`
// 	Password string `json:"password,omitempty"`
// 	Email string `json:"email,omitempty"`
// 	FirstName string `json:"firstname,omitempty"`
// 	LastName string `json:"lastname,omitempty"`
// 	SignupDate time.Date `json:"signupdate,omitempty"`
// }
/*
Collection: wines
*/
