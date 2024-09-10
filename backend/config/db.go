package config

import (
	"fmt"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"    
    "user-system/backend/entity" 

)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		fmt.Printf("failed to connect database: %v\n", err)
		panic("failed to connect database")
	}
	fmt.Println("connected database")
}

func SetupDatabase() {
	// Automatically migrate the schema for all necessary entities
	err := db.AutoMigrate(
		&entity.User{},
	
	)
	if err != nil {
		fmt.Printf("failed to migrate database schema: %v\n", err)
		panic("failed to migrate database schema")
	}

	// Seed a default User with hashed password and birthday
	hashedPassword, err := HashPassword("123456")
	if err != nil {
		fmt.Printf("failed to hash password: %v\n", err)
		panic("failed to hash password")
	}

	birthDay, err := time.Parse("2006-01-02", "1988-11-12")
	if err != nil {
		fmt.Printf("failed to parse birth date: %v\n", err)
		panic("failed to parse birth date")
	}

	// Seed default UserRole if not exists
	var userRole entity.UserRole
	if err := db.Where("name = ?", "default").First(&userRole).Error; err != nil {
		userRole = entity.UserRole{Name: "default"}
		if err := db.Create(&userRole).Error; err != nil {
			fmt.Printf("failed to create UserRole: %v\n", err)
			panic("failed to create UserRole")
		}
	}

	user := &entity.User{
		FirstName: "Software",
		LastName:  "Analysis",
		Email:     "sa@gmail.com",
		Username: Username,
		Password:  hashedPassword,
		Birthday:  birthDay,
		UserRoleID: userRole.ID, 
	}

	// Create user if not exists
	if err := db.FirstOrCreate(user, &entity.User{Email: "sa@gmail.com"}).Error; err != nil {
		fmt.Printf("failed to create or find user: %v\n", err)
		panic("failed to create or find user")
	}
}
