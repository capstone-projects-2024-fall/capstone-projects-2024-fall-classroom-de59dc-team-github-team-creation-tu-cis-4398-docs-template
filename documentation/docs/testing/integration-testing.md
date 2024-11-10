---
sidebar_position: 2
---
# Integration tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

# Integration Testing for Use-Cases
1. Use-Case 1 Integration Tests: 
    - Application renders correct game theme when theme is selected 

2. Use-Case 2 Integration Tests: 
    - when user buys an item, money/points they have is updated and rendered with new amount
    - when user buys an item, that item appears in their inventory page 

3. Use-Case 3 Integration Tests:
    - Assignments page displays canvas assignments
    - Assignments page displays assignments in correct categories when they are changed in the settings page
    - program renders all changes made in edit avatar page to avatar page 
    - correct map is rendered based on the game theme chosen in the setup page 

4. Use-Case 4 Integration Tests:
    - coin total is updated after minigame is finished 
    - assignment page is changed to show that the assignment is DONE 

5. Use-Case 5 Integration Tests:
    - character level change is displayed to the user on character page 
    - skills user chooses are displayed to user on character page

6. Use-Case 6 Integration Tests:
    - message displays to user that they failed if they failed to complete an assignment on time
    - loss of gold is rendered in characters stats screen

7. Use-Case 7 Integration Tests:
    - when user trades money/points for something, money/points they have is updated and rendered with new amount

8. Use-Case 8 Integration Tests:
    - avatar is rerendered w/ hat on after "save avatar" button is clicked