function changeMap(year) {
    const iframe = document.getElementById('map-frame');
    const mapTitle = document.getElementById('map-title');
    const mapDescription = document.getElementById('map-description');
    const yearImage = document.getElementById('year-image');

    iframe.src = `Densidad/${year}/index.html`;
    yearImage.src = `img/${year}.jpg`;
    yearImage.alt = `Densidad de Población ${year}`;

    switch (year) {
        case '1991':
            mapTitle.innerText = 'Densidad de Población 1991';
            mapDescription.innerText = 'Densidad de Población de Buenos Aires de 1991 a 2001...';
            break;
        case '2001':
            mapTitle.innerText = 'Densidad de Población de 2001';
            mapDescription.innerText = 'Densidad de Población de población de Buenos Aires de 1991 a 2022...';
            break;
        case '2010':
            mapTitle.innerText = 'Densidad de Población de 2010';
            mapDescription.innerText = 'Densidad de Población de población de Buenos Aires de 2001 a 2010...';
            break;
        case '2022':
            mapTitle.innerText = 'Densidad de Población de 2022';
            mapDescription.innerText = 'Densidad de Población de población de Buenos Aires de 2010 a 2022...';
            break;
    }

    const buttons = document.querySelectorAll('.year-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.querySelector(`.year-button[onclick="changeMap('${year}')"]`).classList.add('active');
}
