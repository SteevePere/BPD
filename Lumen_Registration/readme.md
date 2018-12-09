- MySQL : App config dans le .env à la racine

- php -S localhost:PORT -t public pour lancer le serveur de dev.

- Routes : 

    - GET /users --> liste tout
        Ex:
        curl -X GET http://localhost:5001/users
    
    - POST /user --> crée user (headers: login, password. body: first_name, last_name, role, gender, birth_date, hire_date, email (voir base SQL)). 
        Ex: 
        curl -X POST http://localhost:5001/user -H 'Content-Type: application/x-www-form-urlencoded' -H 'login: test2' -H 'password: hashdepwd' -d 'first_name=test2&last_name=test2&role=agent&gender=M&birth_date=1991-10-16&hire_date=2011-10-16&email=test2%40gmail.com'
