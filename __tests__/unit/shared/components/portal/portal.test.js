import React from 'react';
import { shallow } from 'enzyme';

import Portal from 'shared/components/portal/portal';

describe('button-filter component', () => {
    it('should shalow rendered without crashing', () => {
        document.body.innerHTML = '';
        const element = document.createElement('div');
        element.id = 'portal-root';
        document.body.appendChild(element);
        const portalComponentP = (
            <Portal>
                <div> sss</div>
            </Portal>
        );
        const portalComponent = shallow(portalComponentP);

        expect(portalComponent).toMatchSnapshot();
    });
});
