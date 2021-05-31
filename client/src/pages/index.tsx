import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <div className="glass-card-container">
        <h1 className="card-title">Stay Special</h1>
        <div className="card-grid">
          <p className="card-subtitle">
            Not a bully, But a
            <span className="highlight"> Friend</span>
          </p>
          <div className="button-group">
            <Button
              link="/about"
              label="Learn more about us"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <Button
              link="/posts"
              label="Check out our journey"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

const Button: React.FC<{
  link: string;
  label: string;
  icon?: React.ReactNode
}> = ({ link, label, icon }) => {
  return (
    <Link href={link}>
      <button className="cta-btn-yellow">
        {label}
        <span>
          {icon && icon}
        </span>
      </button>
    </Link>
  )
}

export default Home;
