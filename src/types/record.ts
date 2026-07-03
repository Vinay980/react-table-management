export interface RecordItem {
  id: number;
  track_id: string;
  track_name: string;
  track_artist: string;
  track_popularity: string;
  track_album_id: string;
  track_album_name: string;
  track_album_release_date: string;
  playlist_name: string;
  playlist_id: string;
  playlist_genre: string;
  playlist_subgenre: string;
  danceability: string;
  energy: string;
  key: string;
  loudness: string;
  mode: string;
  speechiness: string;
  acousticness: string;
  instrumentalness: string;
  liveness: string;
  valence: string;
  tempo: string;
  duration_ms: string;
}