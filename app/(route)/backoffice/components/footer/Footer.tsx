export default function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-gray-900 text-gray-300 py-4'>
            <div className='px-4'>
                <div className='flex justify-center items-center'>
                    <p className='text-sm'>&copy; {currentYear} B-POS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}