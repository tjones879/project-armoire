import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {RegisterForm} from '../src/containers/RegisterForm.container.react';
import store from '../src/stores/Register.store';
import {LocalStorageMock} from '../mocks/LocalStorage.mock';

global.localStorage = new LocalStorageMock;

describe('Static testing of Register Form', () => {
    const registerForm = render(<RegisterForm />);
    test('should have a first name input', () => {
        expect(registerForm.find('#fname').length).toBe(1);
    });
    test('should have a first name label', () => {
        expect(registerForm.find('[for="fname"]').length).toBe(1);
    });
    test('shoulld have a first name feedback', () => {
        expect(registerForm.find('#fnameFeedback').length).toBe(1);
    });
    test('should have a last name input', () => {
        expect(registerForm.find('#lname').length).toBe(1);
    });
    test('should have a last name label', () => {
        expect(registerForm.find('[for="lname"]').length).toBe(1);
    });
    test('should have a last name feedback', () => {
        expect(registerForm.find('#lnameFeedback').length).toBe(1);
    });
    test('should have a email input', () => {
        expect(registerForm.find('#email').length).toBe(1);
    });
    test('should have an email label', () => {
        expect(registerForm.find('[for="email"]').length).toBe(1);
    });
    test('shoud have a email feedback span', () => {
        expect(registerForm.find('#emailFeedback').length).toBe(1);
    });
    test('should have a password input', () => {
        expect(registerForm.find('#password').length).toBe(1);
    });
    test('should have a password feedback span', () => {
        expect(registerForm.find('#passwordFeedback').length).toBe(1);
    });
    test('should have a password label', () => {
        expect(registerForm.find('[for="password"]').length).toBe(1);
    });
    test('should have a confirm password input', () => {
        expect(registerForm.find('#cPassword').length).toBe(1);
    });
    test('should have a confirm password label', () => {
        expect(registerForm.find('[for="cPassword"]').length).toBe(1);
    });
    test('should have a confirm password feedback span', () => {
        expect(registerForm.find('#cPasswordFeedback').length).toBe(1);
    });
    test('should have a student radio button', () => {
        expect(registerForm.find('[value="student"]').length).toBe(1);
    });
    test('should have a professor radio button', () => {
        expect(registerForm.find('[value="professor"]').length).toBe(1);
    });
    test('should have a classification feedback span', () => {
        expect(registerForm.find('#classificationFeedback').length).toBe(1);
    });
    test('should have a register button', () => {
        expect(registerForm.find('#registerBtn').length).toBe(1);
    });
    test('should have a user feedback section', () => {
        expect(registerForm.find('#userFeedback').length).toBe(1);
    });
});

describe('function testing of RegisterForm', () => {
    let longName = "";
    for(let i = 0; i < 36; i++){
        longName += 'a';
    }
    test('if name length is less than two characters long the function should return "[first | last] name must be at least 2 characters."', () => {
        expect(store.checkName('j', 'last')).toBe('last name must be at least 2 characters.');
        expect(store.checkName('j','first')).toBe('first name must be at least 2 characters.');
        expect(store.checkName(longName, 'first')).toBe('first name must be 35 characters or less.');
        expect(store.checkName(longName, 'last')).toBe('last name must be 35 characters or less.');
        expect(store.checkName('3344', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('dalt#33kjdk', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('dalt#33k$#$%^jdk', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('23423232', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('23@#$32', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('<>?><32', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(store.checkName('dalton', 'last')).toBe('dalton');
        expect(store.checkName('dalton', 'first')).toBe('dalton');
        expect(store.checkName('dalton-neely O\'riley', 'last')).toBe('dalton-neely O\'riley');
        expect(store.checkName('dalton-neely O\'riley', 'first')).toBe('dalton-neely O\'riley');
    });
});


/* this works but throws an error because we are messing with the state */
// describe('Mount testing of Register Component', () => {
//     const wrapper = mount(<RegisterForm />);
//     wrapper.find('#registerBtn').simulate('click');
//     wrapper.find('[name="first"]').simulate('change', {target: {value:'dalton'}});
//     expect(wrapper.find('#firstFeedback').text()).toBe('dalton');
// });