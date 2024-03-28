import './App.css';
import BasePage from './components/basepage/basepage';
import StartingPage from './components/startingpage/startingpage';
import CreateWallet from './components/createwallet/createwallet';

function App() {
  return (
    <div className="App">
      {/* <BasePage/> */}
      {/* <StartingPage/> */}
      <CreateWallet />
    </div>
  );
}

export default App;
