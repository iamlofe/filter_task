import { List, Map } from 'immutable';

export const parseTool = (objectParse) => {
    const objectIds = objectParse.contextIds;

    let dataParse = new Map({
        searchTitle: objectParse.searchTitle,
        searchType: objectParse.searchType,
        contextIds: new Map()
    });

    Object.keys(objectIds).forEach((context) => {
        dataParse = dataParse.setIn(['contextIds', +context], new Map());
        if (objectIds[context]) {
            Object.keys(objectIds[context]).forEach((demision) => {
                dataParse = dataParse.setIn(
                    ['contextIds', +context, +demision],
                    new List(objectIds[context][demision])
                );
            });
        }
    });

    return dataParse;
};
