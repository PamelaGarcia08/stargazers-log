const repoList = document.getElementById('repo-list');

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function renderRepos(repos) {
  if (!repoList) {
    return;
  }

  if (!repos.length) {
    repoList.innerHTML = '<li class="empty-state">No starred repositories yet.</li>';
    return;
  }

  repoList.innerHTML = repos
    .map(
      (repo) => `
        <li class="repo-item">
          <div class="repo-top">
            <a class="repo-name" href="https://github.com/${repo.owner}/${repo.name}" target="_blank" rel="noreferrer">
              ${repo.owner}/${repo.name}
            </a>
            <span class="repo-language">${repo.language || 'Unknown'}</span>
          </div>
          <p class="repo-description">${repo.description || 'No description available.'}</p>
          <div class="repo-meta">
            <span class="star-count">★ ${repo.stargazers_count.toLocaleString()}</span>
            <span class="repo-date">Updated ${formatDate(repo.updated_at)}</span>
          </div>
        </li>
      `
    )
    .join('');
}

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => renderRepos(data))
  .catch((error) => {
    console.error('Unable to load starred repositories:', error);
    if (repoList) {
      repoList.innerHTML = '<li class="empty-state">Unable to load starred repositories.</li>';
    }
  });
