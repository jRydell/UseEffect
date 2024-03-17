import { useEffect, useState } from "react";

type SWPerson = {
  name: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  films: [];
  homeworld: string;
  terrain: string;
  climate: string;
  species: string;
  language: string;
};

const Person = () => {
  //const [name, setName] = useState("");
  const [person, setPerson] = useState({} as SWPerson);

  useEffect(() => {
    const url = "https://swapi.py4e.com/api/people/1/";

    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();

      const homeworldResponse = await fetch(data.homeworld);
      const homeworldData = await homeworldResponse.json();

      const speciesResponse = await fetch(data.species);
      const speciesData = await speciesResponse.json();

      if (!ignore) {
        setPerson({
          name: data.name,
          eye_color: data.eye_color,
          birth_year: data.birth_year,
          gender: data.gender,
          skin_color: data.skin_color,
          hair_color: data.hair_color,
          films: data.films.length,
          homeworld: homeworldData.name,
          terrain: homeworldData.terrain,
          climate: homeworldData.climate,
          species: speciesData.name,
          language: speciesData.name,
        });
      }
    };

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      {person
        ? `Name: ${person.name}, 
        Eyes: ${person.eye_color}, 
        Birth year: ${person.birth_year} 
        Gender: ${person.gender} 
        Skin color: ${person.skin_color}
        Hair color: ${person.hair_color}
        Films: ${person.films}
        Homeworld: ${person.homeworld}
        Terrain: ${person.terrain}
        Climate: ${person.climate}
        Species: ${person.species}
        Species: ${person.language}
        
        `
        : "Loading..."}
    </div>
  );
};

export default Person;
