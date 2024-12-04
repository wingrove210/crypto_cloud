import { Menu } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CryptocurrencyCard from "./components/CryptocurrencyCard";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [currencies, setCurrencies] = useState();
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const FetchCryptoCurrencies = () => {
    axios.get("http://127.0.0.1:8000/cryptocurrencies").then((r) => {
      const currencyResponse = r.data;
      // console.log(r.data.map((c)=>{
      //    console.log(c.name)
      // }))
      const menuItems = [
        getItem(
          "Список криптовалют",
          "g1",
          null,
          currencyResponse.map((c) => {
            return { label: c.name, key: c.id };
          }),
          "group"
        ),
      ];
      setCurrencies(menuItems);
    });
  };

  // const fetchCurrency = () => {
  //   axios
  //     .get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`)
  //     .then((r) => {
  //       setCurrencyData(r.data);
  //     });
  // };
  const fetchCurrency = () => {
    axios
      .get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`)
      .then((r) => {
        const currency = r.data[currencyId];  // Получаем данные для конкретной валюты по ее ID (например, "1")
        
        // if (currency) {
        //   const currencyName = currency.name;
        //   const currencyPrice = currency.quote.USD.price;
        //   const marketCap = currency.quote.USD.market_cap;
  
        //   console.log("Currency Name:", currencyName);      // "Bitcoin"
        //   console.log("Currency Price:", currencyPrice);    // 95892.34649034907
        //   console.log("Market Cap:", marketCap);            // 1897764003896.8145
  
          // Обновляем состояние
          setCurrencyData(currency);  // Можно сохранить все данные или только нужные поля
        // } else {
        //   console.error("Данные не найдены для валюты с ID", currencyId);
        // }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  };
  

  useEffect(() => {
    FetchCryptoCurrencies();
  }, []);

  useEffect(() => {
    fetchCurrency()
    // console.log(currencyData)
  }, [currencyId]);

  const onClick = (e) => {
    // console.log("click ", e);
    // setCurrencyId(e.key);
    setCurrencyId(e.key)
    // const currency = fetchCurrency()
    // console.log(currency)
  };

  return (
    <div className="flex">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? (
          <CryptocurrencyCard currency={currencyData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};



export default App;
