import jsdom from 'jsdom';
import { Image } from './domMocks';

const { window } = new jsdom.JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
});
const globalAny: any = global;

globalAny.window = window;
globalAny.document = window.document;
globalAny.KeyboardEvent = window.KeyboardEvent;
globalAny.Image = Image;