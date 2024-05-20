import "./App.css";
import { Banner, StorageSection } from "@expo-bridge/sample-ui";

function App() {
  return (
    <div
      className="safe-area-inset-container-sample"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        gap: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Banner from="webview" />
      <StorageSection />
      {/* <h1>RNWV Base Web Sample</h1> */}

      {/* {events.map((event) => (
        <div>{JSON.stringify(event)}</div>
      ))} */}

      {/* <button
        onClick={async () => {
          await setJSON("test", { test: "test-wv" });
          alert(JSON.stringify(await getJSON("test")));
        }}
      >
        set json
      </button>
      <button
        onClick={async () => {
          alert(JSON.stringify(await getJSON("test")));
        }}
      >
        get json
      </button>
      <button
        onClick={() => {
          bridge
            .runOnNative("getOS")
            .then((res) => alert(JSON.stringify(res)))
            .catch((err) => console.error("error: ", err));
        }}
      >
        run roundtrip between native
      </button> */}
      {/* <button
        onClick={() => {
          event.emitEvent("from webview!");
        }}
      >
        emit event
      </button> */}
      {/* <div
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
      </div> */}
    </div>
  );
}

export default App;
