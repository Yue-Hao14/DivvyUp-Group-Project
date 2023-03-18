# MVP List

DivvyUp, a SplitWise clone, is a website for users to share expenses with friends and family

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like add friends, create expenses, view transaction history etc).
* Logged in users are directed to their dashboard page which displays an overview of total balance, amount they owe, amount they are owed and corresponding details as well.
* Logged out users are directed to a home page showing some features of the application.


## 2. Friends (partial CRUD)

* Logged in user can view their friends list on the side bar anywhere on the site
* Logged in users can add a friend and friends list will be updated on both sides
* Logged in user can unfriend another user in their friends list only if there is no outstanding expense between them and friends list will be updated on both sides


## 3. Comments (full CRUD)

* Logged in users can view comments when they click on a specific transaction
* Logged in users can create comments on any transactions they are involved in
* Logged in users can update their own comments
* Logged in users can delete their own comments


## 4. Expenses (full CRUD)

* Logged in users can 1) read/get all their pending expenses under "Dashboard" page 2) can see both pending and settled expenses under "All Expenses" page 3) can see pending expenses with a specific friend on the friend page
* Logged in user can create a new expense they paid and split with other users
* Logged in payer can update the details of the expense only if there is no settled expense yet
* Logged in payer can delete expenses only if there is no settled expense yet


## 5. Payments (partial CRUD)

* Logged in users can read/get details of their payments on "Payment History" page
* Payer of the expense can create a payment to settle their pending expenses with each ower, dashboard and all expenses pages will be updated accordingly


## 6. Bonus: Group (full CRUD)

* Logged in user can view all the groups they are part of on thier profile page and navbar
* Logged in user can create a group with other user from navbar
* All members of the group can add other users and leave the group
* Only owner of the group can delete the entire group
