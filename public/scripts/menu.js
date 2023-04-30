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
// how to pass in section title correctly? current way is HACKY big oof
// still need to render the odds and ends - looseLeafTeas + flavors
function renderMenu(menus) {
  const { drinks, foodies } = menus;

  const renderedMenuSections = [];
  for (const section of [drinks, foodies]) {
    const title = section.hasOwnProperty("coffees") ? "drinks" : "foodies";
    renderedMenuSections.push(renderSection(section, title));
  }

  const main = document.querySelector(".main");

  renderedMenuSections.forEach((section) =>
    main.insertAdjacentElement("beforeend", section)
  );
}

// FIXME
// doing two things here - rendering section (big bite) and categories (smaller bites)
function renderSection(menu, title) {
  const section = document.createElement("section");
  section.classList.add("margin-auto");
  section.id = `${title}-menu`;

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

  categories.forEach((cat) => section.insertAdjacentElement("beforeend", cat));

  return section;
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
// FIXME need to map the display value to #href of the menu category
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
  const main = document.querySelector(".main");
  const message = document.createElement("h3");
  message.style.textAlign = "center";
  message.innerText = err;
  main.insertAdjacentElement("beforeend", message);
}
