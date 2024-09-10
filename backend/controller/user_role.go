package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"user-system/backend/config"     
    "user-system/backend/entity" 
	
)

// GET /UserRole
func ListUserRoles(c *gin.Context) {
	var user_role []entity.User_Role

	db := config.DB()

	db.Find(&user_role)

	c.JSON(http.StatusOK, &user_role)
}