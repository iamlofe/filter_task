export const searchTypes = {
    beginWith: {
        title: 'beginWith',
        condition: (inputString, settingsSearch) => inputString.startsWith(settingsSearch.searchTitle)
    },
    exactMatch: {
        title: 'exactMatch',
        condition: (inputString, settingsSearch) => inputString === settingsSearch.searchTitle
    },
    overlap: {
        title: 'overlap',
        condition: (inputString, settingsSearch) => inputString.includes(settingsSearch.searchTitle)
    }
};
