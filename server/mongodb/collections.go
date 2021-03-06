package mongodb

import (
	"context"
	"fmt"

	"github.com/mattpaynedev/gobble/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CollectionModel struct {
	Collectiondb *mongo.Collection
}

func (coll CollectionModel) GetAllCollections() (map[string]models.Collection, error) {
	// func GetAllCollections(coll *mongo.Collection) ([]models.Collection, error) {
	mapResult := make(map[string]models.Collection)

	// var results []models.Collection

	cursor, err := coll.Collectiondb.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.TODO()) {
		var collection models.Collection
		err = cursor.Decode(&collection)
		if err != nil {
			return nil, err
		}

		// results = append(results, collection)
		mapResult[stringifyID(collection.ID)] = collection
	}

	if err = cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	return mapResult, nil
}

func stringifyID(id primitive.ObjectID) string {
	return fmt.Sprint(id.Hex())
}
