export const generateRandomName = () => {
  const user = "user";
  const random = Math.floor(Math.random() * 10000);

  return `${user}-${random}`;
}