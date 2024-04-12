

document.addEventListener("DOMContentLoaded", function() {

   const countryAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/travel/countries.php';
   const photoAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/travel/images.php';
   const imageURL = 'https://www.randyconnolly.com/funwebdev/3rd/images/travel/square150/';

   const loader1 = document.getElementById("loader1");
   const loader2 = document.getElementById("loader2");
   const main = document.querySelector("main");
   const countries = document.getElementById("countries");
   const button = document.getElementById("fetchButton");

   // first hide loaders and main element 
   loader1.style.display = "none";
   loader2.style.display  = "none";
   main.style.display = "none";

   // then handle button click 
   /* -------------------------------------------------------------
      When button is clicked, fetch data and populate select element 
   */
   button.onclick = () => {
      loader1.style.display = "inline-block";
      fetch(countryAPI)
            .then((response) => response.json())
            .then((data) => {
               data.forEach(c => {
                  const opt = document.createElement("option");
                  opt.setAttribute( "value" , c.iso );
                  opt.textContent = c.name;
                  countries.appendChild(opt);
               });
               loader1.style.display = "none";
               main.style.display = "block";
            })
            .catch((error) => console.log('Error:', error));
   }

   /* -------------------------------------------------------------
      When user selects, fetch data and display images
   */
      countries.addEventListener('change', (event) => {
         loader2.style.display = "inline-block";
         const selectedCountryISO = event.target.value;
         const selectedCountryURL = `${photoAPI}?iso=${selectedCountryISO}`;
         
         fetch(selectedCountryURL)
            .then(response => response.json())
            .then(data => {
               results.innerHTML = ''; // Clear previous results
               data.forEach(image => {
                  const img = document.createElement('img');
                  img.src = `${imageURL}${image.filename}`;
                  img.alt = image.title;
                  results.appendChild(img);
               });
               loader2.style.display = "none";
            })
            .catch(error => console.log('Error:', error));
      });


});