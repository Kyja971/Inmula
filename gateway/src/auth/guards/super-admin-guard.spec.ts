import { AdminOrSuperAdminGuard } from './admin-super-admin.guard';

describe('SuperAdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminOrSuperAdminGuard()).toBeDefined();
  });
});
