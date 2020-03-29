import { toEpoch } from '../src/client/js/toEpoch'
describe(toEpoch,()=> {
    test("it should return the calendar time to epoch time",()=> {
        expect(toEpoch('2020-03-31')).toBe(1585612800);
    })
})