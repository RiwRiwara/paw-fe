import Image from "next/image"

function BottomBar() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-primary-red text-white py-8" >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/images/giveapaw2.png"
                                    alt="logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl">Give a Paw</span>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:underline">Home</a>
                            <a href="#" className="hover:underline">Adoption</a>
                            <a href="#" className="hover:underline">Campaigns</a>
                            <a href="#" className="hover:underline">About Us</a>
                        </div>
                        <div className="text-sm">© 2025 Give a Paw. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default BottomBar