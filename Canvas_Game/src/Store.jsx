import React, { useState } from 'react';
import './index.css';
import styles from './Store.module.css';
import items from './data/itemData.js';


import diamondhelmet from './assets/DiamondHelmet.png';
import diamondchest from './assets/DiamondChestplate.png';
import diamondleggings from './assets/DiamondLeggings.png';
import diamondboots from './assets/DiamondBoots.png';




export default function Store(){
    const [gold, setGold] = useState(100)

    const [selectedItems, setSelectedItems] = useState([]);

    const firstSet = items.slice(0, 4); 
    const secondSet = items.slice(4); 

    
    {/*
      // Updated item data with descriptions
    const items = [
    {
      id: 'DiamondHelmet',
      name: 'Diamond Helmet',
      price: 50,
      description: 'A sturdy diamond helmet to protect your head in battle. DEF: 5',
      image: diamondhelmet
    },
    {
      id: 'DiamondChest',
      name: 'Diamond Chestplate',
      price: 100,
      description: 'A high quality chestplate, shiny. DEF: 10',
      image: diamondchest
    },
    {
      id: 'DiamondLeggings',
      name: 'Diamond Leggings',
      price: 70,
      description: 'Great pants, 10/10, would recommend. DEF: 8',
      image:diamondleggings
    },
    {
      id: 'DiamondBoots',
      name: 'Diamond Boots',
      price: 40,
      description: 'Imagine how uncomfortable these feel like. DEF: 5',
      image: diamondboots
    },
    ];
    */}
    

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
        if (selectedItems.length === 0) 
        {
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
            setGold(newGold);  // Directly update gold state
            alert(`Purchase successful! You bought: ${selectedItems.join(', ')}`);
            setSelectedItems([]); // Clear selected items
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
                {/*First Group of items*/}
                {/*
                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondHelmet" className={styles.imageCheckbox} />
                <label htmlFor="DiamondHelmet" className={styles.imageLabel}>
                    <img src={diamondhelmet} alt="Diamond Helmet" className={styles.image} />
                    <span>Diamond Helmet : 50 Gold</span>
                    <div className={styles.tooltip}>
                        <p>A sturdy diamond helmet to protect your head in battle----- DEF: 5</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondChest" className={styles.imageCheckbox} />
                <label htmlFor="DiamondChest" className={styles.imageLabel}>
                    <img src={diamondchest} alt="Diamond Chest" className={styles.image} />
                    <span>Diamond Chestplate : 100 Gold</span>
                    <div className={styles.tooltip}>
                        <p>A high quality chestplate, shiny----- DEF: 10</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondLeggings" className={styles.imageCheckbox} />
                <label htmlFor="DiamondLeggings" className={styles.imageLabel}>
                    <img src={diamondleggings} alt="Diamond Leggings" className={styles.image} />
                    <span>Diamond Leggings : 70 Gold</span>
                    <div className={styles.tooltip}>
                        <p>Great pants, 10/10, would recommend----- DEF: 8</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondBoots" className={styles.imageCheckbox} />
                <label htmlFor="DiamondBoots" className={styles.imageLabel}>
                    <img src={diamondboots} alt="Diamond Boots" className={styles.image} />
                    <span>Diamond Boots : 40 Gold</span>
                    <div className={styles.tooltip}>
                        <p>Imagine how uncomfortable these feel like----- DEF: 5</p>
                    </div>
                </label>
                </div>
                */}
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
                                    {/* Tooltip for the description */}
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
                                    {/* Tooltip for the description */}
                                    <div className={styles.tooltip2}>
                                        <p>{item.description}</p>
                                    </div>
                                    </label>
                                </div>

                        ))}
                      </div>
                     </div>



            </div>




            
            {/*Second group of items*/}
            {/*
            <div className={styles.imageBoxGroup2}>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondHelmet" className={styles.imageCheckbox} />
                <label htmlFor="DiamondHelmet" className={styles.imageLabel}>
                    <img src={diamondhelmet} alt="Diamond Helmet" className={styles.image} />
                    <span>Diamond Helmet : 50 Gold</span>
                    <div className={styles.tooltip2}>
                        <p>A sturdy diamond helmet to protect your head in battle----- DEF: 5</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondChest" className={styles.imageCheckbox} />
                <label htmlFor="DiamondChest" className={styles.imageLabel}>
                    <img src={diamondchest} alt="Diamond Chest" className={styles.image} />
                    <span>Diamond Chestplate : 100 Gold</span>
                    <div className={styles.tooltip2}>
                        <p>A high quality chestplate, shiny----- DEF: 10</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondLeggings" className={styles.imageCheckbox} />
                <label htmlFor="DiamondLeggings" className={styles.imageLabel}>
                    <img src={diamondleggings} alt="Diamond Leggings" className={styles.image} />
                    <span>Diamond Leggings : 70 Gold</span>
                    <div className={styles.tooltip2}>
                        <p>Great pants, 10/10, would recommend----- DEF: 8</p>
                    </div>
                </label>
                </div>

                <div className={styles.imageBoxContainer}>
                <input type="checkbox" id="DiamondBoots" className={styles.imageCheckbox} />
                <label htmlFor="DiamondBoots" className={styles.imageLabel}>
                    <img src={diamondboots} alt="Diamond Boots" className={styles.image} />
                    <span>Diamond Boots : 40 Gold</span>
                    <div className={styles.tooltip2}>
                        <p>Imagine how uncomfortable these feel like----- DEF: 5</p>
                    </div>
                </label>
                </div>

            </div>


         </div>
         */}

            {/*Second row of items*/}
            {/*
         <div className={styles.imageBoxGroupsContainer2}>

            <div className={styles.imageBoxGroup3}>
                <div className={styles.imageBoxContainer}>
                    <input type="checkbox" id="DiamondHelmet" className={styles.imageCheckbox} />
                    <label htmlFor="DiamondHelmet" className={styles.imageLabel}>
                        <img src={diamondhelmet} alt="Diamond Helmet" className={styles.image} />
                        <span>Diamond Helmet : 50 Gold</span>
                        <div className={styles.tooltip}>
                            <p>A sturdy diamond helmet to protect your head in battle----- DEF: 5</p>
                        </div>
                    </label>
                </div>


                <div className={styles.imageBoxContainer}>
                    <input type="checkbox" id="DiamondChest" className={styles.imageCheckbox} />
                    <label htmlFor="DiamondChest" className={styles.imageLabel}>
                        <img src={diamondchest} alt="Diamond Chest" className={styles.image} />
                        <span>Diamond Chestplate : 100 Gold</span>
                        <div className={styles.tooltip2}>
                            <p>A high quality chestplate, shiny----- DEF: 10</p>
                        </div>
                    </label>
                </div>
            </div>
            */}
         </div>
         

         <button className={styles.buyButton} onClick={handleBuy}>
            Buy Selected Items
         </button>

        </div>
        
    
        
    );



}