import { toolSortTitles } from 'main-page/tools/sorting-tools';
import { Map } from 'immutable';

describe('sorting tool', () => {
    it('should return -1', () => {
        const first = new Map({
            title: 'A'
        });
        const second = new Map({
            title: 'B'
        });
        expect(toolSortTitles(first, second)).toEqual(-1);
    });

    it('should return 1', () => {
        const first = new Map({
            title: 'A'
        });
        const second = new Map({
            title: 'B'
        });
        expect(toolSortTitles(second, first)).toEqual(1);
    });
});
