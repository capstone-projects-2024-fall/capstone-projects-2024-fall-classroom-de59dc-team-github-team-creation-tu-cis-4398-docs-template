import { createContext, useState } from 'react';

// Create the context
export const QuestContext = createContext();

// Create a provider component
export const QuestProvider = ({ children }) => {
  const [quests, setQuests] = useState([
    { id: 1, title: 'The Algorithmic Forest', type: 'Adventure', difficulty: 'Medium', status: 'In Progress' },
    { id: 2, title: 'Sorting Odyssey', type: 'Puzzle', difficulty: 'Hard', status: 'Completed' },
    { id: 3, title: 'Recursive Battle', type: 'Combat', difficulty: 'Easy', status: 'Not Started' }
  ]);

  // Adding a quest to the previous list of quest items.
  const addQuest = (quest) => {
    setQuests((prevQuests) => [...prevQuests, quest]);
  };

  return (
    // {QuestContext.provder wraps around any children components passed to QuestProvider}
    <QuestContext.Provider value={{ quests, addQuest }}>
      {children}
    </QuestContext.Provider>
  );
};
