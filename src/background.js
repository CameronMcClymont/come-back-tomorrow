console.log("Adding commanding listener...");
chrome.commands.onCommand.addListener(function (command) {
    if (command === "come-back-tomorrow") {
        console.log("Triggered come-back-tomorrow");

        // Get the current tab's ID
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            // Close the current tab
            chrome.tabs.remove(tabs[0].id);

            // Calculate the timestamp for tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const timestamp = tomorrow.getTime();
            // const now = new Date();
            // const timestamp = now.getTime() + 4000;

            // Schedule an alarm to reopen the tab tomorrow
            const tabUrl = tabs[0].url;
            console.log("Creating alarm for " + tabUrl);
            chrome.alarms.create(tabUrl, { when: timestamp });
        });
    }
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Reopening tab: " + alarm.name);

    // Convert the alarm name back to tab ID
    const tabUrl = alarm.name;

    // Reopen the tab
    chrome.tabs.create({ url: tabUrl }, function (tab) {});
});
