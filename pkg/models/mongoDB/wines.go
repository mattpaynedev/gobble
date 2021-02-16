package mongoDB

import (
	"context"
	"fmt"

	"github.com/mattpaynedev/gobble/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type WineModel struct {
	// DB 				*mongo.Client
	WineCollection *mongo.Collection
}

type Wines struct {
	ID          primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Producer    string             `json:"producer,omitempty"`
	Vintage     int                `json:"vintage,omitempty"`
	Grape       string             `json:"grape,omitempty"`
	Region      string             `json:"regopm,omitempty"`
	BottlePrice float64            `json:"bottleprice,omitempty"`
	Location    string             `json:"location,omitempty"`
	UserID      primitive.ObjectID `json:"userid,omitempty"`
}

func (m *WineModel) Insert(producer, grape, region, location string, vintage int, bottlePrice float64, userID primitive.ObjectID) (interface{}, error) {
	wine := models.Wines{
		ID:          primitive.NewObjectID(),
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

	return insertResult.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (m *WineModel) GetCollection() ([]*models.Wines, error) {
	var results []*models.Wines

	cursor, err := m.WineCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.TODO()) {
		var wine models.Wines
		err = cursor.Decode(&wine)
		if err != nil {
			return nil, err
		}

		results = append(results, &wine)
	}

	if err = cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	return results, nil
}

func (m *WineModel) GetWineByID(id primitive.ObjectID) (*models.Wines, error) {

	// var wineResult models.Wines
	var wine models.Wines

	if err := m.WineCollection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&wine); err != nil {
		return nil, err
	}

	return &wine, nil
}

func (m *WineModel) DeleteWineByID(id primitive.ObjectID) (*mongo.DeleteResult, error) {

	deleteResult, err := m.WineCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		return nil, err
	}

	return deleteResult, nil
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
