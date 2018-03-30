import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {AccountInfoBox} from '../src/components/AccountInfoBox.component.react';

let userObj;
let wrapper;

beforeEach(() => {
    userObj = {
        fname:"Tom",
        lname:"Jones",
        email:"tomjones@somesite.com",
        classification:"student"
    };
    wrapper = shallow(<AccountInfoBox user={userObj}/>);
});

describe('Shallow testing of AccountInfoBox', () => {
    test('info box should display first name in a div with id="first", passed down by prop object "user"', () => {
        const node = wrapper.find('div#fname');
        expect(node.exists()).toBeTruthy();
        expect(node.text()).toMatch(/^Tom$/);
    });
    test('props should come in as an object', () => {
        expect(wrapper.instance().props).toMatchObject({"user":userObj});
    });
    test('info box should display last name in a div with id="last", passed in by prop', () => {
        const node = wrapper.find('div#lname');
        expect(node.exists()).toBeTruthy();
        expect(node.text()).toMatch(/^Jones$/);
    });
    test('info box should display email in a div with id="email", passed down by prop obj', () => {
        const node = wrapper.find('div#email');
        expect(node.exists()).toBeTruthy();
        expect(node.text()).toMatch(/^tomjones@somesite.com$/);
    });
    test('info box should display classification of user in div with id="classification", passed down by prop obj', () => {
        const node = wrapper.find('div#classification');
        expect(node.exists()).toBeTruthy();
        expect(node.text()).toMatch(/^student$/);
    });
    test('All data should receive a an accurate label', () => {
        expect(wrapper.find('div#fnameLabel').exists()).toBeTruthy();
        expect(wrapper.find('div#lnameLabel').exists()).toBeTruthy();
        expect(wrapper.find('div#emailLabel').exists()).toBeTruthy();
        expect(wrapper.find('div#classificationLabel').exists()).toBeTruthy();
    })
});

describe('snapshot testing of AccountInfoBox', () => {
    expect(wrapper).toMatchSnapshot();
});