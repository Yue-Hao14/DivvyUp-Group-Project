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
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Friends (partial CRUD)

### Viewing Friends

* As a logged in user, I want to be able to see my friend list on my profile page.
  * When I'm on the `/my-friends` page:
    * I can view all my friends.
  * When I click on one of my friends:
    * I want to see any unsettled transactions between us
    * I want to be able to easily see the net difference between the two of us to easily determine how much one owes the other
    * If there is neither of us owes each other money, I want to have an option to see a list of past settled expenses

### Searching for Friends
  * TODO: figure out how searching for friends and adding friends works on Splitwise

### Unfriending
  * As a logged in user I want to easily find the settings to unfriend a friend in my friends list
    * When I'm on the `/my-friends` page:
      * I want to easily find the setting to unfriend a specific friend in my friend's list
      * I don't want to have some confirmation before completing the unfriending action

## Groups (full CRUD)

### Creating a Group
  * As a logged in user I want to be able to easily add a group
      * When I'm on the `/my-groups` page:
        * I want to easily add people to my group
        * Those members do not need to be a part of my fiendslist (?)

### Getting Details about the Group
  * As a logged in user and a member of the group:
    * When I'm on the `/my-groups/:groupId` page:
      * I want to easily see who I owe money to
      * I want to easily see who owes money to me
      * I should be able to easily find out who the other group members are, and how to contact them

### Updating the Group
  * As a logged in user and a member of the group:
    * When I'm on the `/my-groups/:groupId` page:
      * I should be able to easily find the settings to update the group details (group name and group members)
      * If a user has unsettled expenses within the group, their balance must be 0 before they can be removed from the group
      * There should be a prompt to confirm that the user should be removed from the group before they are actually removed

### Deleting the Group
  * As a logged in user and a member of the group:
    * When I'm on the `/my-groups/:groupId` page:
      * I want to easily find the settings to delete the group
      * If I was not the one who created the group I should not have the ability to delete the entire group, only the ability to leave the group (if that's how we want to set up our app even though that's not how the original has it set up)
      * If I am the owner of the app I should have the authority to delete the group
        * There should be a prompt to confirm that the group should be deleted before actually deleteing the group

## Bills (full CRUD)

### Creating Bills

### Viewing Bill Details

### Updating Bills

### Deleting Bills


## Transaction History (full CRUD)

### Creating Transaction History
  * As a logged in user
    * The first time an expense is settled between another user and me, a history of our transactions should be made

### Viewing Transaction History
  * As a logged in user
    * I should be able to view my full transaction history, by easily finding a tab on the splash page ("All Expenses")
    * I should be able to easily find a transaction history between my fiends and me by clicking on their names in my fiends list
    * I should be able to easily find a transaction history for the groups I'm in by clicking the group name in my groups

### Updating Transaction History
  * As a logged in user:
    * I should be able to update any of my past tansaction details that I was involved in

### Deleting Transaction History
  * As a logged in user:
    * I should be able to delete any of my past transaction details that I was involved in
