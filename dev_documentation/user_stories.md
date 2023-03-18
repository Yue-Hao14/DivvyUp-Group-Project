# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, first name, last name, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy way to find a clear button on `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on `/login` page:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a splash page displaying information about the application.
      * So that I can easily log out to keep my information secure.

## Friends

### Viewing Friends

* As a logged in user, I want to be able to see my friend list on any page.
  * When I'm on any page:
    * I can view all my friends.
  * When I click on one of my friends and get directed to `/friends/:friendId` page
    * I want to see all pending transactions between this friend and me
    * I want to be able to easily see the total balance (net difference) between the two of us to easily determine how much one owes the other

### Adding Friends

* As a logged in user, I want to be able to add a friend
  * A modal will be opened with a email input box and a "add friends" button
  * I can add any existing user as a friend
  * Once the form is submitted, the modal will be closed and I will remain on the same page I was on before adding a friend
  * A new friend will be added to my friends list

### Unfriending

* As a logged in user I want to be able to unfriend on any page with a button click
  * I want to easily find the button to unfriend a specific friend in my friend's list
  * I want to only be able to unfriend with whom I do not have any pending expense with
  * Once unfriending request is confirmed, the modal will be closed and I will remain on the same page I was on before adding a friend
  * Friends list should be updated accordingly

## Comments (full CRUD)

### Viewing a comment

* As a logged in user, I want to be able to view comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see all the comments associated to this transaction (oldest at top, ascending order)
    * Each comment should show the user who posted the comment and the date (MM/DD/YYY) when the comment is created


### Adding a comment

* As a logged in user, I want to be able to add comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see a text input box and a "add a comment" button to create a new comment
    * Once the form is submitted, the new comment will show up at the bottom of the comments list


### Updating a comment

* As a logged in user, I want to be able to update my comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see an "update" icon
    * Once click on the "update" icon, I can update comments and post the updated comments
    * Once the form is submitted, the new comment will show up at the bottom of the comments list and the date will be "Edited on MM/DD/YYY"


### Deleting a comment

* As a logged in user, I want to be able to delete my comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see a "delete" icon next to my comments
    * Once click on the "delete" icon, a confirmation will be needed before I can delete the comment
    * Once it's confirmed, the comment will be removed from the comments list



## 4. Expenses (full CRUD)

### Viewing all pending expenses with all friends

* As a logged in user, I want to be able to view all my pending expenses when on `/dashboard` page
  * When viewing `/dashboard` page:
    * I want to see a summary of total balance, how much I owe and how much I am owed
    * Below the summary, I want to see who owes me money and how much
    * Below the summary, I want to see who I owe money to and how much


### Viewing all pending expenses with a specific friend

* As a logged in user, I want to be able to view all my pending expenses with this specific friend when on `/friends/:friendsId` page
  * When viewing `/friends/:friendsId` page:
    * I want to see the list of pending expenses broken down by month
    * I want to see summary of each expense
    * When I click on each expense, it will show me more details


### Viewing all expenses

* As a logged in user, I want to be able to view all my pending and settled expenses when on `/all-expenses` page
  * When viewing `/all-expenses` page:
    * I want to see the list of all expenses (pending and setlled) broken down by month with all of my friends
    * I want to see summary of each expense
    * When I click on each expense, it will show me more details


### Viewing specific expense

* As a logged in user, I want to be able to view the specific expense when click on it
  * When viewing specific transaction:
    * I want to see a summary of who added the expense and when
    * Below summary, I want to see who paid the expense and details of who owes the payer and by how much
    * Below the summary, I want to see all the comments


### Adding an expense

* As a logged in user, I want to be able to add an expenses anywhere on the site
    * I want to see a "Add an expense" button in the top navigation bar
    * When click on "Add an expense" button, a modal will open and I need to input the user(s) I want to split the expense with, some input boxes for description , amount, and how to split it (split evenly by default, they owe full or I owe the full amount), and a date (default to today), and finally "Cancel" and "Save" buttons at the end
    * Once click on the "Cancel" button, modal will be closed withour submit the form and back to previous page
    * I must enter a description, an amount greater than 0 and an expense date, otherwise an error message will be shown
    * Once form is submitted successfully, the modal should close. I will see the current page being updated with the new expense


### Updating an expense

* As a logged in user, I want to be able to edit an expense only if I am the payer of the expense and no one has settled on this expense yet
  * When click on "Edit expense" button:
    * A modal same as "add an expense" will pop up with prefilled details of this expense
    * Same restrictions as "add an expense" before I can save the changes
    * Once click on the "Cancel" button, modal will be closed withour submit the form and back to previous page
    * Once form is submitted successfully, the modal should close. I will see the current page being updated with the updated expense


### Deleting an expense

* As a logged in user, I want to be able to delete an expense only if I am the payer of the expense and no one has settled on this expense yet:
  * I want to see a "delete" icon next to the expense summary
  * When click on "delete" icon, an alert will pop up to confirm I REALLY want to delete this expense for ALL people involved with a "Cancel" and a "OK" button
  * Once click on the "Cancel" button, modal will be closed withour deleting the expense and back to previous page
  * Once click on the "OK" button, previous page will show up and the expenses list will be updated accordingly


## Payment (partial CRUD)

### Viewing payment history
  * As a logged in user
    * I should be able to view payment history, by clicking on "Payment History" in the side bar and when click on it, I will be redirected to `/payment-history` page
      * The payment history should show payment summary with any users who paid me or who I paid to

### Add a payment
  * As a logged in user, when I am on a specific expense details
    * I should be able see a "settle up" button next to any users who has not paid me back, only when I am the payer of the expense
    * When click on "settle up" button, a modal will show up with settled amount, which user to settle with prefilled and an input box for settled date (default to today)
    * Settled date is required when adding a payment. If empty, an error message will show up
    * Once the form is submitted successfully, "settle up" button should disappear next to that ower and payment history will be updated accordingly

