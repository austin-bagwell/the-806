const main = document.querySelector(".main");

// async function getMenu(menu) {
//   try {
//     const response = await fetch(`/${menu}`);
//     const data = await response.json();
//     // this might be bad? not sure
//     return Promise.resolve(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// TODO
// this should be my actual fetch()
async function getMenu() {
  try {
    const response = await fetch("/api/menu/");
    const data = await response.json();
    console.log("getting full menu...");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

getMenu("drinks").then((data) =>
  main.insertAdjacentElement("beforeend", renderMenuSectionSkeleton(data))
);

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
