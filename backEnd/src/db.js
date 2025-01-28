import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('exampleDatabase.sqlite');

// Execute SQL statements from strings.
db.exec(`
  CREATE TABLE IF NOT EXISTS bikes(
    bike_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(50),
    image TEXT,
    name TEXT,
    available BOOLEAN DEFAULT true,
    size VARCHAR(10)
  ) 
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS customers(
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(50) UNIQUE,
      password TEXT,
      is_admin BOOLEAN DEFAULT false
    ) 
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS rentals(
      confirmation_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INT,
      bike_id INT,
      date TEXT DEFAULT (DATETIME('now')),
      FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY(bike_id) REFERENCES bikes(bike_id)
    ) 
  `);

export default db