import { add, multiply } from './app.js';
//import { formatCurrency } from './Scripts/utils/money.js';

describe("Math Functions", () => {
  it("should add two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
  
  it("should multiply two numbers correctly", () => {
    expect(multiply(4, 5)).toBe(20);
  });
  
  /*it('should format price', () => {
    expect(formatCurrency(2095)).toBe(20.95);
  });*/
});

/*describe('format currency function', () => {
  
});*/