import axios from 'axios';

let currentPage = 0;
const itemsPerPage = 4;

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        currentPage = 0;
        searchJobs(query, currentPage);
    }
});

document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        if (query) {
            currentPage = 0;
            searchJobs(query, currentPage);
        }
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        currentPage++;
        searchJobs(query, currentPage);
    }
});

document.getElementById('prev-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        currentPage--;
        searchJobs(query, currentPage);
    }
});

async function searchJobs(query, page) {
    try {
        const response = await axios.get('https://api.hh.ru/vacancies', {
            params: {
                text: query,
                per_page: itemsPerPage,
                page: page
            }
        });
        displayResults(response.data.items);
        updatePaginationControls(response.data.pages, page);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

function displayResults(jobs) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job');
        jobDiv.innerHTML = `
            <h2>${job.name}</h2>
            <p>${job.employer.name}</p>
            <p>${job.area.name}</p>
            <a href="${job.alternate_url}" target="_blank">Посмотреть вакансию</a>
        `;
        resultsDiv.appendChild(jobDiv);
    });
}

function updatePaginationControls(totalPages, currentPage) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
    pageInfo.textContent = `${currentPage + 1}`;
}
