

# 🔧 **1. Backend – Spring Boot**

### 👉 Location

```
office/backend
```

---

## ✅ **1.1 Run in Development Mode**

### **Windows**

```bash
cd office/backend
./gradlew.bat bootRun
```

### **Linux / macOS**

```bash
cd office/backend
./gradlew bootRun
```

---

## ✅ **1.2 Run as JAR (Production)**

Build project:

```bash
./gradlew build
```

Run JAR:

```bash
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

---

## 🔧 **1.3 Configure Backend Port**

Edit: `src/main/resources/application.yml`

```yaml
server:
  port: 8080
```

Backend URL:

```
http://localhost:8080
```

---

## 🔧 **1.4 Environment Variables (Example)**

Add in `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/office
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update
```

---

# 🎨 **2. Frontend – React + Vite**

### 👉 Location

```
office/frontend
```

---

## ✅ **2.1 Install Dependencies**

```bash
cd office/frontend
npm install
```

---

## 🎨 **2.2 Start Development Server**

```bash
npm run dev
```

Vite default URL:

```
http://localhost:5173
```

---

## 🎨 **2.3 Build for Production**

```bash
npm run build
```

---

# 🚀 **4. Run Both Together (Local Setup)**

### 🔥 Start Backend

```bash
cd office/backend
./gradlew bootRun
```

### 🔥 Start Frontend

```bash
cd office/frontend
npm run dev
```

---