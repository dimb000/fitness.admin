import { graphql } from 'react-relay';

export default graphql`
  query ManageFoodsQuery (
    $sort: String,
  ) {
    viewer {
      ...ManageFoods_viewer
      @arguments(
        sort: $sort
      )
    }
  }
`;