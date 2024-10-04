'use client'

import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SubmitFormBtn() {

    const { pending } = useFormStatus()

    return (
        <Button type='submit' className='flex items-center gap-1' disabled={pending}>
            <Save size={16} />
            {pending ? 'กำลังบันทึก...' : 'บันทึก'}
        </Button>
    )
}