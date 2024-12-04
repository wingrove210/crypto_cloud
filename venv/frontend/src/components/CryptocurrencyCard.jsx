import { Card } from 'antd';
import PropTypes from "prop-types";
function CryptocurrencyCard({ currency }) {
    if (!currency) {
      return <p>Загрузка данных...</p>;
    }
    const { id, name, quote} = currency;
  
    return (
      <Card
        title={
          <div className="flex items-center">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
              alt={`${name} logo`}
              style={{ marginRight: 8 }}
            />
            <span>{name}</span>
          </div>
        }
        style={{ width: 400 }}
      >
        <p>
          <strong>Текущая цена:</strong> ${quote.USD.price.toFixed(2)}
        </p>
        <p>
          <strong>Объем за 24ч:</strong> ${quote.USD.volume_24h.toFixed(2)}
        </p>
      </Card>
    );
  }
  
  // Валидация пропсов
  CryptocurrencyCard.propTypes = {
    currency: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quote: PropTypes.shape({
        USD: PropTypes.shape({
          price: PropTypes.number.isRequired,
          volume_24h: PropTypes.number.isRequired,
          market_cap: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
      max_supply: PropTypes.number,
      circulating_supply: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired, // Ожидаем, что каждый элемент будет объектом с полем `name`
        })
      ).isRequired,
    }).isRequired,
  };
 export default CryptocurrencyCard