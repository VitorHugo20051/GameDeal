import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container main-content animate-in">
        {children}
      </main>
    </>
  );
}
