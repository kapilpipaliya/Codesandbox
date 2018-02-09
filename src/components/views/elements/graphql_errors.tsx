import * as React from 'react';

export function graphqlErrors(is_error) {
  return(
    is_error ? (
      <div>
        {error.message}
        {error
          .graphQLErrors.map(e => e.message)
           .join(",")
           .toString()
          }
        {error.networkError.message}
      </div>
    ) : null
  )
}