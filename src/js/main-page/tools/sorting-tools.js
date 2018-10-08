export const toolSortTitles = (prev, next) => {
    if (prev.get('title') > next.get('title')) {
        return 1;
    }

    if (prev.get('title') < next.get('title')) {
        return -1;
    }

    return 0;
};

export const sortTools = objectSort => objectSort.sort(toolSortTitles);
