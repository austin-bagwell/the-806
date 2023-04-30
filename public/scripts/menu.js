const main = document.querySelector(".main");
const mainMenu = document.querySelector("#main-menu");
const subMenu = document.querySelector("#sub-menu");

const menuCategoryClassList = `margin-auto`;

const drinkSectionTitles = [
  "Coffees",
  "Espresso",
  "Evolutions",
  "Teas + Chais",
  "Etcetera",
];

const foodieSectionTitle = [
  "Pizzas",
  "Vegan",
  "Mexi",
  "Sandwiches",
  "Breakfasty",
];

subMenu.insertAdjacentHTML("beforeend", renderSubMenu(drinkSectionTitles));
subMenu.addEventListener("click", (e) => {
  dynamicallyStyleSubMenu(e);
});

mainMenu.addEventListener("click", (e) => {
  const mainMenuLinks = document.querySelectorAll(".main-menu-link");
  const targetName = e.target.innerText;

  mainMenuLinks.forEach((title) => title.classList.remove("underline"));
  e.target.classList.add("underline");

  subMenu.innerHTML = "";
  targetName === "drinks"
    ? subMenu.insertAdjacentHTML("beforeend", renderSubMenu(drinkSectionTitles))
    : subMenu.insertAdjacentHTML(
        "beforeend",
        renderSubMenu(foodieSectionTitle)
      );
});

getMenu()
  .then((data) => renderMenu(data))
  .catch((err) => console.log(err));

async function getMenu() {
  try {
    const response = await fetch("/api/menu/");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("something went wrong. Try refreshing the page?");
    }
  } catch (err) {
    handleError(err);
  }
}

// FIXME
// each menu section (drinks, foodies) needs a section parent element
// within section parent are articles consisting of menu item categories/list of items
// rough draft below, only renders drinks and does it sloppily
// but the DOM structure is correct
function renderMenu(menus) {
  const { drinks, foodies } = menus;

  const sections = [];

  const drinksSection = document.createElement("section");
  const foodiesSection = document.createElement("section");

  drinksSection.classList.add("margin-auto;");
  drinksSection.id = "drinks-menu";
  foodiesSection.classList.add("margin-auto;");

  const renderedDrinks = renderSection(drinks);
  renderedDrinks.forEach((category) =>
    drinksSection.insertAdjacentElement("beforeend", category)
  );
  console.log("testing drinksSection:");
  console.log(drinksSection);

  // for (let menu of [drinks, foodies]) {
  //   sections.push(renderSection(menu));
  // }

  const main = document.querySelector(".main");
  main.insertAdjacentElement("beforeend", drinksSection);
  // sections.forEach((section) => {
  //   section.map((category) => {
  //     main.insertAdjacentElement("beforeend", category);
  //   });
  // });
}

function renderSection(menu) {
  const categories = [];
  for (let category of Object.keys(menu)) {
    const categoryItems = menu[category];
    const menuCategory = document.createElement("article");
    menuCategory.classList.add(menuCategoryClassList);

    const categoryTitle = document.createElement("h2");
    categoryTitle.innerText = category;

    menuCategory.id = `${category}-section`;
    menuCategory.insertAdjacentElement("beforeend", categoryTitle);
    menuCategory.insertAdjacentElement(
      "beforeend",
      renderItemsList(categoryItems)
    );
    categories.push(menuCategory);
  }

  return categories;
}

function renderItemsList(list) {
  const itemsList = document.createElement("ul");

  for (const item of list) {
    itemsList.insertAdjacentHTML("beforeend", renderMenuItem(item));
  }

  return itemsList;
}

function renderMenuItem(menuItem) {
  const { name, description } = menuItem;
  const html = `<li class="no-bullets">
        <span class="font-bold-md">${name}... </span>
        <span>${description}</span>
        </li>`.trim();
  return html;
}

// MENU-SPECIFIC NAV
function renderSubMenu(menu) {
  const style = `class="pr-1rem sub-menu-link"`;
  return menu
    .map((item) => `<li ${style} ><a class="sub-menu-link">${item}</a></li>`)
    .join("");
}

function dynamicallyStyleSubMenu(e) {
  const links = document.querySelectorAll(".sub-menu-link");
  if (e.target.nodeName === "LI" || e.target.nodeName === "A") {
    links.forEach((link) => link.classList.remove("sub-menu-link-active"));
    e.target.classList.add("sub-menu-link-active");
  }
}

// may need multiple error handlers? not totally sure
function handleError(err) {
  const message = document.createElement("h3");
  message.style.textAlign = "center";
  message.innerText = err;
  main.insertAdjacentElement("beforeend", message);
}
