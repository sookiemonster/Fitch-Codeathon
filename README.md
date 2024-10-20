# EcoWare 🌎🍽️
[Team Discovery](https://www.figma.com/board/gGCsLOUfskSWuw0Flmw9gt/Team-4-Discovery?node-id=0-1&node-type=canvas&t=GIlpj3XGpo9iecjX-0) <br>
[Wireframe](https://www.figma.com/design/vBSkMnoNiU1iBdxIJ5l15O/EcoWare?node-id=17-49&node-type=canvas&t=M0Y08aw3LX3AAdWn-0) <br>
[EcoWare API Endpoint Documentation](https://github.com/user-attachments/files/17452292/EcoWare.API.Endpoint.Documentation.pdf) <br>
[EcoWare Marketing Plan](https://github.com/user-attachments/files/17452301/EcoWare.Marketing.Plan.pdf)

# EcoWare 🌎🍽️
[Team Discovery](https://www.figma.com/board/gGCsLOUfskSWuw0Flmw9gt/Team-4-Discovery?node-id=0-1&node-type=canvas&t=GIlpj3XGpo9iecjX-0) <br>
[Wireframe](https://www.figma.com/design/vBSkMnoNiU1iBdxIJ5l15O/EcoWare?node-id=17-49&node-type=canvas&t=M0Y08aw3LX3AAdWn-0)

# How to Deploy

**Clone the repo**

```
git clone https://github.com/sookiemonster/Fitch-Codeathon ecoware

cd ecoware
```

**Database**

We used PostgreSQL for our database with Prisma ORM.

*How to setup*

  1. Install PostgreSQL
    For Linux

    ```
    sudo apt install postgresql
    ```
    For macOS (Homebrew) 
    ```
    brew install postgresql
    ```
    
  3. Start PostgreSQL
    For Linux 
    ```
    sudo service postgresql start
    ```
    For macOS (Homebrew) 
    ```
    brew services start postgresql
    ```
    
  5. Create a User and Database
    Log into the PostgreSQL shel: 
    ```
    sudo -u postgres psql
    ```
    Create a new user and database: 
    ```
    CREATE USER myuser WITH PASSWORD 'mypassword';
    CREATE DATABASE mydb OWNER myuser;
    ```

  7. Integrate Prisma
    Create a new .env file inside the server folder with the connection URL:
    ```
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb"
    ```

**Backend Server**

  1. Go to the server folder
    ```
    cd server
    ```

  3. Install all the necessary packages
    ```
    npm install
    ```

  5. Generate the Prisma client and seed the database:
    ```
    npm run prisma
    ```

  7. Run the server
    ```
    npm run server
    ```
    (runs on port 5000)

  (Optional)

  5. GUI for the database
    ```
    npm run studio
    ```
    (runs on port 5555)

**Washer Dashboard**

  1. Go to the web-client folder
    ```
    cd web-client
    ```

  3. Install all the necessary packages
    ```
    npm install
    ```

  5. Run the web client
    ```
    npm run start
    ```
    (runs on port 3000)

**Vendor Web Dashboard**

  1. Go to the next-web folder
    ```
    cd next-web
    ```

  3. Install all the necessary packages
    ```
    npm install
    ```

  5. Run the web client
    ```
    npm run dev
    ```
    (runs on port 3010)

**User Mobile App**

  1. Go to the frontend-mobile-user
    ```
    cd frontend-mobile-user
    ```

  3. Install all the necessary packages
    ```
    npm install
    ```

  5. Create a new .env file inside the frontend-mobile-user folder with the IP and PORT where the backend server is running:
    ```EXPO_PUBLIC_ADDRESS = "<ip_address>:<port>"```
    ip_address cant be localhost
    port should be 5000 ( unless u changed the server port )
    dont include 'http://' or '/' after the port

  6. Run the mobile client
    ```
    npx expo start
    ```
    (runs on port 8081)

  8. Follow the instructions on the terminal

**Vendor Mobile App**

  1. Go to the frontend-mobile-vendor
    ```
    cd frontend-mobile-Vendor
    ```

  3. Install all the necessary packages
    ```
    npm install
    ```

  5. Create a new .env file inside the frontend-mobile-user folder with the IP and PORT where the backend server is running:
    ```EXPO_PUBLIC_ADDRESS = "<ip_address>:<port>"```
    ip_address cant be localhost
    port should be 5000 ( unless u changed the server port )
    dont include 'http://' or '/' after the port

  6. Run the mobile client
    ```
    npx expo start
    ```
    (runs on port 8082)

  8. Follow the instructions on the terminal

**Test Accounts**

Vendors : 
  login : v1@t.com
  password: test1

  login : v2@t.com
  password: test2

  login : v3@t.com
  password: test3

Users : 
  login : u1@t.com
  password: test1

  login : u2@t.com
  password: test2

  login : u3@t.com
  password: test3



  


 


      

  




