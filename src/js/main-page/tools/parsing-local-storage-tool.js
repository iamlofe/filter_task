import { List, Map } from 'immutable';

export default (objectParse) => {
    let dataParse = new Map();
    Object.keys(objectParse).forEach((context) => {
        dataParse = dataParse.set(+context, new Map());
        if (objectParse[context]) {
            Object.keys(objectParse[context]).forEach((demision) => {
                dataParse = dataParse.setIn([+context, +demision], new List(objectParse[context][demision]));
            });
        }
    });
    return dataParse;
};
