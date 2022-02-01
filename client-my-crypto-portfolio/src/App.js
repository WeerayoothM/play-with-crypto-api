import "./css/App.css";
import "./css/coin.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin.jsx";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState("");
  const fetchCoinList = async () => {
    try {
      const res =
        await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&
      order=market_cap_desc&per_page=100&page=1&sparkline=false`);
      setCoinList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCoinList();
    let timer = setInterval(() => {
      fetchCoinList();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coinList.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="search"
            className="coin-input"
            onChange={handleChange}
            value={search}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
