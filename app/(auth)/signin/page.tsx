import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import FormSignIn from './components/FormSignIn'

export default function SignInPage() {
    return (
        <div className='flex flex-col justify-center items-center gap-5 min-h-screen bg-gray-900'>
            <CardTitle className='text-3xl font-bold text-center'>Admin Management B-POS</CardTitle>
            <Card className='w-full max-w-md bg-gray-800 border-gray-700'>
                <CardHeader className='space-y-1'>
                    <CardDescription className='text-center text-gray-300'>Sign in to admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormSignIn />
                </CardContent>
            </Card>
        </div>
    )
}