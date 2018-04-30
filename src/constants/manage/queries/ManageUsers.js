import { graphql } from 'react-relay';

export default graphql`
  query ManageUsersQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageUsers_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;