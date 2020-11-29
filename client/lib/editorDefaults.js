export const defaultCollection = JSON.stringify(
  {
    users: [
      {
        name: 'john smith',
      },
    ],
  },
  null,
  4
)

export const defaultQuery = JSON.stringify(
  {
    collection: 'users',
    command: 'find',
    query: {},
  },
  null,
  4
)
