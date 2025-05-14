export default function LoadingSpinner({message = "Đang tải nội dung..."}) {
    return (
        <>
            <div className="loading-overlay d-flex flex-column justify-content-center align-items-center w-100 h-100 position-fixed top-0 start-0 bg-light" style={{ zIndex: 9999 }}>
                <div className={`spinner-border`} style={{ width: '3rem', height: '3rem' , color: 'green'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className={`mt-3 fw-bold`}>{message}</p>
            </div>
        </>
    )
}