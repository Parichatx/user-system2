package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string
	Password  string
	Email     string
	FirstName string
	LastName  string
	Birthday  time.Time

	// UserRoleID ทำหน้าที่เป็น FK
	UserRoleID *uint
	UserRole   UserRole `gorm:"foreignKey:UserRoleID"`

	// 1 user สามารถมีหลาย login history
	LoginHistories []LoginHistory `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีได้ 1 TutorProfile 
	TutorProfile  *TutorProfile  `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีหลาย payment
	Payments []Payment `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีหลาย review
	Reviews []Review `gorm:"foreignKey:UserID"`
}