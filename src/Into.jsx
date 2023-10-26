const Intro = (props) => {

  return (
    <div className="intro">
      <form onSubmit={props.clickHandler}>
        <input id="playerOne" type="text" placeholder="PlayerOne" />
        <br />
        <input id="playerTwo" type="text" placeholder="PlayerTwo" />
        <br />
        <button type="submit">Play</button>
      </form>
    </div>
  );
};

export default Intro;
