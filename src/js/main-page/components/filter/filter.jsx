import React from 'react';
import PropTypes from 'prop-types';

import Portal from 'shared/components/portal/portal';
import Button from 'shared/components/button-filter/button-filter';
import FilterWidget from '../../containers/filter-widget-container';

import { CurrentContext } from '../../records/context-record';


import './filter.scss';

class DisplayWidget extends React.PureComponent {
    static propTypes = {
        filterId: PropTypes.string.isRequired,
        onSaveStateWidget: PropTypes.func,
        dataWidget: PropTypes.instanceOf(CurrentContext).isRequired,
        onRestoreSavingData: PropTypes.func,
    }
    static defaultProps = {
        onRestoreSavingData: () => {},
        onSaveStateWidget: () => {}
    }

    state = {
        isOpenFilterWidget: false,
    };

    onOpenFilterWidget = () => {
        this.setState({
            isOpenFilterWidget: !this.state.isOpenFilterWidget,
        });
    };

    onSaveState = () => {
        const { filterId, dataWidget, onSaveStateWidget } = this.props;
        onSaveStateWidget({ filterId, dataWidget });
    }

    onRestoreState = () => {
        const { onRestoreSavingData, filterId } = this.props;
        onRestoreSavingData({ filterId });
    }

    render() {
        const { filterId } = this.props;

        return (
            <div className="filter-container__state">
                <div className="filter-container__state-content">
                    <div className="filter-container__space-buttons">
                        <Button className="filter-container__button_open-filter" onClick={this.onOpenFilterWidget} label="Open" />
                        <Button className="filter-container__button_save-filter" onClick={this.onSaveState} label="Save" />
                        <Button className="filter-container__button_restore-filter" onClick={this.onRestoreState} label="Restore" />
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
