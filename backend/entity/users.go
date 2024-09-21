package entity

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Username         string
	Password         string
	Email            string
	FirstName        string
	LastName         string
	Birthday         time.Time
	Profile          string `gorm:"type:longtext"`

	UserRoleID uint         `json:"user_role_id"`
	UserRole   *UserRoles   `gorm:"foreignKey:user_role_id"`

	GenderID   uint         `json:"gender_id"`
	Gender     *Genders     `gorm:"foreignKey:gender_id" json:"gender"`

	LoginHistories []LoginHistories `gorm:"foreignKey:UserID"`
	TutorProfiles  *TutorProfiles    `gorm:"foreignKey:UserID"` // หรืออาจจะใช้ []TutorProfiles หากมีหลายอัน
	Payments       []Payments        `gorm:"foreignKey:UserID"`
	Reviews        []Reviews         `gorm:"foreignKey:UserID"`
	Task           []Tasks           `gorm:"foreignKey:UserID"`
}
