export type TUserRole = 'admin' | 'trainer' | 'trainee';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
};
