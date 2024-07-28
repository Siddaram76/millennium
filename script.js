document.addEventListener('DOMContentLoaded', () => {
  const sheetId = '1QT6ipufgUfd-nLr5tm5yro7FEhuiHg-jf_0alnJKI8c';
        const apiKey = 'AIzaSyC-wylWnO4XxBbciUF1FwySQaZNM66j6sg';
    const sheetName = 'Sheet1'; // Ensure this matches your sheet name

    const form = document.getElementById('search-form');
    const resultList = document.getElementById('result-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const rollNumber = document.getElementById('roll-number').value;
        searchResult(rollNumber);
    });

    function searchResult(rollNumber) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const rows = data.values;
                const headers = rows[0];
                const resultRow = rows.slice(1).find(row => row[headers.indexOf('Roll Number')] === rollNumber);
                resultList.innerHTML = '';
                if (!resultRow) {
                    resultList.innerHTML = '<p>No results found for the provided roll number.</p>';
                } else {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    
                    let subjectsHtml = '';
                    headers.forEach((header, index) => {
                        if (header !== 'Name' && header !== 'Roll Number') {
                            subjectsHtml += `<div class="subject">${header}: ${resultRow[index]}</div>`;
                        }
                    });
                    
                    resultItem.innerHTML = `
                        <h2>${resultRow[headers.indexOf('Name')]}</h2>
                        <p>Roll Number: ${resultRow[headers.indexOf('Roll Number')]}</p>
                        <div class="subjects">
                            ${subjectsHtml}
                        </div>
                    `;
                    resultList.appendChild(resultItem);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultList.innerHTML = '<p>Error fetching data. Please try again later.</p>';
            });
    }
});
