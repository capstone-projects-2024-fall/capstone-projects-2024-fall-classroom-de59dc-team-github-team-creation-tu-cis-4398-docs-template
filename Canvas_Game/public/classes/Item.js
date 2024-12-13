class Item {
  constructor({ name, type, description }) {
    this.name = name; // Name of the item
    this.type = type; // Type of the item (e.g., Weapon, Potion, etc.)
    this.description = description || "No description available."; // Default description
  }

  // Method to return formatted details
  getDetails() {
    return `Name: ${this.name}\nType: ${this.type}\nDescription: ${this.description}`;
  }
}

// Lance:
const lance = new Item({
  name: "lance of Destiny",
  type: "Weapon",
  description: "A powerful lance with a legendary history."
});

// potion:
const potion = new Item({
  name: "Health Potion",
  type: "consumable",
  description: "A strange liquid that gives you 1 heart."
});

// helmet:
const diamondhelm = new Item({
  name: "Diamond Helm",
  type: "Wearable",
  description: "A strong helm made of diamond."
});

const diamondplate = new Item({
  name: "Diamond Chestplate",
  type: "Wearable",
  description: "A strong chestplate made of diamond."
});

const diamondleggings = new Item({
  name: "Diamond Leggings",
  type: "Wearable",
  description: "Strong leggings made of diamond."
});

const clownhat = new Item({
  name: "Clown Hat",
  type: "Wearable",
  description: "A funny hat."
});

const clownsuit = new Item({
  name: "Clown Suit",
  type: "Wearable",
  description: "What a Strange Suit."
});

const clownshoes = new Item({
  name: "Clown Shoes",
  type: "Wearable",
  description: "A fun way to go around."
});

const clownpants = new Item({
  name: " Clown Pants",
  type: "Wearable",
  description: "Strangely colored pants."
});

inventoryBox(lance.getDetails());
inventoryBox(potion.getDetails());
inventoryBox(diamondhelm.getDetails());
inventoryBox(diamondplate.getDetails());
inventoryBox(diamondleggings.getDetails());
inventoryBox(clownhat.getDetails());
inventoryBox(clownsuit.getDetails());
inventoryBox(clownshoes.getDetails());
inventoryBox(clownpants.getDetails());


