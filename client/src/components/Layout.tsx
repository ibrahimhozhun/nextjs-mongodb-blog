import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="root">
        {children}
      </div>
    </>
  )
}

export default Layout;
