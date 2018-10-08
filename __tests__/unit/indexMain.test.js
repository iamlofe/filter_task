import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import IndexComponent from 'index';

describe('App', () => {
    it('should shallow componetn without craching', () => {
        expect(JSON.stringify(IndexComponent)).toMatchSnapshot();
    });
});
