chrome.runtime.onInstalled.addListener(async () => {
    // Reload tabs to apply content scripts
    const tabs = await chrome.tabs.query({ url: ['https://chat.openai.com/*','https://chatgpt.com/*'] })
    tabs.forEach(({ id }) => chrome.tabs.reload(id))
})