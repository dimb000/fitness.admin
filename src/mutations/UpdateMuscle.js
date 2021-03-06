import {
  commitMutation,
  graphql,
} from 'react-relay';

import Environment from '../Environment';

const mutation = graphql`
  mutation UpdateMuscleMutation ($input: UpdateMuscleInput!) {
    updateMuscle(input: $input) {
      updatedMuscleEdge {
        cursor
        node {
          id
          name
          group
        }
      }
    }
  }
`;

const UpdateMuscleMutation = (id, data) => {
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
        if (errors && errors.length) {
          reject(errors);
        } else {
          resolve(response);
        }
      },
      onError: err => reject(err),
    });
  });
};

export default UpdateMuscleMutation;
