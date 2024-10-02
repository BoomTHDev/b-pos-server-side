'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LockIcon, UserIcon } from 'lucide-react'
import { signIn } from '@/actions/auth-action'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'

export default function FormSignIn() {

    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const response = await signIn(formData)
        if (response.status === true) {
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: true,
                theme: 'dark'
            })
            setTimeout(() => {
                router.push('/backoffice')
                router.refresh()
            }, 1000)
        } else if (response.status === false) {
            toast.error(response.error, {
                position: 'top-right',
                autoClose: 3000,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
    }

    return (
        <>
            <form
                className='flex flex-col gap-6'
                action={handleSubmit}
            >
                <div className='relative'>
                    <UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={18} />
                    <Input
                        type='text'
                        name='username'
                        placeholder='Username'
                        className='pl-10 bg-gray-700 border-gray-600 text-gray-100'
                    />
                </div>
                <div className='relative'>
                    <LockIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size={18} />
                    <Input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='pl-10 bg-gray-700 border-gray-600 text-gray-100'
                    />
                </div>
                <Button className='w-full'>
                    Sign In
                </Button>
            </form>
            <ToastContainer />
        </>
    )
}