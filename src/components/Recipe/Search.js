import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { SEARCH_RECPIES } from '../../queries';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import SearchItem from './SearchItem';
const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = ({ searchRecipes }) => {
    setSearchResults({ searchRecipes });
    console.log({ searchRecipes });
  };
  return (
    <ApolloConsumer>
      {(client) => {
        return (
          <Query query={SEARCH_RECPIES} variables={{ searchTerm }}>
            {({ data, loading, error }) => {
              console.log(data);
              // if (loading) return <div>Loading</div>;
              if (error) return <div>{error.message}</div>;
              return (
                <div className="container text-center mt-5">
                  <div className="row mb-5">
                    <div className="col-md-6 offset-md-3">
                      <div className="input-group">
                        <input
                          className="pt-1 pb-1"
                          type="search"
                          name="search"
                          id=""
                          autoFocus
                          value={searchTerm}
                          onChange={async (e) => {
                            console.log(e.target.value);
                            e.persist();
                            setSearchTerm(e.target.value);
                            const { data } = await client.query({
                              query: SEARCH_RECPIES,
                              variables: { searchTerm: e.target.value },
                            });
                            handleChange(data);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {!loading && (
                    <ul>
                      {data.searchRecipes.map((recipe) => {
                        return <SearchItem key={recipe._id} recipe={recipe} />;
                      })}
                    </ul>
                  )}
                </div>
              );
            }}
          </Query>
        );
      }}
    </ApolloConsumer>
  );
};

export default Search;
