package entity

import ("gorm.io/gorm"
		"time")

type Payment struct {
	gorm.Model
	Amount float32
	EnrollmentDate time.Time

	// UserID ทำหน้าที่เป็น FK
	UserID *uint
	User   User  `gorm:"foreignKey:UserID"`

	// UserId ทำหน้าที่เป็น FK
	CourseID *uint
	Course   Course  `gorm:"foreignKey:CourseID"`
}