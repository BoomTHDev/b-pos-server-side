import Sidebar from './components/sidebar/Sidebar'
import ContentWrapper from './components/content-warp/Layout'
import { headers } from 'next/headers'
import { ToastContainer } from 'react-toastify'

type BackofficeLayoutProps = {
    children: React.ReactNode
}

export default function BackofficeLayout({ children }: BackofficeLayoutProps) {

    const username = headers().get('x-user-username') as string
    const role = headers().get('x-user-role') as string

    return (
        <div className='flex min-h-screen'>
            <Sidebar title='B-POS' username={username} role={role} />
            <ContentWrapper>{children}</ContentWrapper>
            <ToastContainer />
        </div>
    )
}