import './App.css'
import CacheInspector from './components/CacheInspector/CacheInspector'
import LiveMetrics from './components/LiveMetrics/LiveMetrics'
import RequestLog from './components/RequestLog/RequestLog'
import SessionToken from './components/SessionToken/SessionToken'


function App() {
 

  return (
    <div className="px-8 ">
      <h1 className="text-[32px] my-6">Cache Inspector Dashboard</h1>

      <main className="flex flex-col gap-9 mb-6">
        <SessionToken />
        <LiveMetrics />
        <CacheInspector />
        <RequestLog />
      </main>
</div>
  )
}

export default App
