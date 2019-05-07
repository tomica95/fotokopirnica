$(document).ready(function() {

   // Check for click events on the navbar burger icon
   $(".navbar-burger").click(function() {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

});

  loadWelcomeText(); //POPULATE WELCOME TEXT
  loadSlider(); //POPULATE SLIDER
  populateCategories(); // POPULATE CATEGORIES
  loadFood(populateBreakfast); //POPULATE BREAKFAST MENU 
});  

// FUNCTION FOR LOADING WELCOME TEXT
function loadWelcomeText()
{
  $.ajax({
    url:"data/welcome.json",
    method: "GET",
    success: function(response)
    {
      $("#welcome-image").html("<img src="+response.image+">");
      $("#welcome-text").html(response.text);
    }
  })
}
// WELCOME TEXT END


// LOADING CATEGORIES FROM JSON
function populateCategories()
{
  $.ajax({
    url: "data/categories.json",
    method: "GET",
    success: function(categories)
    {
     

      let text = "";

      categories.forEach( c => {
        text+= ` 
        <div class="dish column">
                <a class="button btn-category" href="${c.href}.html" data-id="${c.id}">${c.name}</a>
                <img src="${c.image}" alt="${c.alt}">
            </div>
        `;
      })

      $("#categories").html(text);

      $(".btn-category").on('click', function(e)
      {
        // e.preventDefault();

        let category_id = $(this).data('id');

        toLocalStorage(category_id);
      })
    }
  })
}
// CATEGORIES END

//ADDING EVENT FOR CLICKING ON CATEGORY
function toLocalStorage(e)
{ 
  localStorage.setItem('category', e);
}


//EVENT END

// LOAD SLIDER IMAGES FROM JSON FILE
function loadSlider()
{
  $.ajax({
    url: 'data/slider.json',
    method: 'GET',
    success: function(response)
    {
      populateSlider(response);
    }
  })
}
// SLIDER LOAD END

// POPULATE SLIDER DIV
function populateSlider(images)
{
  let text = "";

  images.forEach(image => {
   text+=`<img src="${image.image}" alt="${image.alt}">`;
  })

  $("#slider").html(text);

  $("#slider").children(":first").addClass('show');

  slider(); //calling slider function
}
// SLIDER DIV END


//FUNCTION FOR WORKING SLIDER
function slider()
{
  let active = $("#slider .show");
  let next = active.next().length ? active.next() : active.parent().children(':first');
  active.removeClass("show");
  next.addClass('show');

  setTimeout(slider, 2000);
}





// POPULATE ENTERIER PICS
$.ajax({
  url: "data/enterier.json",
  method: "GET",
  success: function(images)
  {
    let text = "<div class='columns is-centered'>";

    images.forEach((image, index, images) => {
      
      if(index != 0 && index % 3 == 0)
      {
        text+=`
        </div>
          <div class="columns is-centered">
            <div class="column is-4">
			  <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
            </div>
        `;
      }
      else 
      {
        text+=`
          <div class="column is-4">
            <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
          </div>
        `;
      }
    })


    $("#enterier-images").html(text);
  }
})
// PICS END
//slike umetnicki
$.ajax({
  url: "data/umetnicke.json",
  method: "GET",
  success: function(images)
  {
    let text = "<div class='columns is-centered'>";

    images.forEach((image, index, images) => {
      
      if(index != 0 && index % 3 == 0)
      {
        text+=`
        </div>
          <div class="columns is-centered">
            <div class="column is-4">
			  <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
            </div>
        `;
      }
      else 
      {
        text+=`
          <div class="column is-4">
            <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
          </div>
        `;
      }
    })


    $("#umetnicke-slike").html(text);
  }
})

//end slike umetnicki
//slike fotokopiranje
$.ajax({
  url: "data/fotokopiranje.json",
  method: "GET",
  success: function(images)
  {
    let text = "<div class='columns is-centered'>";

    images.forEach((image, index, images) => {
      
      if(index != 0 && index % 3 == 0)
      {
        text+=`
        </div>
          <div class="columns is-centered">
            <div class="column is-4">
			  <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
            </div>
        `;
      }
      else 
      {
        text+=`
          <div class="column is-4">
            <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
          </div>
        `;
      }
    })


    $("#fotokopiranje").html(text);
  }
})
//end slike fotokopiranje
//slike skolski
$.ajax({
  url: "data/skolski.json",
  method: "GET",
  success: function(images)
  {
    let text = "<div class='columns is-centered'>";

    images.forEach((image, index, images) => {
      
      if(index != 0 && index % 3 == 0)
      {
        text+=`
        </div>
          <div class="columns is-centered">
            <div class="column is-4">
			  <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
            </div>
        `;
      }
      else 
      {
        text+=`
          <div class="column is-4">
            <a href='${image.src}' data-lightbox="kancelarijski" data-alt='${image.alt}'><img src='${image.src}' alt='${image.alt}'></a>
          </div>
        `;
      }
    })


    $("#skolski-pribor").html(text);
  }
})

//end slike skolski

// POPULATE FORM FIELDS CLASS

class Form {

  constructor() {
      this.populateTime();
      this.populatePeople();
      this.formatDate();
  }

  populatePeople() {
      let value = 2;
      let people = document.getElementById('people');
      if (people) {

          for (let i = 0; i < 22; i++) {
              let newOption = document.createElement('option');
              newOption.setAttribute('value', value);
              let optionText = document.createTextNode(`${value} people`);
              newOption.appendChild(optionText);
              people.appendChild(newOption);
              value++;
          }
      }

  }

  populateTime() {
      let time = document.getElementById('time');
      let value = 15;
      if (time) {
          for (let i = 0; i < 9; i++) {

              let newOption = document.createElement('option');
              newOption.setAttribute('value', `${value}:00`);
              let optionText = document.createTextNode(`${value}:00`);
              newOption.appendChild(optionText);
              time.appendChild(newOption);
              value++;
          }
      }

  }

  formatDate() {
      let dateControl = document.querySelector('input[type="date"]');

      if (dateControl) {
          let date = new Date();
          let year = date.getFullYear();
          let day = date.getUTCDate();
          let month = date.getMonth() + 1;

          if (day < 10) {
              day = `0${day}`;
          }
          if(month<10){
            month=`0${month}`
        } 


          dateControl.setAttribute('min', `${year}-${month}-${day}`);
          dateControl.value = `${year}-${month}-${day}`;
      }
  }
}

new Form();

// POPULATE FORM FIELDS END



// MAKING RESERVATION
class Reservation {

  constructor() {

      this.first = document.querySelector('#first');
      this.last = document.querySelector('#last');
      this.date = document.querySelector('#date');
      this.time = document.querySelector('#time');
      this.people = document.querySelector('#people');
      this.buttons = document.querySelector('#submit');

      this.regFirst = /^[A-Z][a-z]{2,}$/;
      this.regLast = /^[A-Z][a-z]{2,}$/;

      this._addListeners();

  }

  validation() {

      let errors = [];

      if(!this.regFirst.test(this.first.value)){
          errors.push(this.first.id);
          this.first.classList.add('error');
          this.first.classList.remove('data');
      } else {
          this.first.classList.remove('error');
          this.first.classList.add('data');
      }

      if(!this.regLast.test(this.last.value)){
          errors.push(this.last.id);
          this.last.classList.add('error');
          this.last.classList.remove('data');
      } else {
          this.last.classList.remove('error');
          this.last.classList.add('data');
      }

      let time = "";
      if (this.time.value != '0') {
          time = this.time.value;
          this.time.parentElement.classList.remove('is-danger');
          this.time.classList.add('data');
      } else {

          errors.push(this.time.id);
          this.time.parentElement.classList.add('is-danger');
          this.time.classList.remove('data');

      }

      let people = "";
      if (this.people.value != '0') {

          people = this.people.value;
          this.people.parentElement.classList.remove('is-danger');
          this.people.classList.add('data');

      } else {

          errors.push(this.people.id);
          this.people.parentElement.classList.add('is-danger');
          this.people.classList.remove('data');

      }

      let date = "";
      console.log(this.date.value);
      if (this.date.value != '') {

        date = this.date.value;
        this.date.classList.remove('error');
        this.date.classList.add('data');

      } else {

        errors.push(this.date.id);
        this.date.classList.add('error');
        this.date.classList.remove('data');

      }

      if (errors.length == 0) {
          this.createReservation();
      }

  }

  createReservation() {

      let divs = document.querySelectorAll('.order');

      if (divs.length > 0) {

          alert("Please confirm your reservation below or cancel it so you can make another one");

      } else {

          let newDiv = document.createElement('div');
          newDiv.setAttribute('class', 'order');

          let newSubmit = document.createElement('button');
          let newDelete = document.createElement('button');

          let cancel = document.createTextNode('Cancel');
          let proceed = document.createTextNode('Proceed');

          newDelete.setAttribute('class', 'for-delete');

          newDelete.appendChild(cancel);
          newSubmit.appendChild(proceed);

          let text = `<h3>${this.first.value} ${this.last.value}</h3>
        <p>${this.date.value}</p>
        <p>${this.people.value} people</p>
        <p>${this.time.value}</p>`;


          newDiv.innerHTML = text;
          newDiv.appendChild(newDelete);
          newDiv.appendChild(newSubmit);

          document.getElementById('orders').appendChild(newDiv);

          let forDelete = document.querySelectorAll('.for-delete');
          forDelete.forEach(element => {
              element.addEventListener('click', this.removeReservation);
          });
      }


  }

  removeReservation() {

      this.parentNode.remove();
  }


  _addListeners() {

      if (this.buttons) {

          this.buttons.addEventListener('click', this.validation.bind(this));
      }

  }

}

new Reservation();

// MAKING RESERVATION END