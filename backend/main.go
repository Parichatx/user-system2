package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Parichatx/user-system2/config"
	"github.com/Parichatx/user-system2/middlewares"
	"github.com/Parichatx/user-system2/controller/users"
	"github.com/joho/godotenv"
)

const PORT = "8000"

func main() {
	// โหลดไฟล์ .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// เปิดการเชื่อมต่อฐานข้อมูล
	config.ConnectionDB()

	// สร้างฐานข้อมูล
	config.SetupDatabase()

	r := gin.Default()

	// เพิ่ม Middleware สำหรับ CORS
	r.Use(CORSMiddleware())

	// เส้นทางสำหรับการสมัครสมาชิกและล็อกอิน
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)

	// กลุ่มเส้นทางที่ต้องการการยืนยันตัวตน
	router := r.Group("/users")
	{
		router.Use(middlewares.Authorizes()) // ใช้ Middleware ตรวจสอบ Authorization
		router.PUT("/:id", users.Update)
		router.GET("/", users.GetAll)
		router.GET("/:id", users.Get)
		router.DELETE("/:id", users.Delete)
	}

	// เส้นทางตรวจสอบสถานะ API
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// เริ่มรันเซิร์ฟเวอร์
	r.Run("localhost:" + PORT)
}

// ฟังก์ชัน Middleware สำหรับจัดการ CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
