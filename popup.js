document.querySelector('#scrapeBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startScraping' }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error in sending message:", chrome.runtime.lastError.message);
            return;
        }

        if (response && response.success) {
            console.log('Scraping started:', response);
        } else {
            console.error('Failed to start scraping:', response?.error || 'Unknown error');
        }
    });
});
