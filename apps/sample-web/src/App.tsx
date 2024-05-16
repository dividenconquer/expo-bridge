import { useState } from "react";
import "./App.css";
import { useCoreNavigation, useParams } from "@seoulcomix/core-navigation";
import { useCoreWebviewContext } from "@seoulcomix/core-web";

function App() {
  const [count, setCount] = useState(0);
  const params = useParams();
  const { event } = useCoreWebviewContext();
  const { push, pop } = useCoreNavigation();

  // const [events, setEvents] = useState<unknown[]>([]);
  // useCoreBridgeListener(event, (data: unknown) => {
  //   setEvents((e) => [...e, data]);
  // });

  return (
    <div
      className="safe-area-inset-container-sample"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <h1>RNWV Base Web Sample</h1>
      {/* {events.map((event) => (
        <div>{JSON.stringify(event)}</div>
      ))} */}
      <button
        onClick={() => {
          event
            .runOnNative("getOS")
            .then((res) => alert(JSON.stringify(res)))
            .catch((err) => console.error("error: ", err));
        }}
      >
        run roundtrip between native
      </button>
      {/* <button
        onClick={() => {
          event.emitEvent("from webview!");
        }}
      >
        emit event
      </button> */}
      <div
        className="card"
        style={{
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>{JSON.parse(params)}</div>
        <button
          onClick={() => push("/sample-native-screen", { isNative: true })}
        >
          push react-native screen
        </button>
        <button onClick={() => push("/sample-webview-screen")}>
          push webview screen
        </button>
        <button
          onClick={() =>
            push("/", {
              params: {
                hello: "world",
                time: new Date().toISOString(),
              },
            })
          }
        >
          push webview screen with params
        </button>
        <button onClick={() => pop()}>pop</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
