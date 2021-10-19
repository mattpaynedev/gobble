package mongodb

import (
	"context"
	"fmt"

	"github.com/mattpaynedev/gobble/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type WineModel struct {
	// DB 				*mongo.Client
	WineDB *mongo.Collection
}

func (wines *WineModel) GetSingleCollectionByID(collectionID primitive.ObjectID, numAvailable int) (map[string]models.Wines, error) {
	// var results []*models.Wines
	wineResult := make(map[string]models.Wines)

	cursor, err := wines.WineDB.Find(context.TODO(), bson.M{"collectionid": collectionID, "numberavailable": bson.M{"$gt": numAvailable}})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.TODO()) {
		var wine models.Wines
		err = cursor.Decode(&wine)
		if err != nil {
			return nil, err
		}

		wineResult[stringifyID(wine.ID)] = wine
		// results = append(results, &wine)
	}

	if err = cursor.Err(); err != nil {
		return nil, err
	}
	cursor.Close(context.TODO())

	fmt.Println(wineResult)

	return wineResult, nil
}

func (wines *WineModel) DrinkWineByID(wineID, collectionID primitive.ObjectID) (*models.Wines, error) {

	//add in userID validation

	originalWine, err := wines.GetWineByID(wineID, collectionID)
	if err != nil {
		return nil, err
	}

	currentQuantity := &originalWine.NumberAvailable

	var updateResult *mongo.UpdateResult
	if *currentQuantity > 0 {
		updateResult, err = wines.WineDB.UpdateOne(context.TODO(), bson.M{"_id": wineID, "collectionid": collectionID}, bson.D{{"$set", bson.D{{"numberavailable", *currentQuantity - 1}}}})
	}
	if err != nil {
		return nil, err
	}

	fmt.Println(updateResult)

	updatedWine, err := wines.GetWineByID(wineID, collectionID)
	if err != nil {
		return nil, err
	}

	return updatedWine, nil
}

func (wines *WineModel) GetWineByID(wineID, collectionID primitive.ObjectID) (*models.Wines, error) {

	//add in userID Validation

	var wine models.Wines

	criteria := bson.M{"_id": wineID, "collectionid": collectionID}

	if err := wines.WineDB.FindOne(context.TODO(), criteria).Decode(&wine); err != nil {
		wine = models.Wines{}
		return nil, err
	}

	return &wine, nil
}
