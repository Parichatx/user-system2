package config

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"github.com/Parichatx/user-system2/entity"
)

var db *gorm.DB

// DB returns the global database connection
func DB() *gorm.DB {
	return db
}

// ConnectionDB opens a connection to the SQLite database and returns an error if any
func ConnectionDB() error {
	var err error
	db, err = gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect database: %w", err)
	}
	fmt.Println("connected to database")
	return nil
}

// SetupDatabase sets up the database schema and seeds initial data, returns an error if any
func SetupDatabase() error {
	// Automatically migrate the schema for all necessary entities
	err := db.AutoMigrate(
		&entity.User{},
		&entity.UserRole{}, // Ensure UserRole is migrated as well
	)
	if err != nil {
		return fmt.Errorf("failed to migrate database schema: %w", err)
	}

	// Seed a default UserRole if it does not exist
	var userRole entity.UserRole
	if err := db.Where("role_name = ?", "Tutor").First(&userRole).Error; err != nil {
		userRole = entity.UserRole{RoleName: "Tutor"}
		if err := db.Create(&userRole).Error; err != nil {
			return fmt.Errorf("failed to create UserRole: %w", err)
		}
	}

	// Seed a default User
	hashedPassword, err := HashPassword("5555")
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	birthDay, err := time.Parse("2006-01-02", "1988-11-12")
	if err != nil {
		return fmt.Errorf("failed to parse birth date: %w", err)
	}

	user := &entity.User{
		FirstName: "Software",
		LastName:  "Analysis",
		Email:     "sa@gmail.com",
		Username:  "Parichat",
		Password:  hashedPassword,
		Birthday:  birthDay,
		UserRoleID: func(v uint) *uint { return &v }(1001),
	}

	if err := db.FirstOrCreate(user, &entity.User{Username: "Parichat"}).Error; err != nil {
		return fmt.Errorf("failed to create or find user: %w", err)
	}

	return nil
}
