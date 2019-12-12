import PubSub from '../../src/utils/PubSub';

describe('PubSub', () => {
  it('adds listeners via subscribe() and calls them on publish()', () => {
    const aPubSub = new PubSub();
    const eventAListenerSpy = jasmine.createSpy();
    const eventBListenerSpy = jasmine.createSpy();

    aPubSub.subscribe('eventA', eventAListenerSpy);
    aPubSub.subscribe('eventB', eventBListenerSpy);

    aPubSub.publish('eventA', 'argA1', 'argA2', 'argA3');

    expect(eventAListenerSpy).toHaveBeenCalledTimes(1);
    expect(eventBListenerSpy).toHaveBeenCalledTimes(0);
    expect(eventAListenerSpy).toHaveBeenCalledWith('argA1', 'argA2', 'argA3')

    aPubSub.publish('eventB', 'argB1', 'argB2', 'argB3');

    expect(eventAListenerSpy).toHaveBeenCalledTimes(1);
    expect(eventBListenerSpy).toHaveBeenCalledTimes(1);
    expect(eventBListenerSpy).toHaveBeenCalledWith('argB1', 'argB2', 'argB3');
  });
});