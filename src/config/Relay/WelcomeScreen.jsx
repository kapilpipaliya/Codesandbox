import * as React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from 'config/Relay/RelayEnvironment';


const query = graphql`
query WelcomeScreenQuery {
  pokemon(name: "Pikachu") {
    name
    weight {
      minimum
      maximum
    }
  }
}  
`

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const { pokemon } = props;
            return <div>{pokemon.name} - {pokemon.weight && pokemon.weight.minimum}
              - {pokemon.weight && pokemon.weight.minimum}</div>;
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}