import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Form, { Control } from "react-bootstrap/Form";
import React, { Component, Fragment } from "react";
import {
  getGames,
  getPaginationProps,
  search,
  setAllGames,
  setPaginationOptions,
  sort
} from "../../utils/StorageService";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import GameTile from "./GameTile";
import Pages from "./Pages";
import Papa from "papaparse";
import Row from "react-bootstrap/Row";
import _ from "lodash";
import gamesCsv from "../../files/games.csv";

class GamesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      sortOrder: null,
      searchInput: ""
    };
  }

  componentDidMount() {
    Papa.parse(gamesCsv, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: results => {
        setAllGames(results.data);
        this.setState({
          games: getGames()
        });
      }
    });
  }

  setSearchInput = e => {
    const {
      target: { value: input }
    } = e;

    this.setState({ searchInput: input }, this.filter);
    setPaginationOptions();
  };

  setSortOrder = () => {
    let { sortOrder } = this.state;

    switch (sortOrder) {
      case "asc":
        sortOrder = "desc";
        break;
      case "desc":
        sortOrder = null;
        break;
      default:
        sortOrder = "asc";
        break;
    }

    this.setState({ sortOrder }, this.filter);
  };

  filter = () => {
    const { sortOrder, searchInput } = this.state;
    this.setState({
      games: sort(sortOrder, search(searchInput))
    });
  };

  setPage = selectedPage => {
    let paginationOptions = getPaginationProps();

    paginationOptions.page = selectedPage;
    setPaginationOptions(paginationOptions);
    this.filter();
  };

  render() {
    const { games, searchInput, sortOrder } = this.state;

    return (
      <Fragment>
        <Col md={12}>
          <div className="sort-section">
            <Button onClick={this.setSortOrder} disabled={games.length <= 0}>
              Sort By Year
              {sortOrder === null && <FaSort />}
              {sortOrder === "asc" && <FaSortUp />}
              {sortOrder === "desc" && <FaSortDown />}
            </Button>
            <Form
              inline
              className="pull-right"
              onSubmit={e => e.preventDefault()}
            >
              <Control
                type="text"
                value={searchInput}
                onChange={this.setSearchInput}
                placeholder="Search by name"
              />
            </Form>
          </div>
          {games.length <= 0 ? (
            <div className="no-games-indicator">No games found</div>
          ) : (
            <Fragment>
              <Row>
                {_.map(games, (game, index) => (
                  <Col md={12} lg={6} xl={4} key={index}>
                    <GameTile game={game} />
                  </Col>
                ))}
              </Row>
              <Pages options={getPaginationProps()} setPage={this.setPage} />
            </Fragment>
          )}
        </Col>
      </Fragment>
    );
  }
}

export default GamesList;
