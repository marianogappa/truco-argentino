import Card from './Card.js';

export default function Hand({ isBackwards, cards, actions, handleAction }) {
    cards = cards || [];
    return (
        <div className="hand">
        {[...Array(3)].map((_, i) => (
            i < cards.length ? (
                <Card isBackwards={isBackwards} card={cards[i]} actions={actions} handleAction={handleAction} />
            ) : (
                <Card card={{number: null, suit: null}} />
            )
        ))}
        </div>
    )
}