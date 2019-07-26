import _ from "lodash";

const paginate = games => {
  const paginationProps = getPaginationProps();
  const start = (paginationProps.page - 1) * paginationProps.perPage;

  return games.splice(start, paginationProps.perPage);
};

export const getGames = (all = false) => {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  if (!all) {
    games = paginate(games);
  }
  return games;
};

export const setAllGames = games => {
  localStorage.setItem("games", JSON.stringify(games));
  setPaginationOptions(createPaginationProps(games));
};

export const setPaginationOptions = paginationProps => {
  if (_.isEmpty(paginationProps)) {
    paginationProps = {
      page: 1,
      perPage: 30,
      totalPages: 0
    };
  }

  localStorage.setItem("paginationProps", JSON.stringify(paginationProps));
};

export const getPaginationProps = () => {
  return JSON.parse(localStorage.getItem("paginationProps"));
};

const createPaginationProps = games => {
  const paginationProps = getPaginationProps();

  paginationProps.totalPages = _.ceil(games.length / paginationProps.perPage);

  return paginationProps;
};

export const clear = () => {
  localStorage.removeItem("games");
  localStorage.removeItem("paginationProps");
};

export const search = name => {
  let games = getGames(true);
  if (!_.isEmpty(games) && name !== "") {
    name = _.toLower(name);
    games = _.filter(games, game => {
      return _.toLower(game.Name).indexOf(name) >= 0;
    });
  }

  setPaginationOptions(createPaginationProps(games));

  return games;
};

export const sort = (sortOrder, games) => {
  games = sortOrder === null ? games : _.orderBy(games, "Year", sortOrder);
  return paginate(games);
};
