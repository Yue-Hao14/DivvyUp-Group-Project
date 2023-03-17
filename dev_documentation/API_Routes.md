# API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### Get the Current User

Returns the information about the current user that is logged in.

* Requires Authentication: True
* Request
    * Method: GET
    * URL:
    * Body
* Successful Response
    * Status Code:
    * Headers:
        *
    * Body:
```json

```

### Log In a User

Logs in a current user with valid credentials and returns the current user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
        {
            "User": {
                "id": 1,
                "username": "DemoUser",
                "firstName": "Demo",
                "lastName": "User",
                "email": "demo@user.com"
            },
            "Friends": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                },
            ],
            "AllExpenses": [
                {
                    "id": 1,
                    "description": "Description of Expense",
                    "payer": {
                                "id": 2,
                                "firstName": "John",
                                "lastName": "Smith",
                    },
                    "owers": [
                        {
                            "id": 2,
                            "firstName": "John",
                            "lastName": "Smith",
                        },
                    ],
                    "settledOwers": [
                        {
                            "expenseId": 1,
                            "settledDate": "2023-01-01",
                            "settledUserId": 2
                        },
                    ],
                    "amount": 45,
                    "expenseDate": "2022-25-12",
                    "createdAt": "2022-25-12",
                    "updatedAt": "2022-25-12"
                },
            ],
            "SettledExpenses": [
                {
                    "id": 1,
                    "description": "Description of Expense",
                    "payer": {
                                "id": 2,
                                "firstName": "John",
                                "lastName": "Smith",
                    },
                    "owers": [
                        {
                            "id": 2,
                            "firstName": "John",
                            "lastName": "Smith",
                        },
                    ],
                    "settledOwers": [
                        {
                            "expenseId": 1,
                            "settledDate": "2023-01-01",
                            "settledUserId": 2
                        },
                    ],
                    "amount": 45,
                    "expenseDate": "2022-25-12",
                    "createdAt": "2022-25-12",
                    "updatedAt": "2022-25-12"
                },
            ],
        }
    ```
* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```
* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json

    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```


## Friends
### Get current user Friends

Return a list of all current user's friends

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/friends
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  [
    {
        "id": 1,
        "username": "JohnSmith",
        "firstName": "John",
        "lastName": "Smith",
        "email": "johnsmith@user.com"
    }
  ]
  ```


### Add a Friend

* Return user to be added to user's friends list

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/users/friends
  * Body:
  ```json
  ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
    ```json
    {
        "id": 1,
        "username": "JohnSmith",
        "firstName": "John",
        "lastName": "Smith",
        "email": "johnsmith@user.com"
    }
    ```

* Validation Errors


### Remove a Friend

Remove a friend from the current user's friends list

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/users/friends/:friendId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully removed",
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Cannot find user",
    }
    ```


## Expenses

### Get all expenses
Returns all Current User expenses

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/expenses/
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        }
    ]
    ```

### Get current user settled expenses
Return all current user's settled expenses (fully and partially paid)

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/expenses/settled
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  [
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        },
  ]


### Get Single Expense Id
Returns details of a single expense

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/expenses/:expenseId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        }
  ```
  * Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    { "errors": ["Expense not found"] }
    ```


### Get friend Expenses

Return list of expenses between current user and friend

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users/friends/:friendId/expenses
  * Headers:
    * Content-Type: application/json
  * Body:


* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
    [
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        }
    ]
    ```


### Post a new Expense
Creates and returns a new Expense

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/expenses/
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

### Update Expense
Updates and returns an existing expense

* Require Authentication: true
* Require proper authorization: Current user is the payer and there are no settled users yet
* Request
  * Method: PUT
  * URL: /api/expenses/:expenseId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
            "id": 1,
            "description": "Expense Description",
            "payer": {
                "id": 1,
                "firstName": "Demo",
                "lastName": "User",
            },
            "owers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "settledOwers": [
                {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith",
                }
            ],
            "amount": 45,
            "expenseDate": "2022-25-12",
            "createdAt": "2022-25-12",
            "updatedAt": "2022-25-12"
        }

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    ```

### Delete an Expense
Deletes an existing expense

* Require Authentication: true
* Require proper authorization: User must be the expense payer and there cannot be any settled owers yet
* Request
  * Method: DELETE
  * URL: /api/expenses/:expenseId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully Removed",
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Expense could not be found",
      "statusCode": 404
    }
    ```
