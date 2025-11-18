## Project Structure
```txt
src/
 ├── api/
 │    └── axiosConfig.js      # global axios instance
 ├── assets/                  # images, logos, etc.
 ├── components/              # reusable UI components
 ├── hooks/                   # custom hooks (optional)
 ├── layout/                  # header, sidebar, layout
 ├── pages/                   # main pages (dashboard, login, etc.)
 ├── services/                # api calls
 ├── context/                 # auth context (JWT)
 ├── utils/                   # helpers
 ├── App.jsx
 ├── main.jsx
 ├── router/
 │    ├── PrivateRoute.jsx
 │    └── AppRouter.jsx
```