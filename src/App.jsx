import './App.css'

import WeatherData from "./components/WeatherData";

function App() {
  return (
    <>
      <div className="bg-slate-600">
        <div className="w-full max-w-screen-lg  h-screen mx-auto">
          <WeatherData />
        </div>
      </div>
    </>
  )
}

export default App
