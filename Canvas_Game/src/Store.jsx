import React, { useState, useEffect } from 'react';
import './index.css';
import styles from './Store.module.css';
import items from './data/itemData.js';

export default function Store(){
    const [gold, setGold] = useState(0); // Initialize with 0

    useEffect(() => {
        const storedGold = localStorage.getItem('gold');
        if (storedGold) {
            setGold(parseInt(storedGold, 10)); // Retrieve gold amount from localStorage
        }
    }, []);

    const [selectedItems, setSelectedItems] = useState([]);

    const firstSet = items.slice(0, 4);
    const secondSet = items.slice(4, 8); // Ensures this set includes only items 4–7
    const thirdSet = items.slice(8);

    // Handle item selection
    const handleSelection = (itemId) => {
        setSelectedItems((prev) =>
        prev.includes(itemId)
            ? prev.filter((id) => id !== itemId) // Deselect if already selected
            : [...prev, itemId] // Add to selection
        );
    };

    // Handle the "Buy" action
    const handleBuy = () => {
        console.log('handleBuy function triggered');
        if (selectedItems.length === 0) {
            alert('No items selected!');
            return;
        }

        console.log('Selected Items:', selectedItems);

        const totalPrice = selectedItems.reduce((sum, itemId) => {
            const item = items.find((item) => item.id === itemId);
        
            // If item exists, add its price to the sum
            if (item) {
              console.log('Processing Item:', item.name, 'Price:', item.price);
              return sum + item.price;
            }
            return sum; // If item doesn't exist, return the current sum
        }, 0);

        console.log('Total Price:', totalPrice);
        console.log('Current Gold:', gold);

        if (gold >= totalPrice) {
            console.log('Sufficient gold. Proceeding with purchase...');
            const newGold = gold - totalPrice;  // Calculate new gold value directly
            console.log('New Gold After Purchase:', newGold);  // Log the new gold amount after deduction

            const email = localStorage.getItem('email'); // Retrieve email from localStorage
            if (!email) {
                alert('Email not found in localStorage');
                return;
            }

            // Make an API call to update the gold amount in the database
            fetch("http://127.0.0.1:5000/api/updatePlayerGold", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, amount: -totalPrice }),// Negative for spending
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
            })
            .then(data => {
                console.log('Gold amount updated in the database:', data);
                setGold(newGold);  // Directly update gold state
                localStorage.setItem('gold', newGold); // Update gold amount in localStorage
                alert(`Purchase successful! You bought: ${selectedItems.join(', ')}`);
                setSelectedItems([]); // Clear selected items
            })
            .catch(error => {
                console.error('Error updating gold amount:', error);
                alert('Failed to update gold amount. Please try again.');
            });
        } else {
            alert('Not enough gold to buy the selected items!');
        }
    };

    return( 
        <div>
            <h1 className={styles.title}>
                <strong>Store</strong>
            </h1>

            <div className={styles.goldBox}>
                <span>Gold: {gold}</span>
            </div>

            <div className={styles.imageBoxGroupsContainer}>
                <div className={styles.imageBoxGroup}>
                    <div className={styles.storeContainer}>
                        <div className={styles.itemSetsWrapper}>
                            {firstSet.map((item) => (
                                <div key={item.id} className={styles.imageBoxContainer}>
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        className={styles.imageCheckbox}
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleSelection(item.id)}
                                    />
                                    <label htmlFor={item.id} className={styles.imageLabel}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={styles.image}
                                        />
                                        <span>{item.name} : {item.price} Gold</span>
                                        <div className={styles.tooltip}>
                                            <p>{item.description}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                            {secondSet.map((item) => (
                                <div key={item.id} className={styles.imageBoxContainer}>
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        className={styles.imageCheckbox}
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleSelection(item.id)}
                                    />
                                    <label htmlFor={item.id} className={styles.imageLabel}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={styles.image}
                                        />
                                        <span>{item.name} : {item.price} Gold</span>
                                        <div className={styles.tooltip2}>
                                            <p>{item.description}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                            <div className={styles.thirdSetContainer}>
                                {thirdSet.map((item) => (
                                    <div key={item.id} className={styles.imageBoxContainer}>
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            className={styles.imageCheckbox}
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelection(item.id)}
                                        />
                                        <label htmlFor={item.id} className={styles.imageLabel}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className={styles.image}
                                            />
                                            <span>{item.name} : {item.price} Gold</span>
                                            <div className={styles.tooltip2}>
                                                <p>{item.description}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className={styles.buyButton} onClick={handleBuy}>
                Buy Selected Items
            </button>
        </div>
    );
}