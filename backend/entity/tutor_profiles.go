package entity

import (
	

	"gorm.io/gorm"
)

type TutorProfiles struct { // edit
	gorm.Model
	Bio  string `gorm:"type:text"`
	Experience  string  `gorm:"type:text"`
	Education     string  `gorm:"type:text"`
	ProfilePicture string `gorm:"type:longtext"` // edit

	// UserId ทำหน้าที่เป็น FK
	UserID *uint
	Users   *Users `gorm:"foreignKey:userID"`
	
}