import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    constructor(props) {
        super(props);

        this.portalRoot = null;
        this.positionNode = null;
        this.wrapperNode = null;
    }

    componentWillMount() {
        this.portalRoot = document.getElementById('portal-root');
        this.wrapperNode = document.createElement('div');
    }

    componentDidMount() {
        this.portalRoot.appendChild(this.wrapperNode);
        this.updateWrapperPosition();
    }

    updateWrapperPosition() {
        let position;
        if (this.positionNode) {
            position = this.positionNode.getBoundingClientRect();
        }

        if (!this.positionNode) {
            position = document.createElement('div');
        }

        const offsetTop = position.top + window.pageYOffset;
        const offsetLeft = position.left + window.pageXOffset;

        this.wrapperNode.style.position = 'absolute';
        this.wrapperNode.style.top = `${offsetTop}px`;
        this.wrapperNode.style.left = `${offsetLeft}px`;
    }

    render() {
        return (
            <div
                ref={(positionNode) => {
                    this.positionNode = positionNode;
                }}
            >
                {ReactDOM.createPortal(this.props.children, this.wrapperNode)}
            </div>
        );
    }
}
export default Portal;
