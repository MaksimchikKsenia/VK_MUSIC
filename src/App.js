import { View, Panel, Div } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import PlayerComponent from "./Player/player";

function App() {
  return (
    <View id="view" activePanel="panel">
      <Panel id="panel">
        <PlayerComponent />
      </Panel>
    </View>
  );
}

export default App;
