# MVP List

DivvyUp, a SplitWise clone, is a website for users to share expenses with friends and family

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like add friends, create expenses, view transaction history etc).
* Logged in users are directed to their profile page which displays their dashboard of their current pending expenses.
* Logged out users are directed to a home page showing some features of the application.


## 2. Friends (partial CRUD)

* Logged in user can view their friends list on their profile page
* Logged in users can add a friend and friends list will be updated on both sides
* Logged in user can unfriend another user in their friends list and friends list will be updated on both sides


## 3. Comments (full CRUD)

* Logged in users can view comments when they click on a specific transaction
* Logged in users can create any number of comments on any of their own transaction
* Logged in users can update their own comments
* Logged in users can delete their own comments


## 4. Expenses (full CRUD)

* Logged in users can read/get all their pending expenses
* Logged in users can create a new expense and send split requests to other users
* Logged in users can update the details of the expense
* Logged in users can delete expenses


## 5. Transaction History (partial CRUD)

* Logged in users can view their transcation history
* A transaction history page should be created when a new user is created
* Once a bill is paid, transcation history should be updated accordingly
* Logged in user should not be able to update/delete their transaction history


## 6. Bonus: Group (full CRUD)

* Logged in user can view all the groups they are part of on thier profile page and navbar
* Logged in user can create a group with other user from navbar
* All members of the group can add other users and leave the group
* Only owner of the group can delete the entire group
