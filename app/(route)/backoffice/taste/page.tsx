import { getFoodType, getTastes } from '@/actions/food-action'
import AddTasteBtn from '@/app/(route)/backoffice/components/button/taste/AddTasteBtn'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EditTasteBtn from '../components/button/taste/EditTasteBtn'
import RemoveTasteBtn from '../components/button/taste/RemoveTasteBtn'

export const revalidate = 0

export default async function TastePage() {

    const { foodType } = await getFoodType()
    const { tastes } = await getTastes()

    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>รสชาติอาหาร</h2>

                <div>
                    <AddTasteBtn foodType={foodType ?? []} />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/4'>ไอดี</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tastes?.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.FoodType.name}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.remark || '-'}</TableCell>
                                <TableCell className='text-start'>
                                    {item.status === 'active' && (
                                        <div className='w-6 h-6 bg-green-500 rounded-full' />
                                    )}
                                </TableCell>
                                <TableCell className='flex gap-2'>
                                    <EditTasteBtn tastes={item} foodType={foodType ?? []} />
                                    <RemoveTasteBtn id={item.id} />
                                </TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}