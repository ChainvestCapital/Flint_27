import "./Token_Card.css";

function Token_Card(props) {
  return (
    <div className="App">
      <div id="Token_Card_Wrapper">
        <img src={props.img} id="Token_Card_IMG" alt="" />
        <h2 id="Token_Card_h2">{props.Title}</h2>

        <h4 id="Token_Card_h4">{props.Anzahl} Stück</h4>
      </div>
    </div>
  );
}

export default Token_Card;
