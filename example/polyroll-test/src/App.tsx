import { DiceD6 } from 'my-ggott-polyroll';
import SampleDiceD6 from './SampleDiceD6'
import DiceWithPhysics from './components/DiceWithPhysics.tsx';

function App() {
  return (
    <div>
      <h1>🎲 My Ggott Dice</h1>
      <DiceD6 />
      <SampleDiceD6/>
      <DiceWithPhysics />
    </div>
  );
}

export default App;
