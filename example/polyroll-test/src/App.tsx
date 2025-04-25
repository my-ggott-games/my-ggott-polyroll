import DiceScene from 'my-ggott-polyroll';
import DiceWithPhysics from './components/DiceWithPhysics.tsx';

function App() {
  return (
    <div>
      <DiceScene
        diceList={[
          { type: 'd6', color: '#ffaa00', materialType: 'resin' },
        ]}
        showSky={true}
      />

      <DiceWithPhysics />
    </div>
  );
}

export default App;
