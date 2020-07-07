/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomDesign = /* GraphQL */ `
  query GetCustomDesign($id: ID!) {
    getCustomDesign(id: $id) {
      id
      owner
      image {
        bucket
        region
        key
        uri
      }
      scale
      points
      svg
      createdAt
      updatedAt
    }
  }
`;
export const listCustomDesigns = /* GraphQL */ `
  query ListCustomDesigns(
    $filter: ModelCustomDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomDesigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        image {
          bucket
          region
          key
          uri
        }
        scale
        points
        svg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
