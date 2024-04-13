import { type Ref } from 'vue';
import { gql } from 'graphql-tag';

import { type SongLevelKind } from './misc';

export interface QueryReturn<T = any> {
  result: Ref<T | undefined>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;

  refetch(): void;
}

export const GET_SONGS = gql`
  query getSongs {
    songs {
      sid
      name
      composer
      version
    }
  }
`;

export const GET_CHAPTERS = gql`
  query getChapters {
    chapters {
      sid
      name
    }
  }
`;

export const GET_SONG = gql`
  query getSong($sid: String!) {
    song(sid: $sid) {
      id
      sid
      name
      composer
      levels {
        level
      }
    }
  }
`;

export interface GetSong {
  id: string;
  sid: string;
  name: string;
  composer: string;
  levels: {
    level: SongLevelKind;
  }[];
}

export const GET_CHAPTER = gql`
  query getChapter($sid: String!) {
    chapter(sid: $sid) {
      sid
      name
    }
  }
`;

export const GET_MY_RECORDS = gql`
  query getMyRecords($token: String!, $songId: Int!, $level: String!) {
    records(token: $token, limit: 100, order: "-time", songId: $songId, level: $level) {
      id
      score
      accuracy
      time
      song {
        id
      }
      user {
        id
      }
    }
  }
`;

export interface GetRecord {
  score: number;
  accuracy: number;
  time: string;
}

export const GET_HISTORY = gql`
  query getHistory($token: String!) {
    userHistories(token: $token, type: "new_rks", order: "time") {
      rks
      time
    }
  }
`;

export interface GetHistory {
  rks: number;
  time: string;
}
