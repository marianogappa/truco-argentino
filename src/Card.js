export default function Card({card, actions, handleAction}) {
  actions = actions || [];

  if (card.is_backwards) {
    return (
      <>
        <img className="card" id={`card-was-${card.number}-${card.suit}`} src={`${process.env.PUBLIC_URL}/img/reverso.png`} />
      </>
    );
  }
  if (card.number === null || card.suit === null) {
    return <div className="card" />;
  }
  if (card.is_hole) {
    return <div className="card" id={`card-was-${card.number}-${card.suit}`} />;
  }

  function mapCardNumberToChar(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number.toString();
    }
  }

  const src = `${process.env.PUBLIC_URL}/img/${mapCardNumberToChar(card.number)}-${card.suit}s.png`;

  let handleClick = () => {}

  const action = actions.find(action => action.name === "reveal_card" && action.card.number === card.number && action.card.suit === card.suit);
  if (action) {
    handleClick = () => handleAction(action);
  }
  const className = action ? "card canReveal" : "card";

  return (
    <>
      <img className={className} id={`card-${card.number}-${card.suit}`} src={src} onClick={handleClick} />
    </>
  );
}