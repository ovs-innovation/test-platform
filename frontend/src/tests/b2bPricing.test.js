import { describe, expect, it } from 'vitest';
import { B2B_PACKAGES, calculateInstitutionalQuote } from '../data/b2bConfig.js';

describe('institutional pricing calculator', () => {
  it.each([
    [50, 10],
    [100, 10],
    [101, 15],
    [200, 15],
    [201, 20],
    [300, 20],
    [301, 25],
    [500, 25],
    [501, 30],
    [1000, 30],
    [1001, 30],
  ])('applies %i-student tier at %i%%', (studentCount, discountPercent) => {
    const quote = calculateInstitutionalQuote('neet-2027-1yr', studentCount);

    expect(quote.discountPercent).toBe(discountPercent);
    expect(quote.discountedPricePerStudent).toBe(2000 * (1 - discountPercent / 100));
    expect(quote.subtotal).toBe(studentCount * quote.discountedPricePerStudent);
  });

  it('uses the requested institute prices for both packages', () => {
    expect(B2B_PACKAGES.map(({ baseRetailPrice }) => baseRetailPrice)).toEqual([2000, 4000]);
    expect(B2B_PACKAGES.map(({ regularPrice }) => regularPrice)).toEqual([2999, 6000]);
    expect(B2B_PACKAGES.map(({ title }) => title)).toEqual([
      'AIETS Package Pricing • One-Year Program',
      'AIETS Package Pricing • Two-Year Program',
    ]);
  });

  it('calculates the total package amount including GST', () => {
    const quote = calculateInstitutionalQuote('neet-2028-2yr', 101);

    expect(quote.discountPercent).toBe(15);
    expect(quote.discountedPricePerStudent).toBe(3400);
    expect(quote.retailPricePerStudent).toBe(6000);
    expect(quote.institutePricePerStudent).toBe(4000);
    expect(quote.retailSubtotal).toBe(606000);
    expect(quote.instituteSubtotal).toBe(404000);
    expect(quote.totalSavings).toBe(262600);
    expect(quote.subtotal).toBe(343400);
    expect(quote.taxAmount).toBe(61812);
    expect(quote.grandTotal).toBe(405212);
  });
});
