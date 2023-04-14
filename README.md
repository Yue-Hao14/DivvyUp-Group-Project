# DivvyUp-Group-Project
DivvyUp, a SplitWise clone, is a website for users to track bills and share expenses with friends and family, so that everyone gets paid back. We organize all your shared expenses in one place, so that everyone can see who they owe. Whether you are sharing a ski vacation, splitting rent with roommates, or paying someone back for lunch, Divvyup makes life easier.

Live site: [DivvyUp](https://divvyup.onrender.com/)

# Wiki Link
* Backend Routes
* [Database Schema](https://github.com/Yue-Hao14/DivvyUp-Group-Project/wiki)
* [Feature List](https://github.com/Yue-Hao14/DivvyUp-Group-Project/blob/main/dev_documentation/feature_list.md)

# Tech Stack
* Back-end: Python, Postgres, Flask, SQLite
* Front-end: JavaScript, React, Redux, HTML, CSS
* Hosting: Render

# Expense and Payment Features
## Expense Feature
Our team has thorough think through this feature when we design our website.
* The expense feature allow user to track all their own expenses in one place and breakdown their expenses with friends and family on the inidivdual friends page as well for easy tracking and monitoring.
* User can add an expense whereever they are on our wevsite since this is the core function of our site. User can choose to add a past expense or a future expense and share it with any numbers of friends with a good description they desire for easy tracking.
* When thinking about who can edit existing expense, we put ourself in user's shoes and decided that only the payer of the expense should have rights to change details of the expense, instead of people who owes money on this transaction. The same thought goes to deleting an expense function.

## Payment Feature
When we design this feature, we focused on the relationship between payment and expense to make a smooth and cohesive user experience.
* The payment feature allow user to easily track all the payments between friends, including money they paid to friends as well as money repaid by their friends.
* When thinking about who can initiate a settlement, from a fairness perspective, we decided that only payer of the expense has the right to confirm this expense has been repaid and settle up with individual friends accordingly.

# Landing Page
You can access to Login page, Signup Page. Also we have a demo user button for you to check the website.
![Screenshot 2023-03-20 at 10 49 21 AM](https://user-images.githubusercontent.com/105403119/226377084-e2e65ce3-2d28-45dd-b2d4-ec556cf38731.png)

# API Routes
Some of the API Routes implemented in this project. To see more please checkout the [API Routes](https://github.com/Yue-Hao14/DivvyUp-Group-Project/blob/main/dev_documentation/API_Routes.md) in the wiki.

## Log In a User
Logs in a current user with valid credentials and returns the current user's information.

* Requires Authentication: false
* Request: 
  * Method: POST
  * Headers: 
    * Content-Type: application/json
  * Body:
  ```json
  {
    "email": "demo@user.com",
    "password": "password"
  }
  ```
  
* Successful Response:
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
  
* Error Response: Invalid Credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  {
    "errors": [
                "Email provided not found.",
                "No such user exists.",
                "Password was incorrect."
              ]
  }
  ```
* Error Response: Body Validation Errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  {
    "errors": [
                "Email is required.",
                "Password is required.",
              ]
  }
  ```
