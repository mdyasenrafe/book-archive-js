const loadData = () => {
  //set var and get value seach text input
  const searchText = document.getElementById("searchText");
  const searchTextValue = searchText.value;
  const showResultSection = document.getElementById("show-result-section");
  //when give empty value show alert
  if (searchTextValue === "") {
    alert("please give input text");
    showResultSection.innerText = "";
    notFoundMessage("");
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

const displayData = (details) => {
  const totalValue = document.getElementById("total-value");
  const showResultSection = document.getElementById("show-result-section");
  //set value total search result
  totalValue.innerText = `About ${details.numFound} results`;
  //clear text content
  showResultSection.textContent = "";

  //when find a vlaue
  if (details.numFound !== 0) {
    const docs = details.docs;
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
              <h5 class="card-title">book Name : ${data.title}</h5>
              <p class="card-text">Author  Name : 
                ${data.author_name ? data.author_name[0] : " "}
              </p>
               <p class="card-text">first Publishe Year : 
                ${data.first_publish_year}
               </p>
               <p class="card-text">Publisher  : 
                ${data.publisher ? data.publisher : "no found publish"}
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
    notFoundMessage("please give me right information");
  }
};

const notFoundMessage = (text) => {
  const notFound = document.getElementById("not-found-message");
  notFound.innerText = text;
};
