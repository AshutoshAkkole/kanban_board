import BoardContainer from "./components/boardContainer";
import Header from "./components/header";
import "./css/app.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <BoardContainer />
    </div>
  );
};

export default App;