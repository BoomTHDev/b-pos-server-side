import { getFoodType, getFoods } from "@/actions/food-action";
import AddFoodBtn from "../components/button/food/AddFoodBtn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'

export const revalidate = 0

export default async function FoodPage() {

    const [foodTypeResult, foodsResult] = await Promise.all([getFoodType(), getFoods()])

    const { foodType } = foodTypeResult
    const { foods } = foodsResult

    const getFoodTypeName = (type: string) => {
        if (type === 'food') {
            return 'อาหาร'
        } else if (type === 'water') {
            return 'เครื่องดื่ม'
        }
    }

    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>อาหาร</h2>

                <div>
                    <AddFoodBtn foodType={foodType ?? []} />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/4'>ภาพ</TableHead>
                        <TableHead>ชนิด</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                        <TableHead>ราคา</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {foods?.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Image
                                        alt=''
                                        src={item.image}
                                        width={200}
                                        height={200}
                                    />
                                </TableCell>
                                <TableCell>{getFoodTypeName(item.foodType)}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.FoodType.name}</TableCell>
                                <TableCell>{item.remark}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell className='text-start'>
                                    {item.status === 'active' && (
                                        <div className='w-6 h-6 bg-green-500 rounded-full' />
                                    )}
                                </TableCell>
                                <TableCell className='flex gap-2'>
                                    {/* <EditTasteBtn tastes={item} foodType={foodType ?? []} />
                                    <RemoveTasteBtn id={item.id} /> */}
                                </TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}