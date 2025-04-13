const client_id = 'U_tq_E7XDuGPZ4nJkktL2jO6z4_Cgkbwtbzw79R_57I';
const apiUrl = 'https://api.unsplash.com/search/photos';
const resultsContainer = document.getElementById('results');

function buildQueryParams(keyword) {
  const params = `client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;
  return params;
}

function displayImages(images) {
  resultsContainer.innerHTML = '';
  images.forEach((imgData) => {
    const div = document.createElement('div');
    div.className = 'image-container';
    const img = document.createElement('img');
    img.src = imgData.urls.thumb;
    img.alt = imgData.alt_description || 'Unsplash Image';
    div.appendChild(img);
    resultsContainer.appendChild(div);
  });
}
function searchWithXHR(keyword) {
    const xhr = new XMLHttpRequest();
    const params = buildQueryParams(keyword);
    xhr.open('GET', `${apiUrl}?${params}`);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        displayImages(response.results);
      } else {
        console.error('Error:', xhr.status);
      }
    };
    
    xhr.onerror = function() {
      console.error('Request error...');
    };
    
    xhr.send();
  }
  function searchWithFetch(keyword) {
    const params = buildQueryParams(keyword);
    fetch(`${apiUrl}?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayImages(data.results);
      })
      .catch(error => console.error('Fetch Error:', error));
  }
  async function searchWithAsyncAwait(keyword) {
    const params = buildQueryParams(keyword);
    try {
      const response = await fetch(`${apiUrl}?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayImages(data.results);
    } catch (error) {
      console.error('Async/Await Fetch Error:', error);
    }
  }
  document.getElementById('xhrBtn').addEventListener('click', () => {
    const keyword = document.getElementById('searchTerm').value;
    searchWithXHR(keyword);
  });
  
  document.getElementById('fetchBtn').addEventListener('click', () => {
    const keyword = document.getElementById('searchTerm').value;
    searchWithFetch(keyword);
  });
  
  document.getElementById('asyncBtn').addEventListener('click', () => {
    const keyword = document.getElementById('searchTerm').value;
    searchWithAsyncAwait(keyword);
  });
  
  document.getElementById('searchTerm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const keyword = e.target.value;
      searchWithAsyncAwait(keyword);
    }
  });
        