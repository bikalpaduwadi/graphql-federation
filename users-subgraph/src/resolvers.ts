import { UsersApi, type User } from './dummy-data/api';

export const resolvers = {
  Query: {
    getUsers: (
      _: unknown,
      { limit }: { limit?: number },
      { dataSources }: { dataSources: { usersApi: UsersApi } },
    ) => {
      return dataSources.usersApi.getUsers(limit);
    },

    getUserById: (
      _: unknown,
      { id }: { id: string },
      { dataSources }: { dataSources: { usersApi: UsersApi } },
    ) => {
      return dataSources.usersApi.getUserById(id);
    },
  },
  Mutation: {},
  User: {
    __resolveReference: (
      { id }: User,
      { dataSources }: { dataSources: { usersApi: UsersApi } },
    ) => {
      return dataSources.usersApi.getUserById(id);
    },
  },
};
