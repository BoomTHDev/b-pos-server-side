'use client'

import { signOut } from '@/actions/auth-action'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'react-toastify'
import { AlertCircle } from 'lucide-react'

export default function SignOutBtn() {
    const [isPending, startTransition] = useTransition()

    const handleSignOut = () => {
        toast(({ closeToast }) => (
            <div className='flex flex-col items-center justify-center gap-4 p-4'>
                <AlertCircle
                    size={30}
                    className="text-red-500 inline-block"
                />
                <h1 className='text-xl'>ยืนยันการออกจากระบบ</h1>
                <div className='flex items-center gap-2'>
                    <Button onClick={closeToast} variant={'secondary'}>ยกเลิก</Button>
                    <Button onClick={() => startTransition(() => signOut())} variant={'destructive'}>ยืนยัน</Button>
                </div>
            </div>
        ), {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark',
            className: 'border-2 border-gray-800 rounded-lg'
        }
        )
    }

    return (
        <Button
            disabled={isPending}
            onClick={handleSignOut}
            variant="outline"
            className="p-6 bg-transparent hover:bg-gray-800 border-none rounded-none text-sm text-red-500 hover:text-red-600"
        >
            {isPending ? 'Logout...' : 'Logout'}
        </Button>
    )
}