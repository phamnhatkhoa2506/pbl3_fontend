import '../styles/pages/500Page.css'; // Import the CSS file for styling

const Page500 = () => {
    return (
        <div className="page500-container d-flex flex-column">
            <h1 className="page500-title">500</h1>
            <p className="page500-message">Sorry, error has existed.</p>
            <a href='/' aria-label="Back Home">
                <button className="page500-button">Back Home</button>
            </a>
        </div>
    );
}

export default Page500