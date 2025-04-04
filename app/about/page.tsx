export default function About() {
    return (
        <div className="relative min-h-screen pt-28 py-24">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(131.64% 50.74% at 97.42% 14.64%, rgba(73, 149, 236, 0.30) 0%, rgba(41, 85, 134, 0.00) 70%)"
                }}
            />
            <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20 flex flex-col items-center">
                <div className="flex flex-col items-center mb-12 sm:mb-20 text-center">
                    <h1 className="text-3xl sm:text-4xl weight-600 sm:weight-700 mb-4">
                        ✨ About Me
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                        풀스택 개발자 권민지입니다! 저를 소개해드릴게요.
                    </p>
                </div>
            </div>
        </div>
    );
}