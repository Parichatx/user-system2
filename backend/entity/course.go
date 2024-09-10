package entity

import("gorm.io/gorm"
	) 

type Course struct {
	gorm.Model
	Title string
	ProfilePicture []byte
	Price float32
	TeachingPlatform string
	Description string
	Duration uint



	// UserId ทำหน้าที่เป็น FK
	TutorProfileID *uint
	TutorProfile   TutorProfile `gorm:"foreignKey:TutorProfileID"`

	// CourseCategoryID ทำหน้าที่เป็น FK
	CourseCategoryID *uint
	CourseCategory   CourseCategory `gorm:"foreignKey:CourseCategoryID"`

	// 1 course สามารถมีหลาย review
	Reviews []Review `gorm:"foreignKey:CourseID"`

	// 1 course สามารถมีหลาย payment
	Payments []Payment `gorm:"foreignKey:CourseID"`
}
