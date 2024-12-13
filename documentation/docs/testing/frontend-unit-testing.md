---
sidebar_position: 1
---
# Front End Unit Tests

## Front End Unit Tests for React Components  
### Overview
This section outlines the unit tests for key React components used in the **Canvas Quest** RPG game. Each React component will have its corresponding test file, ensuring core functionality is tested without redundancy.

All tests will:

* Confirm that the component renders correctly.
* Verify that components updating state behave as expected.
* Utilize mock data to simulate backend interaction.  

General Testing Guidelines:
1. **Rendering Tests**   
Every component must have at least one test to confirm it renders on the DOM.
2. **State Update Tests**  
For components with state variables, the tests ensure the state updates correctly upon user actions.
3. **Mocking Backend Calls**  
Mocked user data, tasks, inventory, and pet information will be used to simulate backend interactions.
For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.
