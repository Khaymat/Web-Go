package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// Project represents a portfolio project
type Project struct {
	ID           int       `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Image        string    `json:"image"`
	GithubURL    string    `json:"githubUrl"`
	DemoURL      string    `json:"demoUrl"`
	Technologies []string  `json:"technologies"`
	CreatedAt    time.Time `json:"createdAt"`
}

// Profile represents user profile information
type Profile struct {
	Name        string       `json:"name"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	Avatar      string       `json:"avatar"`
	Skills      []Skill      `json:"skills"`
	Education   []Education  `json:"education"`
	Interests   []string     `json:"interests"`
	SocialLinks []SocialLink `json:"socialLinks"`
}

// Skill represents a skill category and its items
type Skill struct {
	Category string   `json:"category"`
	Items    []string `json:"items"`
}

// Education represents educational background
type Education struct {
	Degree      string `json:"degree"`
	Institution string `json:"institution"`
	Year        string `json:"year"`
}

// SocialLink represents a social media link
type SocialLink struct {
	Platform string `json:"platform"`
	URL      string `json:"url"`
}

// Service represents a service offering
type Service struct {
	ID          int           `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Icon        string        `json:"icon"`
	Tiers       []ServiceTier `json:"tiers"`
}

// ServiceTier represents a pricing tier for a service
type ServiceTier struct {
	ID       int      `json:"id"`
	Name     string   `json:"name"`
	Price    int      `json:"price"`
	Period   string   `json:"period"`
	Features []string `json:"features"`
	Popular  bool     `json:"popular"`
}

// ContactForm represents a contact form submission
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file not found")
	}

	// Initialize database connection
	initDB()

	// Create router
	r := mux.NewRouter()

	// API routes
	r.HandleFunc("/api/projects", getProjects).Methods("GET")
	r.HandleFunc("/api/projects/{id}", getProject).Methods("GET")
	r.HandleFunc("/api/profile", getProfile).Methods("GET")
	r.HandleFunc("/api/services", getServices).Methods("GET")
	r.HandleFunc("/api/contact", submitContactForm).Methods("POST")

	// Configure CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", os.Getenv("FRONTEND_URL")},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})

	// Set port from environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler.Handler(r)))
}

// getProjects returns all projects
func getProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := getAllProjects()
	if err != nil {
		http.Error(w, "Failed to fetch projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

// getProject returns a specific project by ID
func getProject(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	project, err := getProjectByID(id)
	if err != nil {
		http.Error(w, "Project not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(project)
}

// getProfile returns the user profile
func getProfile(w http.ResponseWriter, r *http.Request) {
	profile, err := getUserProfile()
	if err != nil {
		http.Error(w, "Failed to fetch profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

// getServices returns all services
func getServices(w http.ResponseWriter, r *http.Request) {
	services, err := getAllServices()
	if err != nil {
		http.Error(w, "Failed to fetch services", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(services)
}

// submitContactForm handles contact form submissions
func submitContactForm(w http.ResponseWriter, r *http.Request) {
	var form ContactForm
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = saveContactForm(form)
	if err != nil {
		http.Error(w, "Failed to save contact form", http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"message": "Your message has been sent successfully!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

