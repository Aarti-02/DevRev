
  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }
  
  function fadeOut(){
    setInterval(loader, 5000);
  }
  
  window.onload = fadeOut();
  $(document).ready(function() {
    const API_URL = 'https://openlibrary.org/search.json';
  
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');
    const results = document.getElementById('results');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
  
    let currentPage = 1;
    let totalResults = 0;
    let totalPages = 0;
    let currentQuery = '';
  
    function displaySuggestions(data) {
      suggestions.innerHTML = '';
  
      if (data.numFound > 0) {
        const suggestionsList = document.createElement('ul');
  
        data.docs.slice(0, 7).forEach(item => {
          const suggestionItem = document.createElement('li');
          suggestionItem.textContent = `${item.title} - ${item.author_name ? item.author_name.join(', ') : 'Unknown'}`;
          suggestionItem.addEventListener('click', () => {
            searchInput.value = suggestionItem.textContent;
            suggestions.innerHTML = '';
            searchBooks();
          });
  
          suggestionsList.appendChild(suggestionItem);
        });
  
        suggestions.appendChild(suggestionsList);
      } else {
        suggestions.innerHTML = '<p>No suggestions found.</p>';
      }
    }
  
    function displayResults(data) {
      suggestions.innerHTML = ''; // Close suggestions when viewing results
      results.innerHTML = '';
  
      data.docs.forEach(book => {
        const listItem = document.createElement('li');
        const title = document.createElement('h3');
        title.textContent = book.title;
        const authors = document.createElement('p');
        authors.textContent = `Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
        const genres = document.createElement('p');
        genres.textContent = `Genre(s): ${book.subject ? book.subject.join(', ') : 'N/A'}`;
        const cover = document.createElement('img');
        cover.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  
        const availability = document.createElement('p');
        availability.textContent = `Availability: ${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`;
        const publishedYear = document.createElement('p');
        publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;
  
        listItem.appendChild(cover);
        listItem.appendChild(title);
        listItem.appendChild(authors);
        listItem.appendChild(genres);
        listItem.appendChild(availability);
        listItem.appendChild(publishedYear);
  
        results.appendChild(listItem);
      });
  
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
    }
  
    function searchBooks() {
      const query = searchInput.value.trim();
  
      if (query === '') {
        suggestions.innerHTML = '';
        results.innerHTML = '';
        return;
      }
  
      if (query === currentQuery) {
        return;
      }
  
      currentQuery = query;
  
      const params = {
        q: query,
        page: currentPage,
        limit: 10,
      };
  
      $.ajax({
        url: API_URL,
        data: params,
        dataType: 'json',
        success: function(data) {
          totalResults = data.numFound;
          totalPages = Math.ceil(totalResults / 10);
  
          displayResults(data);
        },
        error: function(error) {
          console.log('Error fetching book data:', error);
        }
      });
    }
  
    function goToPage(page) {
      if (page < 1 || page > totalPages) {
        return;
      }
      
      currentPage = page;
      searchBooks();
      }
      
      searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      
      if (query === '') {
      suggestions.innerHTML = '';
      return;
      }
      
      const params = {
      q: query,
      limit: 7,
      };
      
      $.ajax({
      url: API_URL,
      data: params,
      dataType: 'json',
      success: function(data) {
      displaySuggestions(data);
      },
      error: function(error) {
      console.log('Error fetching suggestions:', error);
      }
      });
      });
      
      searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
      e.preventDefault();
      searchBooks();
      }
      });
      
      prevButton.addEventListener('click', function() {
      goToPage(currentPage - 1);
      });
      
      nextButton.addEventListener('click', function() {
      goToPage(currentPage + 1);
      });
      });
  
  
  

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}
fetch('https://openlibrary.org/subjects/fiction.json')
  .then(response => response.json())
  .then(data => {
    const booksList = document.getElementById('FICTION');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart');

    let cartItems = [];

    data.works.slice(0, 5).forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'book';

      const bookImage = document.createElement('img');
      bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: Fiction`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${book.rating ? book.rating.average.toFixed(2) : 'N/A'}`;

      const availability = document.createElement('p');
      availability.textContent = `Availability: ${padDigits(Math.floor(Math.random() * 100), 2)}`;

      const publishedYear = document.createElement('p');
      publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.className = 'add-button';
      addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'lightblue';
      });
      addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'blue';
      });
      addButton.addEventListener('click', () => {
        const cartItem = {
          id: book.cover_id,
          title: book.title,
          author: book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown',
          genre: 'Fiction'
        };

        cartItems.push(cartItem);
        updateCartItemCount();
        displayCartItems();
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(genre);
      bookDetails.appendChild(rating);
      bookDetails.appendChild(availability);
      bookDetails.appendChild(publishedYear);
      bookDetails.appendChild(addButton);

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookDetails);

      booksList.appendChild(bookItem);
    });

    function updateCartItemCount() {
      cartItemCount.textContent = cartItems.length;
    }

    function displayCartItems() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartTitle = document.createElement('p');
        cartTitle.textContent = `Title: ${item.title}`;

        const cartAuthor = document.createElement('p');
        cartAuthor.textContent = `Author: ${item.author}`;

        const cartGenre = document.createElement('p');
        cartGenre.textContent = `Genre: ${item.genre}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Cart';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
          removeCartItem(item.id);
        });

        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartAuthor);
        cartItem.appendChild(cartGenre);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
      });
    }

    function removeCartItem(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartItemCount();
      displayCartItems();
    }

    cartIcon.addEventListener('click', () => {
      cartContainer.classList.toggle('show-cart');
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}


fetch('https://openlibrary.org/subjects/science.json')
  .then(response => response.json())
  .then(data => {
    const booksList = document.getElementById('SCIENCE');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart');

    let cartItems = [];

    data.works.slice(0, 5).forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'book';

      const bookImage = document.createElement('img');
      bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: Science`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${book.rating ? book.rating.average.toFixed(2) : 'N/A'}`;

      const availability = document.createElement('p');
      availability.textContent = `Availability: ${padDigits(Math.floor(Math.random() * 100), 2)}`;

      const publishedYear = document.createElement('p');
      publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.className = 'add-button';
      addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'lightblue';
      });
      addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'blue';
      });
      addButton.addEventListener('click', () => {
        const cartItem = {
          id: book.cover_id,
          title: book.title,
          author: book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown',
          genre: 'Science'
        };

        cartItems.push(cartItem);
        updateCartItemCount();
        displayCartItems();
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(genre);
      bookDetails.appendChild(rating);
      bookDetails.appendChild(availability);
      bookDetails.appendChild(publishedYear);
      bookDetails.appendChild(addButton);

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookDetails);

      booksList.appendChild(bookItem);
    });

    function updateCartItemCount() {
      cartItemCount.textContent = cartItems.length;
    }

    function displayCartItems() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartTitle = document.createElement('p');
        cartTitle.textContent = `Title: ${item.title}`;

        const cartAuthor = document.createElement('p');
        cartAuthor.textContent = `Author: ${item.author}`;

        const cartGenre = document.createElement('p');
        cartGenre.textContent = `Genre: ${item.genre}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Cart';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
          removeCartItem(item.id);
        });

        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartAuthor);
        cartItem.appendChild(cartGenre);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
      });
    }

    function removeCartItem(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartItemCount();
      displayCartItems();
    }

    cartIcon.addEventListener('click', () => {
      cartContainer.classList.toggle('show-cart');
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}



fetch('https://openlibrary.org/subjects/maths.json')
  .then(response => response.json())
  .then(data => {
    const booksList = document.getElementById('MATHS');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart');

    let cartItems = [];

    data.works.slice(0, 5).forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'book';

      const bookImage = document.createElement('img');
      bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: Maths`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${book.rating ? book.rating.average.toFixed(2) : 'N/A'}`;

      const availability = document.createElement('p');
      availability.textContent = `Availability: ${padDigits(Math.floor(Math.random() * 100), 2)}`;

      const publishedYear = document.createElement('p');
      publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.className = 'add-button';
      addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'lightblue';
      });
      addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'blue';
      });
      addButton.addEventListener('click', () => {
        const cartItem = {
          id: book.cover_id,
          title: book.title,
          author: book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown',
          genre: 'Maths'
        };

        cartItems.push(cartItem);
        updateCartItemCount();
        displayCartItems();
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(genre);
      bookDetails.appendChild(rating);
      bookDetails.appendChild(availability);
      bookDetails.appendChild(publishedYear);
      bookDetails.appendChild(addButton);

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookDetails);

      booksList.appendChild(bookItem);
    });

    function updateCartItemCount() {
      cartItemCount.textContent = cartItems.length;
    }

    function displayCartItems() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartTitle = document.createElement('p');
        cartTitle.textContent = `Title: ${item.title}`;

        const cartAuthor = document.createElement('p');
        cartAuthor.textContent = `Author: ${item.author}`;

        const cartGenre = document.createElement('p');
        cartGenre.textContent = `Genre: ${item.genre}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Cart';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
          removeCartItem(item.id);
        });

        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartAuthor);
        cartItem.appendChild(cartGenre);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
      });
    }

    function removeCartItem(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartItemCount();
      displayCartItems();
    }

    cartIcon.addEventListener('click', () => {
      cartContainer.classList.toggle('show-cart');
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}



fetch('https://openlibrary.org/subjects/crime.json')
  .then(response => response.json())
  .then(data => {
    const booksList = document.getElementById('CRIME');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart');

    let cartItems = [];

    data.works.slice(0, 5).forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'book';

      const bookImage = document.createElement('img');
      bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: Crime`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${book.rating ? book.rating.average.toFixed(2) : 'N/A'}`;

      const availability = document.createElement('p');
      availability.textContent = `Availability: ${padDigits(Math.floor(Math.random() * 100), 2)}`;

      const publishedYear = document.createElement('p');
      publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.className = 'add-button';
      addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'lightblue';
      });
      addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'blue';
      });
      addButton.addEventListener('click', () => {
        const cartItem = {
          id: book.cover_id,
          title: book.title,
          author: book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown',
          genre: 'Crime'
        };

        cartItems.push(cartItem);
        updateCartItemCount();
        displayCartItems();
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(genre);
      bookDetails.appendChild(rating);
      bookDetails.appendChild(availability);
      bookDetails.appendChild(publishedYear);
      bookDetails.appendChild(addButton);

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookDetails);

      booksList.appendChild(bookItem);
    });

    function updateCartItemCount() {
      cartItemCount.textContent = cartItems.length;
    }

    function displayCartItems() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartTitle = document.createElement('p');
        cartTitle.textContent = `Title: ${item.title}`;

        const cartAuthor = document.createElement('p');
        cartAuthor.textContent = `Author: ${item.author}`;

        const cartGenre = document.createElement('p');
        cartGenre.textContent = `Genre: ${item.genre}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Cart';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
          removeCartItem(item.id);
        });

        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartAuthor);
        cartItem.appendChild(cartGenre);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
      });
    }

    function removeCartItem(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartItemCount();
      displayCartItems();
    }

    cartIcon.addEventListener('click', () => {
      cartContainer.classList.toggle('show-cart');
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}




fetch('https://openlibrary.org/subjects/social.json')
  .then(response => response.json())
  .then(data => {
    const booksList = document.getElementById('SOCIAL');
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartContainer = document.getElementById('cart');

    let cartItems = [];

    data.works.slice(0, 5).forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.className = 'book';

      const bookImage = document.createElement('img');
      bookImage.src = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown'}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: Social`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${book.rating ? book.rating.average.toFixed(2) : 'N/A'}`;

      const availability = document.createElement('p');
      availability.textContent = `Availability: ${padDigits(Math.floor(Math.random() * 100), 2)}`;

      const publishedYear = document.createElement('p');
      publishedYear.textContent = `Published Year: ${Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900}`;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.className = 'add-button';
      addButton.addEventListener('mouseover', () => {
        addButton.style.backgroundColor = 'lightblue';
      });
      addButton.addEventListener('mouseout', () => {
        addButton.style.backgroundColor = 'blue';
      });
      addButton.addEventListener('click', () => {
        const cartItem = {
          id: book.cover_id,
          title: book.title,
          author: book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown',
          genre: 'Social'
        };

        cartItems.push(cartItem);
        updateCartItemCount();
        displayCartItems();
      });

      bookDetails.appendChild(title);
      bookDetails.appendChild(author);
      bookDetails.appendChild(genre);
      bookDetails.appendChild(rating);
      bookDetails.appendChild(availability);
      bookDetails.appendChild(publishedYear);
      bookDetails.appendChild(addButton);

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookDetails);

      booksList.appendChild(bookItem);
    });

    function updateCartItemCount() {
      cartItemCount.textContent = cartItems.length;
    }

    function displayCartItems() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const cartTitle = document.createElement('p');
        cartTitle.textContent = `Title: ${item.title}`;

        const cartAuthor = document.createElement('p');
        cartAuthor.textContent = `Author: ${item.author}`;

        const cartGenre = document.createElement('p');
        cartGenre.textContent = `Genre: ${item.genre}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Cart';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
          removeCartItem(item.id);
        });

        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartAuthor);
        cartItem.appendChild(cartGenre);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);
      });
    }

    function removeCartItem(itemId) {
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCartItemCount();
      displayCartItems();
    }

    cartIcon.addEventListener('click', () => {
      cartContainer.classList.toggle('show-cart');
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });

function padDigits(number, digits) {
  return number.toString().padStart(digits, '0');
}


