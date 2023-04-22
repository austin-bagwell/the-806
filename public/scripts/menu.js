const test = document.querySelector("#test");
test.textContent = `teeeest`;

async function getDrinkMenu() {
  const response = await fetch("/drinks");
  const menu = await response.json();
  console.log(menu);
}

try {
  getDrinkMenu();
} catch (err) {
  console.log(err);
}
