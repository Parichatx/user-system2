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

	UserID uint   // ใช้ uint แทน *uint
	User   Users  `gorm:"foreignKey:UserID"` // ชื่อฟิลด์ใน struct Users จะต้องเป็น UserID
}