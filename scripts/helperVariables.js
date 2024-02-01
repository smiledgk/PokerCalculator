export const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
export const pokerCombinations = [
  { name: "High Card", strength: 0 },
  { name: "One Pair", strength: 1 },
  { name: "Two Pair", strength: 2 },
  { name: "Three Of A Kind", strength: 3 },
  { name: "Straight", strength: 4 },
  { name: "Flush", strength: 5 },
  { name: "Full House", strength: 6 },
  { name: "Quads", strength: 7 },
  { name: "Straight Flush", strength: 8 },
  { name: "Royal Flush", strength: 9 }
];

export const rankValues = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
}

export const randomNumbers = (length) => {
  return Math.floor(Math.random() * length)
}

