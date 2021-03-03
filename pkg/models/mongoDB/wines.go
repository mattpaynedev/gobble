package mongoDB

import (
	"context"

	"github.com/mattpaynedev/gobble/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type WineModel struct {
	// DB 				*mongo.Client
	WineCollection *mongo.Collection
}

func (m *WineModel) InsertWine(producer, grape, region, location string, vintage int, bottlePrice float64, collection, userID primitive.ObjectID) (interface{}, error) {
	wine := models.Wines{
		ID:           primitive.NewObjectID(),
		Producer:     producer,
		Vintage:      vintage,
		Grape:        grape,
		Region:       region,
		BottlePrice:  bottlePrice,
		Location:     location,
		CollectionID: collection,
		UserID:       userID,
		HasDrunk:     false,
	}

	insertResult, err := m.WineCollection.InsertOne(context.TODO(), wine)
	if err != nil {
		return nil, err
	}

	return insertResult.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (m *WineModel) GetCollection(collID primitive.ObjectID, hasDrunk bool) ([]*models.Wines, error) {
	var results []*models.Wines

	cursor, err := m.WineCollection.Find(context.TODO(), bson.M{"collectionid": collID, "hasdrunk": hasDrunk})
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

func (m *WineModel) GetWineByID(id, collection primitive.ObjectID) (*models.Wines, error) {

	// var wineResult models.Wines
	var wine models.Wines

	criteria := bson.M{"_id": id, "collectionid": collection}

	if err := m.WineCollection.FindOne(context.TODO(), criteria).Decode(&wine); err != nil {
		return nil, err
	}

	return &wine, nil
}

func (m *WineModel) DeleteWineByID(id, collect primitive.ObjectID) (*mongo.DeleteResult, error) {

	deleteResult, err := m.WineCollection.DeleteOne(context.TODO(), bson.M{"_id": id, "collectionid": collect})
	if err != nil {
		return nil, err
	}

	return deleteResult, nil
}

func (m *WineModel) DrinkWineByID(wine, collect primitive.ObjectID) (*mongo.UpdateResult, error) {

	result, err := m.WineCollection.UpdateOne(context.TODO(), bson.M{"_id": wine, "collectionid": collect}, bson.D{{"$set", bson.D{{"hasdrunk", true}}}})
	if err != nil {
		return nil, err
	}

	return result, nil
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
