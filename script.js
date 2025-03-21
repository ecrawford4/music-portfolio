document.addEventListener('DOMContentLoaded', () => {
  // fetch music portfolio data from the server
  const dataSource = "https://ecrawford4-assets.s3.us-east-2.amazonaws.com/data.json";

  fetch(dataSource)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data fetched successfully:', data);

      const container = document.querySelector("figure.music-folio-grid-container");
      if (!container) {
        console.error('figure.music-folio-grid-container container not found');
        return;
      }

      data.music.forEach(key => {
        const template = `
          <figure class="music-folio-grid-item">
            <h2 class="music-folio spectral-light-italic">${key.title}</h2>
            <img src="${key.imgSrc}" alt="${key.altTxt}" class="music-folio-image">
            <audio src="${key.audioSrc}" controls></audio>
            <a class="music-folio-badge" target="_blank" href="${key.scoreSrc}">View Score</a>
          </figure>
        `;
        container.insertAdjacentHTML('afterbegin', template);
      });
    });
});