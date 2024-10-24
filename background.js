// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startScraping') {
        fetch('http://localhost:4000/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                profiles: [
                    "https://www.linkedin.com/in/mohita-babani-b010591b4",
                    "https://www.linkedin.com/in/tulip-pandey-ab0b671a9",
                    "https://www.linkedin.com/in/sakshisingh125"
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Scraping started:', data);
            sendResponse({ success: true });
        })
        .catch(error => {
            console.error('Error starting scraping:', error);
            sendResponse({ success: false, error });
        });

        return true;
    }
});
