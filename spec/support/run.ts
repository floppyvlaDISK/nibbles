import Jasmine from 'jasmine';

const jasmine = new Jasmine(null);
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();