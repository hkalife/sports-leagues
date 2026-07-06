export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
};

export type Season = {
  idLeague: string;
  strSeason: string;
  strBadge?: string;
};
