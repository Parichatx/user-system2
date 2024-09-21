package entity

import (
	

	"gorm.io/gorm"
)

type TutorProfiles struct {
	gorm.Model
	Bio            string `gorm:"type:text"`
	Experience     string `gorm:"type:text"`
	Education      string `gorm:"type:text"`
	ProfilePicture string `gorm:"type:longtext"`

	UserID *uint // ใช้ pointer ที่นี่
	User   Users  `gorm:"foreignKey:UserID"`
}
