// load data function
const loadData = () => {
  //set var and get value seach text input
  const searchText = document.getElementById("searchText");
  const searchTextValue = searchText.value;
  //set var show-result-sectiion and total search-result
  const totalSearchResult = document.getElementById("total-search-result");
  const showResultSection = document.getElementById("show-result-section");

  //when give empty value
  if (searchTextValue === "") {
    alert("please give me input text");
    errorMessage("please give a value");
    totalSearchResult.innerText = "";
    showResultSection.textContent = "";
  }
  //sucess
  else {
    //api url  set
    const url = `https://openlibrary.org/search.json?q=${searchTextValue}`;
    //api call
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data));
    //clear value
    searchText.value = "";
  }
};
// display data function
const displayData = (details) => {
  const totalSearchResult = document.getElementById("total-search-result");
  const showResultSection = document.getElementById("show-result-section");
  //set value total search result
  totalSearchResult.innerText = `total results ${details.numFound} found`;
  //clear text content
  showResultSection.textContent = "";

  //when find a vlaue
  if (details.numFound !== 0) {
    errorMessage("");
    const docs = details.docs;
    //slice first 20
    const first20 = docs.slice(0, 20);
    //for each method
    first20.forEach((data) => {
      //create div
      const div = document.createElement("div");
      //div class list add and set inner html
      div.classList.add("col", "shadow-lg");

      div.innerHTML = `
        <div class="card h-100 p-3">
        <img
          height="210"
          src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" 
          alt="..."
         >
            <div class="card-body">
              <h5 class="card-title">Name : ${data.title}</h5>
              <p class="card-text">Author  Name : 
                ${data.author_name ? data.author_name[0] : " "}
              </p>
               <p class="card-text">first Publishe Year : 
                ${data.first_publish_year}
               </p>
               <p class="card-text">Publisher  : 
                ${data.publisher ? data.publisher : " "}
               </p>
            </div>
      </div>
      `;
      //append child
      showResultSection.appendChild(div);
    });
  }
  //error
  else {
    errorMessage("please give me right information");
  }
};

//not found message function
const errorMessage = (text) => {
  const message = document.getElementById("not-found-message");
  message.innerText = text;
};
