const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const toggleButton = document.getElementById('toggle-search');
let searchType = 'user'; // Default search type

searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchType === 'user') {
        searchUsers(searchTerm);
    } else {
        searchRepos(searchTerm);
    }
});

toggleButton.addEventListener('click', function () {
    searchType = searchType === 'user' ? 'repo' : 'user';
    searchInput.placeholder = `Search for a ${searchType}`;
});

function searchUsers(searchTerm) {
    const url = `https://api.github.com/search/users?q=${searchTerm}`;
    fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error(error));
}

function searchRepos(searchTerm) {
    const url = `https://api.github.com/search/repositories?q=${searchTerm}`;
    fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayRepos(data.items);
        })
        .catch(error => console.error(error));
}

function displayUsers(users) {
    resultsDiv.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p><strong>Username:</strong> ${user.login}</p>
            <p><strong>Avatar:</strong> <img src="${user.avatar_url}" alt="Avatar"></p>
            <p><strong>Profile:</strong> <a href="${user.html_url}" target="_blank">Link to Profile</a></p>
        `;
        resultsDiv.appendChild(userDiv);

        userDiv.addEventListener('click', function () {
            searchRepos(user.login);
        });
    });
}

function displayRepos(repos) {
    resultsDiv.innerHTML = '';
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <p><strong>Repository Name:</strong> ${repo.name}</p>
            <p><strong>URL:</strong> <a href="${repo.html_url}" target="_blank">Link to Repo</a></p>
        `;
        resultsDiv.appendChild(repoDiv);
    });
}
