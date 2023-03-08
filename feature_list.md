# MVP List

DivvyUp, a SplitWise clone, is a website for users to share expenses with friends and family

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like fauxtweeting and fauxliking posts).
* Logged in users are directed to their profile page which displays their fauxtweets.
* Logged out users are directed to a page displaying several recent fauxtweets.

## 2. Friends (partial CRUD)

* Logged in user can view their friend list on their profile page
* Logged in users can search other users and send a friend request
* Logged in users can accept or decline a friend request
* Friend list is updated once a friend request is accepted
* Logged in user can unfriend another user in their friend list

## 3. Group (full CRUD)

* Logged in user can view all the groups they are part of on thier profile page and navbar
* Logged in user can create a group with other user from navbar
* All members of the group can add other users and leave the group
* Only owner of the group can delete the entire group (are we sure about this? Do we want to change it for our app?)

## 4. Bills (full CRUD)

* Logged in users can read/get all the bills they are associated to
* Logged in users can create a new bill and send split requests to other users
* Logged in users can update the details of the bill they created
* Logged in users can delete the bills they created

## 5. Transaction History (partial CRUD)

* Logged in users can view their transcation history
* Group member can see group transaction history
* A transaction history should be created when a new bill is created and when a new user is created
* Once a bill is paid, transcation history should be updated accordingly


## 6. Bonus Comments

* Logged in users can view comments when they click on a specific transaction
* Logged in users can create comments on any transaction
* Logged in users can update their own comments
* Logged in users can delete their own comments
