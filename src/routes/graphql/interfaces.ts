import { PrismaClient, Profile, User } from "@prisma/client";

export interface IContext {
  prisma: PrismaClient
}

export interface ISource {
  [key: string]: unknown;
}

export interface ICreateUserData {
  dto: Omit<User, 'id'>;
}

export interface IChangeUserData {
  id: string;
  dto: Omit<User, 'id'>;
};

export interface ISubscribeToData {
  userId: string;
  authorId: string;
}

export interface ICreateProfileData {
  dto: Omit<Profile, 'id'>;
}

export interface IChangeProfileData {
  id: string;
  dto: Omit<Profile, 'id'>;
};