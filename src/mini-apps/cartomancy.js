/* Cartomancy code goes here */

const suits = {
    'Hearts': 'Represents love, emotions, relationships, and personal affairs.',
    'Diamonds': 'Represents material wealth, practicality, and matters of the physical world.',
    'Clubs': 'Represents intellect, knowledge, creativity, and work.',
    'Spades': 'Represents action, change, force, power, oppression, ambition, courage, and conflict.'
};

/** May need to clarify again */
const ranks = {
    '2': 'Represents balance, duality, partnerships, and harmony.',
    '3': 'Symbolizes creativity, growth, and expression.',
    '4': 'Signifies stability, structure, and foundation.',
    '5': 'Represents change, conflict, and uncertainty.',
    '6': 'Symbolizes harmony, balance, sincerity, love, and truth.',
    '7': 'Signifies spirituality, wisdom, and introspection.',
    '8': 'Represents power, movement, action, and change.',
    '9': 'Symbolizes completion, fulfillment, and attainment.',
    '10': 'Represents completion, endings, and new beginnings.',
    'Jack': 'Symbolizes youth, recklessness, and creativity.',
    'Queen': 'Represents nurturing, caring, and emotion.',
    'King': 'Signifies authority, power, and control.',
    'Ace': 'Symbolizes new beginnings, potential, and opportunity.'
};

const cards = [];

for (let suit in suits) {
    for (let rank in ranks) {
        const card = {name: `${rank} of ${suit}`, meaning: `${ranks[rank]} ${suits[suit]}`};
        cards.push(card);
    }
}

function drawCards() {
    for (let i = 1; i <= 3; i++) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        const cardDiv = document.getElementById(`card${i}`);
        cardDiv.innerHTML = `<h2>${card.name}</h2><p>${card.meaning}</p>`;
    }
}
