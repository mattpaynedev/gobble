package models

import (
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ErrNoRecords = errors.New("models: no matching record found")

type tastingNote struct {
	dateSaved time.Time
	note      string
}

type Wines struct {
	ID              primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Producer        string             `json:"producer,omitempty"`
	Vintage         int                `json:"vintage,omitempty"`
	Grape           string             `json:"grape,omitempty"`
	Region          string             `json:"region,omitempty"`
	BottlePrice     float64            `json:"bottleprice,omitempty"`
	Locations       bson.M             `json:"locations,omitempty"`
	NumberAvailable int                `json:"numberavailable,omitempty"`
	TastingNotes    []tastingNote      `json:"tastingnotes,omitempty"`
	CollectionID    primitive.ObjectID `json:"collectionid,omitempty"`
	UserID          primitive.ObjectID `json:"userid,omitempty"`
}

type Collection struct {
	ID        primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Name      string             `json:"name,omitempty"`
	Available map[int]int        `json:"available,omitempty"`
	// Occupied  map[int]int        `json:"occupied,omitempty"`
	Capacity int                `json:"capacity,omitempty"`
	UserID   primitive.ObjectID `json:"userid,omitempty"`
}
