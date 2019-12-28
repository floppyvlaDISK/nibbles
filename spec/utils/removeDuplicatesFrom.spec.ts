import removeDuplicatesFrom from '../../src/utils/removeDuplicatesFrom';

describe('removeDuplicatesFrom()', () => {
  const testCases = [
    {
      anArray: [] as Array<any>,
      expectedResult: [] as Array<any>,
    },
    {
      anArray: [
        '1', '2', '3', '3', '3',
      ],
      expectedResult: [
        '1', '2', '3',
      ]
    },
  ];
  testCases.forEach(t => it('remove duplicate values', () => {
    expect(removeDuplicatesFrom(t.anArray)).toEqual(t.expectedResult);
  }));

  it('does not mutate input', () => {
    const input = ['1', '2', '3'];
    const output = removeDuplicatesFrom(input);

    expect(input === output).toBeFalse();
  });
});