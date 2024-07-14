export default function Card({isBackwards, card, actions, handleAction}) {
  actions = actions || [];

  if (isBackwards) {
    return (
      <>
        <img className="card" src={`${process.env.PUBLIC_URL}/img/reverso.png`} />
      </>
    );
  }
  if (card.number === null || card.suit === null) {
    return <span className="card" />;
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
      <img className={className} src={src} onClick={handleClick} />
    </>
  );
}