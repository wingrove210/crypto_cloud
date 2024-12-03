import { Card } from 'antd';
function CryptocurrencyCard() {

    return (
      <>
        <Card
          title={
            <div className='flex items-center'>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" />
              <span>Bitcoin</span>
            </div>
          }
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </>
    );
  }
  
  export default CryptocurrencyCard
  