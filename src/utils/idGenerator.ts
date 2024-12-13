export function generateRandomId() {
  let id = '';
  for (let i = 0; i < 15; i++) {
    id += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
  }
  return id;
}

