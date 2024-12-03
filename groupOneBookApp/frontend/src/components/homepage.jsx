import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();  // Hook to handle navigation

  // Function to navigate to "Bind" page
  const goToBindPage = () => {
    navigate('/bind'); // Replace '/bind' with the actual path of the Bind page
  };

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>This is the page you are redirected to after selecting your favourite books.</p>
      <button onClick={goToBindPage}>Go to Bind Page</button> {/* Button to trigger navigation */}
    </div>
  );
}

export default HomePage;