import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";
import Row from "react-bootstrap/Row";

const GameTile = props => {
  const {
    game: { Rank: rank, Name: name, Platform: platform }
  } = props;

  return (
    <Link to={`/games/${rank}`} className="game-link">
      <Card className="game-tile">
        <Card.Body as={Row}>
          <Col xs={2}>
            <h5 className="game-platform">
              <Badge data-tip={platform.length > 4 ? platform : ""}>
                {platform}
              </Badge>
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </h5>
          </Col>
          <Col xs={10}>
            <h4>{name}</h4>
          </Col>
        </Card.Body>
      </Card>
    </Link>
  );
};

GameTile.propTypes = {
  game: PropTypes.shape({
    Rank: PropTypes.string,
    Name: PropTypes.string,
    Platform: PropTypes.string
  })
};

export default GameTile;
