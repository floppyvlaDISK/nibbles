import jsdom from 'jsdom';
import Jasmine from 'jasmine';

const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>');

global.window = window;
global.document = window.document;
global.KeyboardEvent = window.KeyboardEvent;

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();