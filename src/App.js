import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.saveButtonFunc = this.saveButtonFunc.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      cardSaved: [],
      filterCardName: '',
      filterRare: 'todas',
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  checkedTrunfo = () => {
    const {
      cardSaved,
    } = this.state;
    const checkverification = cardSaved.some((card) => card.cardTrunfo);
    return checkverification;
  };

  removeCard = (cardName) => {
    const { cardSaved } = this.state;
    const removedCards = cardSaved.filter((card) => card
      .cardName !== cardName); this.setState({ cardSaved: removedCards });
  };

  isSaveButtonDisabled() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    const number90 = 90;
    const number210 = 210;

    return !(cardName.length !== 0
        && cardImage.length !== 0
        && cardDescription.length !== 0
        && Number(cardAttr1) <= number90
        && Number(cardAttr1) >= 0
        && Number(cardAttr2) <= number90
        && Number(cardAttr2) >= 0
        && Number(cardAttr3) <= number90
        && Number(cardAttr3) >= 0
        && (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)) <= number210);
  }

  saveButtonFunc() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    this.setState((prevState) => ({
      cardSaved: [
        ...prevState.cardSaved,
        {
          cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo,
        }],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    }));
  }

  render() {
    const {
      cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, cardSaved, filterCardName,
      filterRare,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <main>
          <Form
            cardName={ cardName }
            onInputChange={ this.handleChange }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isSaveButtonDisabled={ this.isSaveButtonDisabled() }
            onSaveButtonClick={ this.saveButtonFunc }
            hasTrunfo={ this.checkedTrunfo() }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
          <label htmlFor="filter-card">
            Buscar por Nome
            <input
              name="filterCardName"
              type="text"
              data-testid="name-filter"
              id="filter-card"
              value={ filterCardName }
              onChange={ this.handleChange }
              placeholder="Digite o nome"
            />
          </label>
          <label htmlFor="rarity-filter">
            Buscar por raridade
            <select
              name="filterRare"
              data-testid="rare-filter"
              value={ filterRare }
              onChange={ this.handleChange }
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          { cardSaved
            .filter((card) => {
              if (filterRare === 'todas') return card;
              return card.cardRare === filterRare;
            })
            .filter((card) => card.cardName.includes(filterCardName))
            .map((card, index) => (
              <div key={ index }>
                <Card
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ () => this.removeCard(card.cardName) }
                >
                  Excluir

                </button>
              </div>))}

        </main>
      </div>
    );
  }
}

export default App;
