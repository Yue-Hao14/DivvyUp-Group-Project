# Example Redux State

```javascript
{
  session:{
    users: {
        id: 1,
        username: "DemoUser",
        firstName: "Demo",
        lastName: "User",
        email: "demo@user.com"
    }
  },
  friends: {
    2: {
        id: 2,
        username: "JohnSmith",
        firstName: "John",
        lastName: "Smith",
        email: "johnsmith@user.com"
    },
    3: {
        id: 3,
        username: "JaneDoe",
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@user.com"
    }
  },
  expenses: {
    allExpenses: {
      1: {
        id: 1,
          description: "Expense Description",
          payer: {
            id: 1,
              firstName: "Demo",
              lastName: "User",
          },
          owers: [
            {
              id: 2,
                  firstName: "John",
                  lastName: "Smith",
              }
          ],
          settledOwers: [
            {
              id: 2,
                  firstName: "John",
                  lastName: "Smith",
              }
          ],
          amount: 45,
          expenseDate: "2022-25-12",
          createdAt: "2022-25-12",
          updatedAt: "2022-25-12"
      }
    }
    settledExpenses: {
      1: {
            id: 1,
            description: "Expense Description",
            payer: {
                id: 1,
                firstName: "Demo",
                lastName: "User",
            },
            owers: [
                {
                    id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            settledOwers: [
                {
                    id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            amount: 45,
            expenseDate: "2022-25-12",
            createdAt: "2022-12-25",
            updatedAt: "2022-12-25"
      }
    }
    currentExpenseSummaries: {
        1: {
          id: 1,
            description: "Expense Description",
            payer: {
              id: 1,
                firstName: "Demo",
                lastName: "User",
            },
            owers: [
              {
                id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            settledOwers: [
              {
                id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            amount: 45,
            expenseDate: "2022-25-12",
            createdAt: "2022-12-25",
            updatedAt: "2022-12-25"
      }
    },
    currentExpenseDetails: {
      id: 1,
            description: "Expense Description",
            payer: {
                id: 1,
                firstName: "Demo",
                lastName: "User",
            },
            owers: [
                {
                    id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            settledOwers: [
                {
                    id: 2,
                    firstName: "John",
                    lastName: "Smith",
                }
            ],
            amount: 45,
            expenseDate: "2022-25-12",
            createdAt: "2022-12-25",
            updatedAt: "2022-12-25"
    }
  },
  comments: {
    1: {
      id: 1,
      comments: [
                    {
                      id: 1,
                      user: {
                                id: 1,
                                firstName: "Demo",
                                lastName: "User",
                              },
                      expenseId: 1,
                      comment: "Comment",
                      createdAt: "2023-10-10",
                      updatedAt: "2023-10-10"
                    }
                  ]
    }
  }
}
```
