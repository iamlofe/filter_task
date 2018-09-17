import React from 'react';
import propTypes from 'prop-types';

import Portal from 'shared/components/portal/portal';
import Button from 'shared/components/button-open-filter/button-open-filter';
import FilterWidget from '../../containers/filter-widget-container';


import './filter.scss';

class DisplayWidget extends React.PureComponent {
    static propTypes = {
        filterId: propTypes.string.isRequired,
        onSaveStateWidget: propTypes.func.isRequired,
    }
    state = {
        isOpenFilterWidget: false,
    };

    onOpenFilterWidget = () => {
        this.setState({
            isOpenFilterWidget: !this.state.isOpenFilterWidget,
        });
    };


    render() {
        const {
            filterId, onSaveStateWidget, dataWidget, onRestoreSavingData
        } = this.props;
        return (
            <div className="filter-container__state">
                <div className="filter-container__state-content">
                    <div className="filter-container__space-buttons">
                        <Button onMakeAction={this.onOpenFilterWidget} label="Open" />
                        <Button onMakeAction={() => onSaveStateWidget({ filterId, savingData: dataWidget })} label="Save" />
                        <Button onMakeAction={() => onRestoreSavingData({ filterId })} label="Restore" />
                    </div>

                    <div className="filter-container__display-state-container">
                        <div className="filter-container__display-state">ss</div>
                        <Portal>
                            <FilterWidget isOpenFilterWidget={this.state.isOpenFilterWidget} filterId={filterId} />
                        </Portal>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayWidget;
