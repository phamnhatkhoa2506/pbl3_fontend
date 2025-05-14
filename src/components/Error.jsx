export default function Error({ error}) {
    return (
        <>
            <div className="alert alert-danger d-flex align-items-center gap-2 m-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-4"></i>
                Đã xảy ra lỗi khi tải danh mục sản phẩm. Vui lòng thử lại sau!
                <div className="d-flex flex-column">
                    <small className="text-muted">{error}</small>
                </div>
            </div>
        </>
    )
}