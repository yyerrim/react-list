import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const Threat = (props) => {
  return (
    <ul>
      {
        props.threats.map(v => <li key={v.id}>{v.description} / {v.locationName}</li>)
      }
    </ul>
  );
};

function App() {
  const [threats, setThreats] = useState([]);

  useEffect(() => { // 처음 컴포넌트 만들어질때 딱 한번만 동작
    async function get() {
      const url = "https://api.terrorless.01ab.net/trpc/threat.list?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D";
      const res = await fetch(url);
      const data = await res.json();
      setThreats(data[0].result.data.json.threats);
    }
    get();
  }, []);

  return (
    <div className="App">
      {
        threats.length > 0 && <Threat threats={threats} />
      }
    </div>
  );
}

export default App;
