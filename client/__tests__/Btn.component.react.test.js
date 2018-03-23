import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {Btn} from '../src/components/Btn.component.react';

let props, wrapper, node;

let mockEvent = jest.fn();
mockEvent.mockImplementation(() => {
});

beforeEach(() => {
    props = {
        text:'button',
        type:'button',
        id:'BtnID',
        event: mockEvent,
        disabled: true
    }
    wrapper = shallow(<Btn id={props.id} text={props.text} type={props.type} event={props.event} disabled={props.disabled}/>);
    node = wrapper.find(`button#${props.id}`);
});

describe('shallow rendering of Btn', () => {
    test('Props should be sent in properly', () => {
        expect(wrapper.instance().props).toMatchObject(props);
    });
    test('Btn text should match the prop sent in', () => {
        expect(node.text()).toEqual(props.text);
    });
    test('mock button click should happen', () => {
        node.simulate('click');
        expect(mockEvent).toHaveBeenCalled();
    });
});

describe('snapshot testing of Btn component', () => {
    test('snapshot should remain the same', () => {
        expect(wrapper).toMatchSnapshot();
    });
});