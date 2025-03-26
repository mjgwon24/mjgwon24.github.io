const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-1">
                    <h3 className="sm:text-[16px] text-sm weight-600 text-white">MJGWON24</h3>
                    <p className="sm:text-[14px] text-xs text-gray-500">
                        &copy; {currentYear} mjgwon24. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;