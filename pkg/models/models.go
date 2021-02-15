package models

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

var ErrNoRecords = errors.New("models: no matching record found")

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
