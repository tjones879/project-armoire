import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {AccountInfo} from '../src/containers/AccountInfo.container.react';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

let wrapper;

beforeEach(() => {
    wrapper = shallow(<AccountInfo />);
});

describe('Shallow rendering of AccountInfo container', () => {
    test('Account Info renders and exists', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
    test('the default clearance should not be allowed by default', () => {
        expect(wrapper.state('status')).toBeFalsy();
    });
});