document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_GOOGLE_SHEETS_API_KEY';
    const sheetId = 'YOUR_GOOGLE_SHEET_ID';
    const sheetName = 'Sheet1';

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
                const results = rows.slice(1).find(row => row[1] === rollNumber);
                resultList.innerHTML = '';
                if (!results) {
                    resultList.innerHTML = '<p>No results found for the provided roll number.</p>';
                } else {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `
                        <h2>${results[0]}</h2>
                        <p>Roll Number: ${results[1]}</p>
                        <div class="subjects">
                            <div class="subject">Math: ${results[2]}</div>
                            <div class="subject">Science: ${results[3]}</div>
                            <div class="subject">English: ${results[4]}</div>
                            <div class="subject">History: ${results[5]}</div>
                            <div class="subject">Geography: ${results[6]}</div>
                            <div class="subject">Computer Science: ${results[7]}</div>
                        </div>
                    `;
                    resultList.appendChild(resultItem);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});
