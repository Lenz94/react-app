export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: string | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Table {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: string;
  type: string;
  group: null | string;
  table: Table[];
}

export interface ScoreAmount {
  home: number;
  away: number;
}

export interface Score {
  winner: string | null;
  duration: string;
  halfTime: ScoreAmount;
  fullTime: ScoreAmount;
}

export interface Match {
  id: number;
  area: Area;
  competition: Competition;
  season: Season;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string | null;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

export interface League {
  id: number;
  name: string;
  area: Area;
  code: string;
  type: string;
  emblem: string;
  currentSeason: Season;
}
