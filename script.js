const search = document.querySelector("input");
const form = document.querySelector("form");
const searchResult = document.querySelector(".results");
const errorMsg = document.querySelector(".alert");
const line = document.querySelector("hr");
const apiURL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   let searchValue = search.value.replace(/\s+/g, "");
  let searchValue = search.value;
  //   alert(searchValue);
  if (searchValue === "") {
    // errorMsg.style.display = "block";
    errorMessage("Search cannot be empty.Please enter a search term.");
  } else {
    getResult(searchValue);
  }
});

async function getResult(searchVal) {
  const response = await fetch(apiURL + searchVal);
  const results = await response.json();

  console.log(results);
  if (results.query.search.length == 0) {
    return errorMessage("Invalid search, please enter another search term.");
  } else {
    displayData(results);
  }
}

// error Message
function errorMessage(msg) {
  errorMsg.style.display = "block";
  line.style.display = "block";

  errorMsg.textContent = msg;
}

// Display Data
function displayData(results) {
  line.style.display = "block";
  let output = "";
  results.query.search.forEach((result) => {
    let resultURL = `https://en.wikipedia.org/?curid=${result.pageid}`;
    output += `
        <div class="result p-1">
        <a href="${resultURL}" target="_blank" class="h3 fw-bold"
          >${result.title}</a
        ><br />
        <a href="${resultURL}" target="_blank" class="fs-5 text-success"
          >${resultURL}</a
        >
        <p class="fs-5">${result.snippet}</p>
      </div>
        `;
    searchResult.innerHTML = output;
  });
}
