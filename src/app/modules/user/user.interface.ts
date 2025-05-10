export type TUserRole = 'admin' | 'trainer' | 'trainee';

export type TUser = {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  address: string;
  role: TUserRole;
};
