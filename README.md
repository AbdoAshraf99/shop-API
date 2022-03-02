to install dependencies run :npm i
Script needed:
    1- To test the project: npm run test
    2- To start the project: npm run start
    3- To build the project: npm run build
    4- To run prettier : npm run prettier
    
before running any thinge you should first create DB
Database creation:
dev DB:
    switch to the postgres user su postgres
    start psql psql postgres
    in psql run the following:
    CREATE USER shopping_user WITH PASSWORD 'password123';
    CREATE DATABASE shopping;
    \c shopping
    GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
test DB:
    in psql run the following:
    CREATE DATABASE shopping_test;
    \c shopping_test
    GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;  
DB port:5432

End Points:
    1-user
        1-user authorization:
            endpoint:POST http://localhost:3000/users/auth
            body:{username:"example","password":"example"},
            res:{
            "status": "successful",
            "user": {
                "id": 1,
                "firstname": "abdo",
                "lastname": "ashraf",
                "username": "abdo123",
                "password": "$2b$10$IeyR8D/7WkffAf8Xo7WKzOlCGkgX86pkjY9MBRVhKkKFRmF1z27UC"
            },
            "token": "example of token"
            }  
        2-create user:
            endpoint:POST http://localhost:3000/users
            body:{
            "firstname":"abdooo",
            "lastname":"ashraf",
            "username":"abdo123",
            "password":"abdo123"
            }
            headers:{Authorization:token},
            res:{
            "id": 1,
            "firstname": "abdo",
            "lastname": "ashraf",
            "username": "abdo123",
            "password": "$2b$10$IeyR8D/7WkffAf8Xo7WKzOlCGkgX86pkjY9MBRVhKkKFRmF1z27UC"
            }
        3-get all users:
            endpoint:GET http://localhost:3000/users
            headers:{Authorization:token},
            res:[
            {
                "id": 1,
                "firstname": "abdo",
                "lastname": "ashraf",
                "username": "abdo123",
                "password": "$2b$10$IeyR8D/7WkffAf8Xo7WKzOlCGkgX86pkjY9MBRVhKkKFRmF1z27UC"
            }
            ]
        4-delete user:
            endpoint:DELETE http://localhost:3000/users/:id  example of id=1
            headers:{Authorization:token},

    2-orders:
        1-create order
            endpoint:POST http://localhost:3000/orders
            body:{
                "status":"complete",
                "user_id":"1"
            }
            res:{
                "id": 1,
                "productquantity": null,
                "user_id": "1",
                "status": "complete",
                "created_date": "2022-03-01T22:00:00.000Z"
            }
        3-get user orders (current orders by user)
            endpoint:GET http://localhost:3000/users/:id/orders example of id=1
            headers:{Authorization:token},
            res:[
                {
                    "id": 1,
                    "created_date": "2022-03-01T22:00:00.000Z",
                    "status": "complete"
                }
            ]
        2-show order
            endpoint:GET http://localhost:3000/orders/:id  ex:id=1
            headers:{Authorization:token},
            res:{
                "id": 1,
                "productquantity": null,
                "user_id": "1",
                "status": "complete",
                "created_date": "2022-03-01T22:00:00.000Z"
            }
        3-get all orders
            endpoint:GET http://localhost:3000/orders  ex:id=1
            headers:{Authorization:token},
            res:[
            {
                "id": 1,
                "productquantity": null,
                "user_id": "1",
                "status": "complete",
                "created_date": "2022-03-01T22:00:00.000Z"
            }
            ]
        4-delete order
        endpoint:GET http://localhost:3000/orders/:id  ex:id=1
            headers:{Authorization:token},
        5-completed order by user
            endpoint:GET http://localhost:3000/users/:id/orders/complete
            headers:{Authorization:token},
            res:[
            {
                "id": 2,
                "created_date": "2022-03-01T22:00:00.000Z",
                "status": "complete",
                "user_id": "1"
            }
        ]
    3-Product:
        1-Index:
            endpoint:GET http://localhost:3000/products
            res:[
                {
                    "id": 1,
                    "name": "rice",
                    "price": 10,
                    "category": "food"
                }
            ]
        2-Create
            endpoint:POST http://localhost:3000/products
            headers:{Authorization:token},
            body:{
                "name":"rice",
                "price":"10",
                "category":"food"
            }
            res:{
                "name":"rice",
                "price":"10",
                "category":"food"
            }
        3-show 
            endpoint:GET http://localhost:3000/category/products/:id
            res:{
                "id": 1,
                "name": "rice",
                "price": 10,
                "category": "food"
            }
        4-product by category
            endpoint:GET http://localhost:3000/products/:cat
            res:{
                                {
                    "status": "successful",
                    "msg": [
                        {
                            "id": 1,
                            "name": "rice",
                            "price": 10,
                            "category": "food"
                        }
                    ]
                }
            }
        5- delete
            endpoint:DELETE http://localhost:3000/products/:id
            headers:{Authorization:token},
    
    4-Add product to order:
        endpoint:GET http://localhost:3000/orders/products
        headers:{Authorization:token},
        body:{
                "product_id":"2",
                "order_id":"3",
                "quantity":"10"
            }
        res:{
            "product_id":"2",
            "order_id":"3",
            "quantity":"10"
        }
    5-get all products in order
        endpoint:POST http://localhost:3000/orders/:id/products
        headers:{Authorization:token},
        res:[
            {
                "id": 2,
                "name": "rice",
                "price": 10,
                "quantity": 10
            }
        ]


            
