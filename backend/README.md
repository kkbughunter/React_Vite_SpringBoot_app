### Project initial Config
```txt
Project: Gradle - Groovy
langualge: Java
Spring Boot: 3.5.7
Projecct Metadata:
    Group: com.office
    Artifact: backend
    Name: office Backend
    Description: Demo project for Spring Boot
    Package name: com.office.backend
Packaging: Jar
Configuration: YAML
Java: 21
Dependencies:
  Spring Web
  lambok
  spring Boot DevTools
  spring security
  MySQL Driver
```
## Project Dir

```txt
office/
 ├── backend/
 │    ├── src/
 │    │    ├── main/
 │    │    │    ├── java/
 │    │    │    │    └── com/office/backend/...
 │    │    │    ├── resources/
 │    │    │    │    ├── application.properties (or .yml)
 │    │    │    │    ├── static/        # Optional
 │    │    │    │    ├── templates/     # Only if using Thymeleaf
 │    │    │    │    └── banners/       # Optional
 │    │    ├── test/
 │    │    │    └── java/
 │    │    │         └── com/office/backend/...
 │    ├── pom.xml
 │    ├── logs/                   # Log files 
 │    ├── uploads/                # Uploaded files go here
 │    └── scripts/                # Deployment scripts
 │
 ├── frontend/                    # React/Vite
 │    └── ...
 │
 └── README.md
```

```txt
com.office.office
 └── backend
      ├── config          # All configs: CORS, security, beans
      ├── controller      # REST controllers
      ├── service         # Business logic
      │    └── impl       # Service implementations
      ├── repository      # JPA repositories
      ├── model           # Entities (JPA)
      ├── dto             # Request/response DTOs
      ├── exceptions      # Custom exceptions & handlers
      ├── security        # JWT, filters, authentication
      ├── mapper          # MapStruct or manual model <-> dto
      ├── utils           # Utility/helper classes
      ├── enums           # All enums
      └── OfficeBackendApplication.java
```