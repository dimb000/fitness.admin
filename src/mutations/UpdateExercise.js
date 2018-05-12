import { 
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

import CATEGORY from '../constants/manage/category';
import CONNECTIONS from '../constants/manage/connections';

const mutation = graphql`
  mutation UpdateExerciseMutation ($input: UpdateExerciseInput!) {
    updateExercise(input: $input) {
      updatedExerciseEdge {
        cursor
        node {
          id
          name
          avatarUrl
          muscles {
            edges {
              node {
                name
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const UpdateExerciseMutation = (id, data, viewer) => {
  const variables = {
    input: {
      id,
      data,
      clientMutationId: '',
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(Environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        resolve(response);
      },
      onError: err => reject(err),
    });
  });
};

export default UpdateExerciseMutation;
