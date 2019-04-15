$(document).ready(function()
{

  getFood();
  populateCategories();


  if (localStorage.sort)
  {
    $("#sort").val(localStorage.sort);
  }
  else $("#sort").val('name-asc');

  $("#sort").on('change', function()
  {
      localStorage.setItem('sort', $(this).val());
      getFood();
  })


})

  function getFood()
  {

    $.ajax({
      url: "data/food.json",
      method: "GET",
      success: function(food)
      {
        populateFood(food); 
      }
    });
  }
  

  function populateFood(response)
  {
      
      let category_filter ;

      if (!localStorage.getItem('category'))
      {
        localStorage.setItem('category', '1');
      }

      category_filter = localStorage.category;
      


      let food = response.filter( e => e.category_id == category_filter);
      
      let text = "";

      checkForSortType(food);
      
      food.forEach(f => {
        text+= singleDish(f);
      })

      $("#food").html(text);

  }

  function populateCategories()
  {
    $.ajax({
      url: "data/categories.json",
      method: "GET",
      success: function(categories)
      {
        let text="";
        categories.forEach(c => {
          if(localStorage.category == c.id)
          {
            text+=`
          <p>
            <input type="radio" id="test-${c.id}" value="${c.id}" class="container-radio" name="radios" checked>
            <label for="test-${c.id}">${c.name}</label>
          </p>`;
          }
          else
          {
            text+=`
            <p>
              <input type="radio" id="test-${c.id}" value="${c.id}" class="container-radio" name="radios">
              <label for="test-${c.id}">${c.name}</label>
            </p>
            `;
          }
         
        })

        $(".categories").html(text);

        $(".container-radio").on('click', function()
        {
         
          localStorage.setItem('category', $(this).val());
          getFood();

        })
      }
    });
  }

 

function nameSortAsc(a, b)
{
  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function nameSortDesc(a, b)
{
  let nameA = a.name.toUpperCase(); // ignore upper and lowercase
  let nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }

  // names must be equal
  return 0;
}

function priceSortAsc(a, b)
{
  if (a.price > b.price)
  {
    return 1;
  }
  if (a.price < b.price)
  {
    return -1;
  }

  return 0;
}

function priceSortDesc(a, b)
{
  return a.price - b.price;
}

function checkForSortType(f)
{
  let sort_type;

  if (!localStorage.getItem('sort'))
  {
    localStorage.setItem('sort', 'name-asc');
  }

  sort_type = localStorage.getItem('sort')
  
  switch(sort_type)
  {
    case "name-asc":
      f.sort(nameSortAsc);
      break;
    case "name-desc":
      f.sort(nameSortDesc);
      break;
    case "price-asc":
      // f.sort(priceSortAsc);
      f.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      f.sort((a, b) => b.price - a.price);
      break;
  }
  
}

function singleDish(food)
{
  return `
    <p class="title is-3 has-text-grey-darker">${food.name}</p>
    <p class="subtitle is-5 has-text-grey">${food.price}</p>
    <hr>
  `;
}