import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import CreateQuestsPage from './CreateQuests'; 
import { QuestContext } from './QuestContext';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

//Unit test 1: Create Quest Title 
describe('CreateQuestsPage', () => {
    it('allows the user to input a quest title', () => {
        // Mock `addQuest` function
        const mockAddQuest = vi.fn();

        // Wrap the component with QuestContext.Provider and MemoryRouter
        render(
            <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
                <MemoryRouter>
                    <CreateQuestsPage />
                </MemoryRouter>
            </QuestContext.Provider>
        );

        // Find the input field for the quest title
        const questTitleInput = screen.getByPlaceholderText('Enter quest title');

        // Simulate user typing a quest title
        fireEvent.change(questTitleInput, { target: { value: 'My First Quest' } });

        // Assert that the input field displays the typed value
        expect(questTitleInput.value).toBe('My First Quest');
    });
});

//Unit test 2: Topic Selection 
it('allows the user to select a coding topic from the dropdown', () => {
    // Mock addQuest function
    const mockAddQuest = vi.fn();

    // Wrap the component with QuestContext.Provider and MemoryRouter
    render(
        <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
            <MemoryRouter>
                <CreateQuestsPage />
            </MemoryRouter>
        </QuestContext.Provider>
    );

    // Find the coding topic input (using datalist)
    const codingTopicInput = screen.getByPlaceholderText('Select or search for a coding topic');

    // Simulate user typing and selecting a coding topic
    fireEvent.change(codingTopicInput, { target: { value: 'Algorithms' } });

    // Assert that the input field displays the selected value
    expect(codingTopicInput.value).toBe('Algorithms');
});

// Unit test 3: Number of Problems Input Verification
it('Allows the user to input the number of problems and restricts to the allowed range', () => {
    const mockAddQuest = vi.fn();
    render(
        <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
            <MemoryRouter>
                <CreateQuestsPage />
            </MemoryRouter>
        </QuestContext.Provider>
    );

    // Find the number of problems input field
    const problemCountInput = screen.getByLabelText('Amount of Problems (3-8):');

    // Simulate user inputting a valid value (e.g., 5)
    fireEvent.change(problemCountInput, { target: { value: '5' } });
    expect(problemCountInput.value).toBe('5');

    // Simulate user inputting a value below the minimum (e.g., 2)
    fireEvent.change(problemCountInput, { target: { value: '2' } });
    expect(problemCountInput.value).toBe('3'); // Should adjust to the minimum value of 3

    // Simulate user inputting a value above the maximum (e.g., 9)
    fireEvent.change(problemCountInput, { target: { value: '9' } });
    expect(problemCountInput.value).toBe('8'); // Should adjust to the maximum value of 8
});
//Unit test 4: Selecting Difficulty Level (using medium as examplex)
it('allows the user to select a difficulty level from the dropdown', () => {
    const mockAddQuest = vi.fn();
    render(
        <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
            <MemoryRouter>
                <CreateQuestsPage />
            </MemoryRouter>
        </QuestContext.Provider>
    );

    // Find the Difficulty Level dropdown 
    const difficultySelect = screen.getByLabelText('Difficulty Level:');

    // Simulate user selecting a difficulty level ("Medium")
    fireEvent.change(difficultySelect, { target: { value: 'Medium' } });

    // Assert that the selected value is "Medium"
    expect(difficultySelect.value).toBe('Medium');
});

//Unit test 5: Selecting enemy (using mr.mushroom as example)
it('allows the user to select an enemy from the dropdown', () => {
    const mockAddQuest = vi.fn();
    render(
        <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
            <MemoryRouter>
                <CreateQuestsPage />
            </MemoryRouter>
        </QuestContext.Provider>
    );

    // Find the Enemy dropdown
    const enemySelect = screen.getByLabelText('Enemy:');

    // Simulate user selecting an enemy ("Mr. Mushroom")
    fireEvent.change(enemySelect, { target: { value: 'Mr. Mushroom' } });

    // Assert that the selected value is "Mr. Mushroom"
    expect(enemySelect.value).toBe('Mr. Mushroom');
});
// Unit test 6: Background Selection
it('allows the user to select a background from the dropdown', () => {
    const mockAddQuest = vi.fn();
    render(
        <QuestContext.Provider value={{ addQuest: mockAddQuest }}>
            <MemoryRouter>
                <CreateQuestsPage />
            </MemoryRouter>
        </QuestContext.Provider>
    );

    // Find the Background dropdown
    const backgroundSelect = screen.getByLabelText('Background:');

    // Simulate user selecting a background ("Castle Ruins")
    fireEvent.change(backgroundSelect, { target: { value: 'Castle Ruins' } });

    // Assert that the selected value is "Castle Ruins"
    expect(backgroundSelect.value).toBe('Castle Ruins');
});