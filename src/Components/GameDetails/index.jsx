import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import { FaMedal } from "react-icons/fa";
import _ from "lodash";
import { getGames } from "../../utils/StorageService";
import { withRouter } from "react-router-dom";

class GameDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { game: {} };
  }

  componentDidMount() {
    const {
      history,
      match: { params }
    } = this.props;

    let games = getGames({ page: 1, perPage: 30 });
    const game = _.find(games, { Rank: params.gameRank });

    _.isEmpty(game) ? history.push("/") : this.setState({ game });
  }

  render() {
    const { game } = this.state;

    return (
      <Card className="game-card">
        <Card.Header as="h5" className="text-center">
          {game.Name}
        </Card.Header>
        <Card.Body>
          <Card.Title>Publisher: {game.Publisher}</Card.Title>
          <Card.Text className={"rank" + game.Rank}>
            Rank: {game.Rank <= 3 && game.Rank > 0 && <FaMedal />}
            {game.Rank}
          </Card.Text>
          <Card.Text>Platform: {game.Platform}</Card.Text>
          <Card.Text>Genre: {game.Genre}</Card.Text>
          <Card.Text>Released: {game.Year}</Card.Text>
          <Card.Text>Global Sales: {game.Global_Sales} M</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(GameDetails);
