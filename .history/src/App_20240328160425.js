import './App.css';
import BasePage from './components/basepage/basepage';
import StartingPage from './components/startingpage/startingpage';
import CreateWallet from './components/createwallet/createwallet';

function App() {
  return (
    <div className="App">
      {/* uncomment these to see what each page looks like, we will implement routing across all pages, soon enough */}
      <BasePage/>
      {/* <StartingPage/> */}
      {/* <CreateWallet /> */}
    </div>
  );
}

export default App;
