const main = document.querySelector(".main");

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

getMenu()
  .then((data) => renderMenu(data))
  .catch((err) => handleError(err));

// TODO all of this
function renderMenu(menuData) {
  // console.log(`full menu data:`);
  // console.log(menuData);
  const menuSections = Object.keys(menuData);

  const sectionElements = [];
  for (let section of menuSections) {
    // TODO abstract this to another function
    // everything above renderSection() is just there to make it look
    // slightly less bad while I sort out actual rendering
    const sectionElement = document.createElement("section");
    sectionElement.id = `${section}`;
    sectionElement.innerText = section;
    sectionElements.push(sectionElement);
    const menuSection = menuData[section];
    // FIXME
    renderSection(menuSection);
  }
  const main = document.querySelector(".main");
  sectionElements.forEach((section) =>
    main.insertAdjacentElement("beforeend", section)
  );
}
// FIXME
/**
 *
 * @param {object} section
 * takes a section of the menu in the form of an object where
 * each object property stores an array of menu item objects
 *
 * drinks: {
 *   coffees: [
 *     {name: coffee, description: necessary},
 *      etc...
 *   ]
 * }
 */
function renderSection(section) {
  // console.log("here's what got passed in as section:");
  // console.log(section);
  for (let category of Object.keys(section)) {
    const itemArr = section[category];
    renderList(itemArr);
  }
}

function renderList(arr) {
  console.log("renderList array:");
  console.log(arr);
  // add handling here -
  // if the thing passed in is an array of objects {name: str, desription: str}
  // then put those into a niceley formated UL w/ 'name' in bold or whatever
  // else if it's just a plain old array [vanilla, caramel, etc]
  // then put it into a plain UL, no bold
}

// TODO
// use document API instead of template literals... at least I think that's smart?
// FIXME
// only pulling drinks at the moment
function renderCategoryListItems(menu, category) {
  const items = menu.drinks.categories[`${category}`];
  const html = items.map((item) => {
    return `<li class="no-bullets">
        <span class="font-bold-md">${item.name}... </span>
        <span>${item.description}</span>
        </li>`;
  });
  return html.join("");
}

// may need multiple error handlers? not totally sure
function handleError(err) {
  const p = document.createElement("p");
  p.innerText = err;
  main.insertAdjacentElement("beforeend", p);
}
