import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {LoginForm} from '../src/containers/Login.container.react';

describe('Static testing of Login Form', () => {
    const loginForm = render(<LoginForm />);
    test('should have email input', () => {
        expect(loginForm.find('#email').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a email label', () => {
        expect(loginForm.find("[for='email']").length).toBeGreaterThanOrEqual(1);
    });
    test('should have a password input', () => {
        expect(loginForm.find('#password').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a password label', () => {
        expect(loginForm.find('[for="password"]').length).toBeGreaterThanOrEqual(1);
    });
    test('should have login button', () => {
        expect(loginForm.find('#loginBtn').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a feedback span', () => {
        expect(loginForm.find('#feedback').length).toBeGreaterThanOrEqual(1);
    })
});