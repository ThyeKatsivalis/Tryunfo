import React from 'react';
import Proptypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.props;
    return (
      <div>
        <h1 data-testid="name-card">{ cardName }</h1>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <h2 data-testid="description-card">{ cardDescription }</h2>
        <h2 data-testid="attr1-card">{ cardAttr1 }</h2>
        <h2 data-testid="attr2-card">{ cardAttr2 }</h2>
        <h2 data-testid="attr3-card">{ cardAttr3 }</h2>
        <h2 data-testid="rare-card">{ cardRare }</h2>
        { cardTrunfo === true ? <h2 data-testid="trunfo-card">Super Trunfo</h2> : ''}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: Proptypes.string,
  cardDescription: Proptypes.string,
  cardAttr1: Proptypes.string,
  cardAttr2: Proptypes.string,
  cardAttr3: Proptypes.string,
  cardImage: Proptypes.string,
  cardRare: Proptypes.string,
  cardTrunfo: Proptypes.bool,
}.isRequired;

export default Card;
