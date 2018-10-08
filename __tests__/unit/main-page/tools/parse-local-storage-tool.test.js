import { parseTool } from 'main-page/tools/parse-local-storage-tool';
import { Map, List } from 'immutable';

describe('local storage tool', () => {
    it('should parse correctly', () => {
        const objectParse = {
            searchTitle: 'testType',
            searchType: 'testType',
            contextIds: {
                1: {
                    3: []
                },
                2: {
                    4: []
                }
            }
        };

        expect(parseTool(objectParse)).toEqual(new Map({
            searchTitle: 'testType',
            searchType: 'testType',
            contextIds: new Map([[1, new Map([[3, new List()]])], [2, new Map([[4, new List()]])]])
        }));
    });
});
