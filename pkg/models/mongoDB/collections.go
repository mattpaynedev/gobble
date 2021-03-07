package mongoDB

import (
	"context"

	"github.com/mattpaynedev/gobble/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CollectionsModel struct {
	CollCollection *mongo.Collection
}

func (m *CollectionsModel) InsertCollection(name string, rows, columns int, userID primitive.ObjectID) (interface{}, error) {
	coll := models.Collections{
		ID:       primitive.NewObjectID(),
		Name:     name,
		Rows:     rows,
		Columns:  columns,
		Capacity: rows * columns,
		UserID:   userID,
	}

	insertResult, err := m.CollCollection.InsertOne(context.TODO(), coll)
	if err != nil {
		return nil, err
	}

	return insertResult.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (m *CollectionsModel) GetAllCollections() ([]*models.Collections, error) {
	var results []*models.Collections

	cursor, err := m.CollCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.TODO()) {
		var coll models.Collections
		err = cursor.Decode(&coll)
		if err != nil {
			return nil, err
		}

		results = append(results, &coll)
	}

	if err = cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	return results, nil
}

func (m *CollectionsModel) GetCollectionByID(id primitive.ObjectID) (*models.Collections, error) {

	// var wineResult models.Wines
	var coll models.Collections

	criteria := bson.M{"_id": id}

	if err := m.CollCollection.FindOne(context.TODO(), criteria).Decode(&coll); err != nil {
		return nil, err
	}

	return &coll, nil
}

func (m *CollectionsModel) EditCollectionByID(id, userID primitive.ObjectID, name string, columns, rows int) (*mongo.UpdateResult, error) {

	//add functionality for User ID verification

	result, err := m.CollCollection.UpdateOne(
		context.TODO(),
		bson.M{"_id": id},
		bson.D{
			{"$set", bson.D{{"name", name}}},
			{"$set", bson.D{{"rows", rows}}},
			{"$set", bson.D{{"columns", columns}}},
			{"$set", bson.D{{"capacity", rows * columns}}},
		})
	if err != nil {
		return nil, err
	}

	return result, nil

}

// func (m *WineModel) DeleteWineByID(id primitive.ObjectID) (*mongo.DeleteResult, error) {

// 	deleteResult, err := m.WineCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
// 	if err != nil {
// 		return nil, err
// 	}

// 	return deleteResult, nil
// }

// /*
// DATABASE SCHEMAS

// Collection: users
// */

// // type Users struct {
// // 	ID primitive.ObjectID `json:"id,omitempty"`
// // 	Username string `json:"username,omitempty"`
// // 	Password string `json:"password,omitempty"`
// // 	Email string `json:"email,omitempty"`
// // 	FirstName string `json:"firstname,omitempty"`
// // 	LastName string `json:"lastname,omitempty"`
// // 	SignupDate time.Date `json:"signupdate,omitempty"`
// // }
// /*
// Collection: wines
// */
