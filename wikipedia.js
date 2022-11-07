async function handleSubmit(event) {
  event.preventDefault();
  const inputValue = document.querySelector('.js-search-input').value;
  const searchQuery = inputValue.trim();

  try {
    const results = await searchWikipedia(searchQuery);
    displayResults(results);
    //return;
  } catch (err) {
    console.log(err);
    alert('Failed to search wikipedia');
  }
}

async function searchWikipedia(searchQuery) {
  const endpoint = `https://pt.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

function displayResults(results) {
  const searchResults = document.querySelector('.js-search-results');
  document.getElementById("Divresposta").innerHTML=results.query.search[0].snippet;
  document.getElementById("Divresposta").innerHTML+=results.query.search[1].snippet;


  results.query.search.forEach(result => {
    const url = `https://pt.wikipedia.org/?curid=${result.pageid}`;
      //console.error(result.snippet);
     
  });
}

const form = document.querySelector('.js-search-form');
form.addEventListener('submit', handleSubmit);