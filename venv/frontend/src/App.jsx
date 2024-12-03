import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import axios from "axios";
import { useEffect } from "react";
const items = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Список криптовалют",
        type: "group",
        children: [
          {
            key: "1",
            label: "Option 1",
          },
          {
            key: "2",
            label: "Option 2",
          },
        ],
      },
    ],
  },
];
const App = () => {
  const FetchCryptoCurrencyes = () =>{
      axios.get('http://127.0.0.1:8000/cryptocurrencies').then(
         r => {
            console.log('r', r)
         }
      )
  }
  useEffect(()=>{
     FetchCryptoCurrencyes()
  }, []);
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
export default App;
