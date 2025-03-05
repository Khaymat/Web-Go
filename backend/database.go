package main

import (
	"errors"
	"log"
	"os"
	"strconv"

	supa "github.com/nedpals/supabase-go"
)

var supabase *supa.Client

// initDB initializes the database connection
func initDB() {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		log.Println("Warning: Supabase credentials not found in environment variables")
		return
	}

	supabase = supa.CreateClient(supabaseURL, supabaseKey)
	log.Println("Supabase client initialized")
}

// getAllProjects fetches all projects from the database
func getAllProjects() ([]Project, error) {
	if supabase == nil {
		return getFallbackProjects(), nil
	}

	var projects []Project
	err := supabase.DB.From("projects").Select("*").Execute(&projects)
	if err != nil {
		log.Printf("Error fetching projects: %v", err)
		return getFallbackProjects(), nil
	}

	return projects, nil
}

// getProjectByID fetches a project by ID from the database
func getProjectByID(id string) (Project, error) {
	if supabase == nil {
		return getFallbackProject(id), nil
	}

	var project Project
	err := supabase.DB.From("projects").Select("*").Eq("id", id).Single().Execute(&project)
	if err != nil {
		log.Printf("Error fetching project by ID: %v", err)
		return getFallbackProject(id), nil
	}

	return project, nil
}

// getUserProfile fetches the user profile from the database
func getUserProfile() (Profile, error) {
	if supabase == nil {
		return getFallbackProfile(), nil
	}

	// Fetch profile
	var profile Profile
	err := supabase.DB.From("profile").Select("*").Single().Execute(&profile)
	if err != nil {
		log.Printf("Error fetching profile: %v", err)
		return getFallbackProfile(), nil
	}

	// Fetch skills
	var skills []Skill
	err = supabase.DB.From("skills").Select("*").Execute(&skills)
	if err != nil {
		log.Printf("Error fetching skills: %v", err)
	} else {
		profile.Skills = skills
	}

	// Fetch education
	var education []Education
	err = supabase.DB.From("education").Select("*").Execute(&education)
	if err != nil {
		log.Printf("Error fetching education: %v", err)
	} else {
		profile.Education = education
	}

	return profile, nil
}

// getAllServices fetches all services from the database
func getAllServices() ([]Service, error) {
	if supabase == nil {
		return getFallbackServices(), nil
	}

	var services []Service
	err := supabase.DB.From("services").Select("*").Execute(&services)
	if err != nil {
		log.Printf("Error fetching services: %v", err)
		return getFallbackServices(), nil
	}

	// Fetch tiers for each service
	for i, service := range services {
		var tiers []ServiceTier
		err := supabase.DB.From("service_tiers").Select("*").Eq("service_id", service.ID).Execute(&tiers)
		if err != nil {
			log.Printf("Error fetching service tiers: %v", err)
		} else {
			services[i].Tiers = tiers
		}
	}

	return services, nil
}

// saveContactForm saves a contact form submission to the database
func saveContactForm(form ContactForm) error {
	if supabase == nil {
		// Just log the form data if no database connection
		log.Printf("Contact form received: %+v", form)
		return nil
	}

	_, err := supabase.DB.From("contact_submissions").Insert(form).Execute(nil)
	if err != nil {
		log.Printf("Error saving contact form: %v", err)
		return err
	}

	return nil
}

// Fallback data functions for when database is not available

func getFallbackProjects() []Project {
	return []Project{
		{
			ID:           1,
			Title:        "Portfolio Website",
			Description:  "A personal portfolio website built with Next.js and Go",
			Image:        "/images/projects/portfolio.jpg",
			GithubURL:    "https://github.com/yourusername/portfolio",
			DemoURL:      "",
			Technologies: []string{"Next.js", "Go", "Tailwind CSS", "Supabase"},
		},
		{
			ID:           2,
			Title:        "Crystals-Kyber with AES Integration",
			Description:  "Post-quantum cryptography implementation with AES for enhanced security",
			Image:        "/images/projects/cryptography.jpg",
			GithubURL:    "coming-soon",
			DemoURL:      "",
			Technologies: []string{"Go", "Cryptography", "AES", "Kyber"},
		},
	}
}

func getFallbackProject(id string) Project {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return Project{}
	}

	projects := getFallbackProjects()
	for _, project := range projects {
		if project.ID == idInt {
			return project
		}
	}

	return Project{}
}

func getFallbackProfile() Profile {
	return Profile{
		Name:        "Your Name",
		Title:       "Full-stack Developer & Cryptography Enthusiast",
		Description: "Specializing in Next.js, Golang, and Post-Quantum Cryptography",
		Avatar:      "/images/profile/avatar.jpg",
		Skills: []Skill{
			{
				Category: "Frontend",
				Items:    []string{"HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"},
			},
			{
				Category: "Backend",
				Items:    []string{"Go", "Node.js", "Express", "RESTful APIs", "GraphQL"},
			},
			{
				Category: "Database",
				Items:    []string{"PostgreSQL", "MongoDB", "Supabase", "Firebase"},
			},
			{
				Category: "Cryptography",
				Items:    []string{"AES", "RSA", "Post-Quantum", "Kyber", "Dilithium"},
			},
		},
		Education: []Education{
			{
				Degree:      "Master of Science in Cryptography",
				Institution: "Tech University",
				Year:        "2018",
			},
			{
				Degree:      "Bachelor of Computer Science",
				Institution: "State University",
				Year:        "2016",
			},
		},
		Interests: []string{
			"Cryptography", "Web Security", "Quantum Computing", "Open Source",
			"Blockchain", "AI", "Reading", "Hiking",
		},
		SocialLinks: []SocialLink{
			{Platform: "GitHub", URL: "https://github.com/yourusername"},
			{Platform: "LinkedIn", URL: "https://linkedin.com/in/yourusername"},
			{Platform: "Email", URL: "mailto:your.email@example.com"},
			{Platform: "WhatsApp", URL: "https://wa.me/6287747755257"},
		},
	}
}

func getFallbackServices() []Service {
	return []Service{
		{
			ID:          1,
			Title:       "Website Development",
			Description: "Custom website development services for individuals and businesses",
			Icon:        "🌐",
			Tiers: []ServiceTier{
				{
					ID:       1,
					Name:     "Basic",
					Price:    1500,
					Period:   "one-time",
					Features: []string{
						"5 pages",
						"14 days delivery",
						"Free domain",
						"1GB hosting",
						"Business email",
						"SSL certificate",
						"Basic SEO",
						"30 days support",
					},
					Popular: false,
				},
				{
					ID:       2,
					Name:     "Pro",
					Price:    3000,
					Period:   "one-time",
					Features: []string{
						"10 pages",
						"21 days delivery",
						"Free domain",
						"Unlimited hosting",
						"Business email",
						"SSL certificate",
						"Advanced SEO",
						"Logo design",
						"90 days support",
					},
					Popular: true,
				},
			},
		},
		{
			ID:          2,
			Title:       "AES Integration for Website Security",
			Description: "Enhance your website security with AES encryption",
			Icon:        "🔒",
			Tiers: []ServiceTier{
				{
					ID:       3,
					Name:     "Basic",
					Price:    2000,
					Period:   "one-time",
					Features: []string{
						"AES-128 encryption",
						"Form data protection",
						"Basic security audit",
						"Implementation documentation",
						"60 days support",
					},
					Popular: false,
				},
				{
					ID:       4,
					Name:     "Advanced",
					Price:    3500,
					Period:   "one-time",
					Features: []string{
						"AES-256 encryption",
						"Full website encryption",
						"Comprehensive security audit",
						"Implementation documentation",
						"User authentication security",
						"120 days support",
					},
					Popular: true,
				},
			},
		},
	}
}

