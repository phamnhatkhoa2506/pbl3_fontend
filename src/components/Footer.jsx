const Footer = () => {
    return (
        <footer className="hidden bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-6"
            style={{ backgroundColor: 'rgb(230, 240, 240)'}}>
            <div className="text-start text-muted container mx-auto">
                <p className="text-sm md:text-base">&copy; 2025 Supermarket. All rights reserved.</p>
                <div className="d-flex flex-column flex-wrap justify-content-center gap-6 mt-4 text-sm">
                    <span>Số điện thoại: 0987655384</span>
                    <span>Email: mizuneko2311@gmail.com</span>
                    <span>Địa chỉ: 82/28/18 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, TP Đà Nẵng</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
