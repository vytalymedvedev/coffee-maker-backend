create TABLE CoffeeMachine(
  id SERIAL PRIMARY KEY,
  machine_size VARCHAR(255),
  drink_capacity INTEGER,
  amount INTEGER DEFAULT 0,
  UNIQUE(machine_size, drink_capacity)
);