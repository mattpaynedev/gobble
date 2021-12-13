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
	mapResult := make(map[string]models.Collection)

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

		mapResult[stringifyID(collection.ID)] = collection
	}

	if err = cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	fmt.Println("All collections requested")

	return mapResult, nil
}

func (coll CollectionModel) EditCollection(updates *models.Collection, collectionID primitive.ObjectID) (*models.Collection, error) {
	_, err := coll.Collectiondb.UpdateOne(context.TODO(), bson.M{"_id": collectionID}, bson.D{{"$set", updates}})

	if err != nil {
		return nil, err
	}

	var updatedCollection models.Collection

	err = coll.Collectiondb.FindOne(context.TODO(), bson.M{"_id": collectionID}).Decode(&updatedCollection)

	if err != nil {
		return nil, err
	}

	return &updatedCollection, nil
}

func stringifyID(id primitive.ObjectID) string {
	return fmt.Sprint(id.Hex())
}
