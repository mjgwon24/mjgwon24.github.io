const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-lg weight-700 text-white">MJGWON24</h3>
                    <p className="text-gray-500">
                        &copy; {currentYear} mjgwon24. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;