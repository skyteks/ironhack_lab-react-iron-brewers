import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beersJSON from "./../assets/beers.json";
import axios from "axios";


function RandomBeersPage() {
  // Mock initial state, to be replaced by data from the Beers API. Store the beer info retrieved from the Beers API in this state variable.
  const [randomBeer, setRandomBeer] = useState(beersJSON[0]);

  // React Router hook for navigation. We use it for the back button. You can leave this as it is.
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const url = "https://ih-beers-api2.herokuapp.com/beers/random";
    return axios.get(url)
      .then((result) => {
        console.log("Result:", result);
        setRandomBeer(result.data);
      }).catch((error) => {
        console.log("Error:", error);
      });
  }

  // The logic and the structure for the page showing the random beer. You can leave this as it is.
  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <h2>Random Beer</h2>

      {randomBeer && (
        <>
          <img
            src={randomBeer.image_url}
            alt="beer"
            height="300px"
            width="auto"
          />
          <h3>{randomBeer.name}</h3>
          <p>{randomBeer.tagline}</p>
          <p>Attenuation level: {randomBeer.attenuation_level}</p>
          <p>Description: {randomBeer.description}</p>
          <p>Created by: {randomBeer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default RandomBeersPage;
