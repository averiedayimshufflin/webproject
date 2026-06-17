CREATE TABLE IF NOT EXISTS makeup_looks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  occasion TEXT NOT NULL,
  time_to_complete TEXT NOT NULL,
  products TEXT[] NOT NULL,
  description TEXT NOT NULL,
  tip TEXT NOT NULL,
  image TEXT NOT NULL
);
