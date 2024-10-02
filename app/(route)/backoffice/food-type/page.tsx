import { getFoodType } from '@/actions/food-action'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import RemoveFoodTypeBtn from '@/app/(route)/backoffice/components/button/RemoveFoodTypeBtn'
import EditFoodTypeBtn from '@/app/(route)/backoffice/components/button/EditFoodTypeBtn'
import AddFoodTypeBtn from '../components/button/AddFoodTypeBtn'


export default async function FoodTypePage() {

    const { foodType } = await getFoodType()

    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>ประเภทอาหาร/เครื่องดื่ม</h2>

                <div>
                    <AddFoodTypeBtn />
                </div>
            </div>

            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/4'>ไอดี</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {foodType?.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.remark || '-'}</TableCell>
                            <TableCell className='text-start'>
                                {item.status === 'active' && (
                                    <div className='w-6 h-6 bg-green-500 rounded-full' />
                                )}
                            </TableCell>
                            <TableCell className='flex gap-2'>
                                <EditFoodTypeBtn foodType={item} />
                                <RemoveFoodTypeBtn id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>


        </div>
    )
}