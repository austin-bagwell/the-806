const test = document.querySelector("#test");
const promiseTest = document.querySelector("#promise-test");
test.textContent = `teeeest`;

async function getMenu(menu) {
  try {
    const response = await fetch(`/${menu}`);
    const data = await response.json();
    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
  }
}

getMenu("drinks").then(
  (data) => (promiseTest.innerText = renderCoffeeNames(data))
);

function renderCoffeeNames(data) {
  const names = [];
  const coffees = data.category.coffees;
  coffees.forEach((coffee) => names.push(coffee.name));
  return names.join("\n");
}
