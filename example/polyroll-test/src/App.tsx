import { DiceD6 } from 'my-ggott-polyroll';
import SampleDiceD6 from './SampleDiceD6'
import DiceWithPhysics from './components/DiceWithPhysics.tsx';
// import './styles/gui.css';

function App() {
  return (
    <div>
      <h1>🎲 My Ggott Dice</h1>
      <DiceD6 />
      <SampleDiceD6 />

      <div style={{ position: 'relative' }}>
        <DiceWithPhysics />
        <div id="gui-container" />
      </div>
    </div>
  );
}

export default App;
