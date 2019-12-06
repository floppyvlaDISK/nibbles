import jsdom from 'jsdom';

const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
const globalAny: any = global;

globalAny.window = window;
globalAny.document = window.document;
globalAny.KeyboardEvent = window.KeyboardEvent;