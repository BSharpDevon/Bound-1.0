import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
    // Clear member ID from localStorage
    localStorage.removeItem('memberId');

    // Redirect to login or home page
    navigate('/');
};

return (
    <div>
        <button onClick={handleLogout} className="logout-button">
            LOG OUT
        </button>
    </div>
    );
}

export default Logout;