import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8000/search?searchTerm=${searchTerm}`;

    setLoading(true);

    try {
      const { data } = await axios.get(url);
      setRecipes(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
      setError("Oops");
    }
  };

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <form className="form-inline" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Search by ingredient"
          onChange={onChange}
          value={searchTerm}
        />
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
      </form>
      {loading ? <h1>Loading...</h1> : null}
      {error ? <h1>{error}</h1> : null}
      {!loading && !error ? (
        <div>
          <h1>Results</h1>
          {recipes.map((recipe, index) => {
            return (
              <div class="card" style={{ width: "18rem" }} key={index}>
                <img
                  src={recipe.thumbnail}
                  class="card-img-top"
                  alt={recipe.title}
                />
                <div class="card-body">
                  <h5 class="card-title">{recipe.title}</h5>
                  <p class="card-text">{recipe.ingredients.join(" | ")}</p>
                  <a
                    href={recipe.href}
                    class="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to recipe
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SearchForm;
