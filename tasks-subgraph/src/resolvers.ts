import { TasksApi, type Task } from './dummy-data/api';

export const resolvers = {
  Query: {
    getTasks: (
      _: unknown,
      { limit }: { limit?: number },
      { dataSources }: { dataSources: { tasksApi: TasksApi } },
    ) => {
      return dataSources.tasksApi.getTasks(limit);
    },

    getTaskById: (
      _: unknown,
      { id }: { id: string },
      { dataSources }: { dataSources: { tasksApi: TasksApi } },
    ) => {
      return dataSources.tasksApi.getTaskById(id);
    },
  },
  Mutation: {},
  Task: {
    user: (task: Task) => {
      return {
        id: task.userId,
      };
    },
  },

  User: {
    // first parameter a parent object in this case User from which we are extracting the id
    tasks: (
      { id }: { id: string },
      _: unknown,
      { dataSources }: { dataSources: { tasksApi: TasksApi } },
    ) => {
      return dataSources.tasksApi.getTasksByUserId(id);
    },
  },
};
