package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"user-system/backend/config"     
    "user-system/backend/controller" 
	
)

const PORT = "8000"

func main() {

	// เปิดการเชื่อมต่อฐานข้อมูล
	if err := config.ConnectionDB(); err != nil {
		panic("Failed to connect to the database: " + err.Error())
	}

	// สร้างฐานข้อมูลหากยังไม่ได้สร้าง
	if err := config.SetupDatabase(); err != nil {
		panic("Failed to setup the database: " + err.Error())
	}

	r := gin.Default()

	// เปิดใช้งาน CORS
	r.Use(CORSMiddleware())

	// กำหนดเส้นทาง (routes)
	router := r.Group("")
	{
		// เส้นทางสำหรับ User
		router.GET("/users", controller.ListUsers)
		router.GET("/user/:id", controller.GetUser)
		router.POST("/users", controller.CreateUser)
		router.PATCH("/users/:id", controller.UpdateUser) // แก้ไขเป็น PATCH ตาม User ID
		router.DELETE("/users/:id", controller.DeleteUser)

		// เส้นทางสำหรับ Gender
		router.GET("/genders", controller.ListGenders)
	}

	// เส้นทางเริ่มต้น
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// เริ่มการทำงานของเซิร์ฟเวอร์
	if err := r.Run("localhost:" + PORT); err != nil {
		panic("Failed to run server: " + err.Error())
	}
}

// ฟังก์ชัน CORS Middleware
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
