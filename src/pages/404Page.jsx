import '../styles/pages/404Page.css'; // Importing the CSS file for styling

const Page404 = () => {
    return (
        <div className="page404-container d-flex flex-column">
            <h1 className="page404-title">404</h1>
            <p className="page404-message">Sorry, this page does not exist.</p>
            <a href='/' aria-label="Back Home">
                <button className="page404-button">Back Home</button>
            </a>
        </div>
    );
}

export default Page404;