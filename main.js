// *********  DATA ********** //
const data = [
  {
    videoId: 'bUZgmUXMUw4',
    title: 'Bhailang',
    category: 'javascript',
    favorite: true,
  },
  {
    videoId: 'g9b7x2g9cJk',
    title: 'fullstack roadmap',
    category: 'html',
    favorite: false,
  },
  
  {
    videoId: 'XXYlFuWEuKI',
    title: 'weekend music',
    category: 'music',
    favorite: false,
  },
  {
    videoId: 'hMQCVMh4Aig',
    title: 'Life at Park+',
    category: 'javascript',
    favorite: true,
  },
  
  

];

// *********  UTILITY FUNCTIONS  ********* //
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

// *********  HTML COMPONENT FUNCTIONS  ********* //
// Add Video Button / Modal
// https://getbootstrap.com/docs/5.0/components/modal/#live-demo
const videoBtnModal = () => {
  const domString = `
    <div class="d-flex justify-content-between align-items-center" style="width: 100%;">
      <!-- Dark Mode Toggle Button -->
      <button type="button" class="btn btn-dark" id="darkModeToggle" style="margin-right: auto;">
        Dark Mode
      </button>

      <!-- Button trigger modal -->
      <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-video">
        Add Video
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="add-video" tabindex="-1" aria-labelledby="add-video" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Video</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
            <form>
              <div class="form-floating mb-3">
                <input class="form-control form-control-lg" type="text" placeholder="Video ID" id="videoId" aria-label="video id" required>
                <label for="videoId">YouTube Video ID</label>
              </div>

              <div class="form-floating mb-3">
                <input class="form-control form-control-lg" type="text" placeholder="Title" id="title" aria-label="title" required>
                <label for="title">Title</label>
              </div>

              <div class="form-floating mb-3">
                <select class="form-select form-control-lg" id="category" aria-label="category" required>
                  <option value="">Select a category</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                  <option value="music">Music</option>
                </select>
                <label for="category">Category</label>
              </div>
              
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="favorite">
                <label class="form-check-label" for="favorite">
                  Favorite
                </label>
              </div>

              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  renderToDom('#createBtnContainer', domString);
};

// Video component with default arg value
const videoPlayer = (videoId = 'g9b7x2g9cJk') => {
  const domString = `
  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
  renderToDom('#videoPlayer', domString);
};

// Filter Button Row
const filterButtons = () => {
  let domString = `
  <div class="d-flex flex-wrap justify-content-between my-3">
    <button class="btn btn-secondary btn-lg buttonRow" id="music">Music</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="javascript">Javascript</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="css">CSS</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="html">HTML</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="favorite">Favorites</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="clear">Clear Filter</button>
  </div>
  `;
  renderToDom('#filterContainer', domString);
};

// Cards
const cardsOnDom = (array) => {
  let domString = '';
  for (const item of array) {
    domString += `
      <div class="mb-3 d-flex align-items-center" style="background: white; padding: 20px; border: 1px solid black; border-radius: 10px;">
        <div class="flex-shrink-0">
          <img src="./assets/images/${item.category}.png" style="width: 120px; height: 120px; border-radius: 20px;" alt="${item.category} icon">
        </div>
        <div class="flex-grow-1 ms-3">
          <h2 class="video-title" style="font-size: 24px; font-weight: bold; padding: 0px; margin: 0px">${item.favorite ? '⭐' : ''} ${item.title}</h2>
          <p class="video-category"><b>Category:</b> ${item.category.toUpperCase()}</p>
          <button class="btn btn-dark" id="watch--${item.videoId}">Watch Video</button>
        </div>
        <div>
          <button class="btn btn-danger" id="delete--${item.videoId}">X</button>
        </div>
      </div>
    `;
  }
  renderToDom('#cardContainer', domString);
};

// *********  DARK MODE TOGGLE FUNCTION ********* //
const darkModeToggle = () => {
  const body = document.body;
  const toggleBtn = document.querySelector('#darkModeToggle');
  const addVideoBtn = document.querySelector('[data-bs-target="#add-video"]');

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      toggleBtn.textContent = 'Light Mode';
      toggleBtn.style.backgroundColor = '#e0e0e0';
      toggleBtn.style.color = '#121212';
      
      addVideoBtn.style.backgroundColor = '#1f1f1f';
      addVideoBtn.style.color = '#e0e0e0';
    } else {
      toggleBtn.textContent = 'Dark Mode';
      toggleBtn.style.backgroundColor = '#121212';
      toggleBtn.style.color = '#e0e0e0';

      addVideoBtn.style.backgroundColor = '#f8f9fa';
      addVideoBtn.style.color = '#212529';
    }
  });
};

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type} show`;
  toast.textContent = message;
  
  document.querySelector('#toast-container').appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
};


// *********  EVENT LISTENERS  *********  //
const eventListeners = () => {
  // Bootstrap for grabbing modal so can manually open and close
  const formModal = new bootstrap.Modal(document.querySelector('#add-video'));
  
  // FILTER BUTTON ROW
  document.querySelector('#filterContainer').addEventListener('click', (e) => {
    // filter on category (either use .filter or a loop)
    // rerender DOM with new array (use the cardsOnDom function)
    if (e.target.id === 'clear') {
      cardsOnDom(data);
    } else if (e.target.id === 'favorite') {
      cardsOnDom(data.filter((vid) => vid.favorite));
    } else if (e.target.id) {
      cardsOnDom(data.filter((vid) => vid.category === e.target.id));
    }
  });

  // BUTTONS ON CARDS
  document.querySelector('#cardContainer').addEventListener('click', (e) => {
    if (e.target.id) {
      const [, videoId] = e.target.id.split('--');
      const index = data.findIndex((vid) => vid.videoId === videoId);
  
      // if watch: grab the ID and rerender the videoPlayer with that ID as an argument
      if (e.target.id.includes('watch')) {
        videoPlayer(data[index].videoId);
        document.location = '#';
      }
  
      // if delete: ask for confirmation before deleting
      if (e.target.id.includes('delete')) {
        const confirmed = window.confirm('Are you sure you want to delete this video?');
        if (confirmed) {
          data.splice(index, 1);
          cardsOnDom(data);
          showToast('Video deleted successfully!', 'error');
        }
      }
    }
  });  

  // FORM SUBMIT
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const newVidObj = {
      videoId: document.querySelector('#videoId').value,
      title: document.querySelector('#title').value,
      category: document.querySelector('#category').value,
      favorite: document.querySelector('#favorite').checked,
    };
  
    data.push(newVidObj);
    cardsOnDom(data);
    formModal.hide();
    document.querySelector('form').reset();
    
    showToast('Video added successfully!', 'info');
  });
  
};

// *********  FUNCTION TO START APPLICATION  *********  //
const startApp = () => {
  videoBtnModal();
  filterButtons();
  cardsOnDom(data);
  videoPlayer();
  darkModeToggle();
  eventListeners();
};

startApp();

startApp();
