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
  .then((data) =>
    main.insertAdjacentElement("beforeend", renderMenuSectionSkeleton(data))
  )
  .catch((err) => handleError(err));

// TODO
// use document API instead of template literals... at least I think that's smart?
// FIXME
// onlyl pulling drinks at the moment
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

// TODO
// how to render through all categories in the JSON?
// is that even what I want to do?
// will need different layout for the flavors and the loose leaf teas
function renderMenuSectionSkeleton(menu) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  const list = document.createElement("ul");

  const categories = menu.categories;
  // console.log(categories);
  const category = "coffees";

  heading.innerText = "Coffees";
  const menuItems = renderCategoryListItems(menu, category);
  list.insertAdjacentHTML("beforeend", menuItems);

  section.insertAdjacentElement("beforeend", heading);
  section.insertAdjacentElement("beforeend", list);

  return section;
}

/* TODO
  Need to get a function that renders all this, for each category present in the menu JSON
  
  <section>
    <h2 class="section-heading">Coffees</h2>
    <ul id="name of the category here ie coffees/espressos/etc">
      <li> all the list items here </li>
    </ul>
  </section>



*/

// may need multiple error handlers? not totally sure
function handleError(err) {
  const p = document.createElement("p");
  p.innerText = err;
  main.insertAdjacentElement("beforeend", p);
}
