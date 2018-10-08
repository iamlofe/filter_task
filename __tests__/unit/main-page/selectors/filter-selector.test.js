import React from 'react';
import { shallow } from 'enzyme';
import { List, Map } from 'immutable';

import {
    getFilterSelected,
    getFilter,
    getIsSavingData,
    getIsRestoringData,
    selectedContext,
    selectedDemision,
    selectedResults,
    contexts,
    demisions,
    results,
    filteredDemisions,
    filteredResults,
    filteredResultsWithSort
} from 'main-page/selectors/filter-selector';
import { SearchTypes } from 'main-page/constants/filter-constants';
import { getMockState, getMockStateMain, getMockStateMainItems } from '../mock-store/mock-filter-reducer';

describe('filter selector', () => {
    const props = {
        filterId: 'test'
    };

    it('should return truth object', () => {
        expect(getFilterSelected(getMockState(), props)).toEqual(new Map({
            1: new Map({
                2: new List(['1'])
            })
        }));
    });

    it('should return filterState', () => {
        expect(getFilter(getMockStateMain())).toEqual(new Map());
    });

    it('should return savingData', () => {
        expect(getIsSavingData(getMockState(), props)).toEqual(false);
    });

    it('should return storingData', () => {
        expect(getIsRestoringData(getMockState(), props)).toEqual(false);
    });

    it('should return truth object', () => {
        const selected = selectedContext(getMockState(), props);

        expect(selected).toEqual(new List(['1']));
    });

    it('should return selected demisions', () => {
        const selected = selectedDemision(getMockState(), props);

        expect(selected).toEqual(new List(['2']));
    });

    it('should return selected results', () => {
        const selected = selectedResults(getMockState(), props);

        expect(selected).toEqual(new List(['1']));
    });

    it('should return contexts', () => {
        const selected = contexts(getMockStateMainItems(), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return demisions', () => {
        const selected = demisions(getMockStateMainItems(), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return results', () => {
        const selected = results(getMockStateMainItems(), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return filtered demisions', () => {
        const selected = filteredDemisions(getMockStateMainItems(), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return filtered results', () => {
        const selected = filteredResults(getMockStateMainItems(), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return filtered results with beginWith', () => {
        const searchType = 'beginWith';
        const selected = filteredResultsWithSort(getMockStateMainItems(searchType), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return filtered results with overlap', () => {
        const searchType = 'overlap';
        const selected = filteredResultsWithSort(getMockStateMainItems(searchType), props);

        expect(selected.count()).toEqual(2);
    });

    it('should return filtered results with exactMatch', () => {
        const searchType = 'exactMatch';
        const selected = filteredResultsWithSort(getMockStateMainItems(searchType), props);

        expect(selected.count()).toEqual(0);
    });
});
