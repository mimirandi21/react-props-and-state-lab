import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  onChangeType = (e) => {
    let newType = e.target.value;
    this.setState({
      filters: {
        ...this.state.filters,
        type: newType,
      },
    });
  };

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then((res) => res.json())
        .then((pets) => this.setState({ pets }));
    } else {
      let petType = this.state.filters.type;
      fetch("/api/pets?type=" + petType)
        .then((res) => res.json())
        .then((pets) => this.setState({ pets }));
    }
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
