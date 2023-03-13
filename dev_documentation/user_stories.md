# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
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
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a splash page displaying information about the application.
      * So that I can easily log out to keep my information secure.

## Friends

### Viewing Friends

* As a logged in user, I want to be able to see my friend list on my profile page.
  * When I'm on the `/friends` page:
    * I can view all my friends.
  * When I click on one of my friends and get directed to `/friends/:friendId` page
    * I want to see any transactions between us
    * I want to be able to easily see the net difference between the two of us to easily determine how much one owes the other
    * If there is neither of us owes each other money, I want to have an option to see a list of past settled expenses

### Adding Friends

* As a logged in user, I want to be able to add a friend
  * A modal will be opened with username, message input box and a "add friends" button
  * User can only add existing user as a friend
  * Once the form is submitted, I will be rediredted to my dashboard
  * A new friend will be added to my friends list

### Unfriending

* As a logged in user I want to be able to unfriend on `/friends/:friendId` page with a button click
  * When I'm on the `/friends/:friendId` page:
    * I want to easily find the button to unfriend a specific friend in my friend's list
    * I want to have some confirmation before completing the unfriending action
    * Once unfriending request is confirmed, I will be rediredted to my dashboard
    * Friends list should be updated accordingly



## Comments (full CRUD)

### Viewing a comment

* As a logged in user, I want to be able to view comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see all the comments associated to this transaction (oldest at top, ascending order)
    * Each comment should show the user who posted the comment and the date (MM/DD/YYY) when the comment is posted


### Adding a comment

* As a logged in user, I want to be able to add comments when click on a specific transaction
  * When viewing transaction details:
    * I want to see a text input box and a "post" button to create a new comment
    * The "post" button should be disabled until user has to input at least 3 characters
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

### Viewing all expenses

* As a logged in user, I want to be able to view all my pending expenses when on `/dashboard` page
  * When viewing `/dashboard` page:
    * I want to see a summary of total balance, how much I owe and how much I am owed
    * Below the summary, I want to see who owes me money and how much by decending order (latest at top)
    * Below the summary, I want to see who I owe money to and how much by decending order (latest at top)


### Viewing individual expense

* As a logged in user, I want to be able to view specific expenses when click on it
  * When viewing specific transaction:
    * I want to see a summary of who added the expense and when
    * Below summary, I want to see who paid the expense and details of who owes the payer and by how much
    * Below the summary, I want to see all the comments


### Adding an expense

* As a logged in user, I want to be able to add an expenses when on `/dashboard` page, when on `/friends/:friendId` page
  * When on `/dashboard` page
    * I want to see a "Add an expense" button
    * When click on "Add an expense" button, a modal will open and I need to input the user I want to split the expense with
    * After I input a valid user, a form will be displayed with some input boxes for description , amount, paid by who (default to you), and how to split it (split evenly by default, they owe full or I owe the full amount), and a date (default to today), and finally "Cancel" and "Save" buttons at the end
    * Once click on the "Cancel" button, modal will be closed withour submit the form and back to previous page
    * I must enter a description and an amount greater than 0, otherwise an error message will be shown and "Save" button will be deactivated
    * Once form is submitted successfully, the modal should close. I will see the current page being updated with the new expense

  * When on `/friends/:friendId` page:
    * When click on "Add an expense" button, a modal will open showing the friend I am splitting this expense with
    * A form will be displayed with some input boxes for description , amount, paid by who (default to you), and how to split it (split evenly by default, they owe full or I owe the full amount), and a date (default to today), and finally "Cancel" and "Save" buttons at the end
    * Once click on the "Cancel" button, modal will be closed withour submit the form and back to previous page
    * I must enter a description and an amount greater than 0, otherwise an error message will be shown and "Save" button will be deactivated
    * Once form is submitted successfully, the modal should close. I will see the current page being updated with the new expense


### Updating an expense

* As a logged in user, I want to be able to edit an expense when viewing an expense's details
  * When click on "Edit expense" button:
    * A modal same as "add an expense" will pop up with prefilled details of this expense
    * Same restrictions as "add an expense" before I can save the changes
    * Once click on the "Cancel" button, modal will be closed withour submit the form and back to previous page
    * Once form is submitted successfully, the modal should close. I will see the current page being updated with the new expense


### Deleting an expense

* As a logged in user, I want to be able to delete an expense I am involved in when viewing that expense:
  * I want to see a "delete" icon next to the expense summary
  * When click on "delete" icon, an alert will pop up to confirm I REALLY want to delete this expense for ALL people involved with a "Cancel" and a "OK" button
  * Once click on the "Cancel" button, modal will be closed withour deleting the expense and back to previous page
  * Once click on the "OK" button, previous page will show up and the expenses list will be updated accordingly


## Transaction History (partial CRUD)

### Viewing transaction history
  * As a logged in user
    * I should be able to view my full transaction history, by easily finding a tab on the navbar ("All Expenses") and when click on it, I will be redirected to `/all` page
      * The transaction history should show expenses summary with any users
    * I should be able to easily find a transaction history between my fiends and me by clicking on their names in my fiends list and be redirected to `/friends/:friendId` page
    * The transaction history should show expenses summary with this specific friend


### Creating transaction history
  * As a logged in user, when I first signed up for the application, I should have an empty transaction history when on `/all` or `/friends/:friendId` pages


### Updating transaction history
  * As a logged in user, I should see my transaction history being updated whenever there is a change to any of expenses that I am involved in
