import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import { CurrentContext } from 'main-page/records/filter-record';
import Filter from 'main-page/components/filter/filter';

describe('account component', () => {
    const baseProps = {
        filterId: '',
        isRestoreAvailable: false,
        onRestoreState: jest.fn(),
        onToggleWidget: jest.fn(),
        isWidgetOpen: false,
        onSaveDataWidget: jest.fn(),
        isSavingData: false,
        selectedContext: new List(),
        selectedDemision: new List(),
        selectedResults: new List(),
        contexts: new List(),
        demisions: new List(),
        results: new List(),
        onDeleteFilter: jest.fn(),
        isRestoringData: false,
        dataWidget: new CurrentContext()
    };

    it('is shallow rendered without crashing', () => {
        const filter = <Filter {...baseProps} />;

        const filterComponent = shallow(filter);
        expect(filterComponent).toMatchSnapshot();
    });

    it('is shallow rendered with isWidgetOpen true without crashing', () => {
        const filter = <Filter {...baseProps} isWidgetOpen />;

        const filterComponent = shallow(filter);
        expect(filterComponent.find('.filter-container__button_open-filter').prop('label')).toEqual('Close');
        expect(filterComponent).toMatchSnapshot();
    });

    it('is shallow rendered with isRestoreAvailable true without crashing', () => {
        const filter = <Filter {...baseProps} isRestoreAvailable />;

        const filterComponent = shallow(filter);
        expect(filterComponent).toMatchSnapshot();
    });

    it('is shallow rendered with isSavingData true without crashing', () => {
        const filter = <Filter {...baseProps} isSavingData />;

        const filterComponent = shallow(filter);
        expect(filterComponent.find('.filter-container__button_save-filter').prop('label')).toEqual('...');
        expect(filterComponent).toMatchSnapshot();
    });

    it('is shallow rendered with isRestoringData true without crashing', () => {
        const filter = <Filter {...baseProps} isRestoringData isRestoreAvailable />;

        const filterComponent = shallow(filter);
        expect(filterComponent.find('.filter-container__button_restore-filter').prop('label')).toEqual('...');
        expect(filterComponent).toMatchSnapshot();
    });

    it('is shallow rendered with dataWidget.searchTitle  without ', () => {
        const filter = (
            <Filter
                {...baseProps}
                dataWidget={
                    new CurrentContext({
                        searchTitle: 'test'
                    })
                }
            />
        );

        const filterComponent = shallow(filter);
        expect(filterComponent).toMatchSnapshot();
    });
});
