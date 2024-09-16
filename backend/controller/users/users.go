package users

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Parichatx/user-system2/config"
	"github.com/Parichatx/user-system2/entity"
	"github.com/go-playground/validator/v10"
)

// สร้างอินสแตนซ์ของตัวตรวจสอบ
var validate = validator.New()

func GetAll(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Authorization header provided"})
		return
	}

	var users []entity.Users
 
 
	db := config.DB()
 
	results := db.Preload("Gender").Preload("UserRole").Find(&users)
 
	if results.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
 
		return
 
	}
 
	c.JSON(http.StatusOK, users)
 
 
 }
 
 
 func Get(c *gin.Context) {
 
 
	ID := c.Param("id")
 
	var users entity.Users
 
 
	db := config.DB()
 
	results := db.Preload("Genders").Preload("UserRoles").First(&users, ID)
 
	if results.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
 
		return
 
	}
 
	if users.ID == 0 {
 
		c.JSON(http.StatusNoContent, gin.H{})
 
		return
 
	}
 
	c.JSON(http.StatusOK, users)
 
 
 }
 
 
 func Update(c *gin.Context) {
 
 
	var user entity.Users
 
 
	UserID := c.Param("id")
 
 
	db := config.DB()
 
	result := db.First(&user, UserID)
 
	if result.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
 
		return
 
	}
 
 
	if err := c.ShouldBindJSON(&user); err != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
 
		return
 
	}
 
 
	result = db.Save(&user)
 
	if result.Error != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
 
		return
 
	}
 
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
 
 }
 
 
 func Delete(c *gin.Context) {
 
 
	id := c.Param("id")
 
	db := config.DB()
 
	if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
 
		return
 
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
 
 }