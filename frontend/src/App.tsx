import Header from './components/Header';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <ChatPage />
      </main>
    </div>
  );
}