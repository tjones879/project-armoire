import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {LoginForm} from '../src/components/Login';

describe('Static testing of Login Form', () => {
    const loginForm = render(<LoginForm />);
    test('should have email input', () => {
        expect(loginForm.find('#emailInput').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a email label', () => {
        expect(loginForm.find("[for='emailInput']").length).toBeGreaterThanOrEqual(1);
    });
    test('should have a password input', () => {
        expect(loginForm.find('#passwordInput').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a password label', () => {
        expect(loginForm.find('[for="passwordInput"]').length).toBeGreaterThanOrEqual(1);
    });
    test('should have login button', () => {
        expect(loginForm.find('#loginBtn').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a logout button', () => {
        expect(loginForm.find('#logoutBtn').length).toBeGreaterThanOrEqual(1);
    });
    test('should have a feedback span', () => {
        expect(loginForm.find('#feedback').length).toBeGreaterThanOrEqual(1);
    })
});