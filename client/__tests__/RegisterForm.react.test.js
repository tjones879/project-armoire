import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {RegisterForm} from '../src/components/Register';
import {LocalStorageMock} from '../mocks/LocalStorage.mock';

global.localStorage = new LocalStorageMock;

describe('Static testing of Register Form', () => {
    const registerForm = render(<RegisterForm />);
    test('should have a first name input', () => {
        expect(registerForm.find('[name="first"]').length).toBe(1);
    });
    test('should have a first name label', () => {
        expect(registerForm.find('[for="1"]').length).toBe(1);
    });
    test('shoulld have a first name feedback', () => {
        expect(registerForm.find('#firstFeedback').length).toBe(1);
    });
    test('should have a last name input', () => {
        expect(registerForm.find('[name="last"]').length).toBe(1);
    });
    test('should have a last name label', () => {
        expect(registerForm.find('[for="2"]').length).toBe(1);
    });
    test('should have a last name feedback', () => {
        expect(registerForm.find('#lastFeedback').length).toBe(1);
    });
    test('should have a email input', () => {
        expect(registerForm.find('[name="email"]').length).toBe(1);
    });
    test('should have an email label', () => {
        expect(registerForm.find('[for="3"]').length).toBe(1);
    });
    test('shoud have a email feedback span', () => {
        expect(registerForm.find('#emailFeedback').length).toBe(1);
    });
    test('should have a password input', () => {
        expect(registerForm.find('[name="password"]').length).toBe(1);
    });
    test('should have a password feedback span', () => {
        expect(registerForm.find('#passwordFeedback').length).toBe(1);
    });
    test('should have a password label', () => {
        expect(registerForm.find('[for="4"]').length).toBe(1);
    });
    test('should have a confirm password input', () => {
        expect(registerForm.find('[name="confirm"]').length).toBe(1);
    });
    test('should have a confirm password label', () => {
        expect(registerForm.find('[for="5"]').length).toBe(1);
    });
    test('should have a confirm password feedback span', () => {
        expect(registerForm.find('#confirmFeedback').length).toBe(1);
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
    let theForm = new RegisterForm();
    let longName = "";
    for(let i = 0; i < 36; i++){
        longName += 'a';
    }
    test('if name length is less than two characters long the function should return "[first | last] name must be at least 2 characters."', () => {
        expect(theForm.checkName('j', 'last')).toBe('last name must be at least 2 characters.');
        expect(theForm.checkName('j','first')).toBe('first name must be at least 2 characters.');
        expect(theForm.checkName(longName, 'first')).toBe('first name must be 35 characters or less.');
        expect(theForm.checkName(longName, 'last')).toBe('last name must be 35 characters or less.');
        expect(theForm.checkName('3344', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('dalt#33kjdk', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('dalt#33k$#$%^jdk', 'first')).toBe('first name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('23423232', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('23@#$32', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('<>?><32', 'last')).toBe('last name must be letters, hyphens, single quotes, and spaces.');
        expect(theForm.checkName('dalton', 'last')).toBe('dalton');
        expect(theForm.checkName('dalton', 'first')).toBe('dalton');
        expect(theForm.checkName('dalton-neely O\'riley', 'last')).toBe('dalton-neely O\'riley');
        expect(theForm.checkName('dalton-neely O\'riley', 'first')).toBe('dalton-neely O\'riley');
    });
});


/* this works but throws an error because we are messing with the state */
// describe('Mount testing of Register Component', () => {
//     const wrapper = mount(<RegisterForm />);
//     wrapper.find('#registerBtn').simulate('click');
//     wrapper.find('[name="first"]').simulate('change', {target: {value:'dalton'}});
//     expect(wrapper.find('#firstFeedback').text()).toBe('dalton');
// });