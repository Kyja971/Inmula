import { Company } from './company.type';

describe('Company', () => {
  it('should be defined', () => {
    expect(new Company()).toBeDefined();
  });
});
