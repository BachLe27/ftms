export type UserType = {
  id: string;
  userName: string;
  userAvatar: string;
  email: string;
  role: string;
  createdAt: String;
  status: string
}


export type GeneratedStaffResponse = UserType & { skills: string[], password: string, name: string }
