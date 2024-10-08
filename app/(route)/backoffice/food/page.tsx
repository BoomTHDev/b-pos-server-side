import { getFoodType, getFoods } from "@/actions/food-action";
import AddFoodBtn from "../components/button/food/AddFoodBtn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import Pagination from "../components/pagination/Pagination";
import Search from "../components/search/Search";
import EditFoodBtn from "../components/button/food/EditFoodBtn";
import RemoveFoodBtn from "../components/button/food/RemoveFoodBtn";

export const revalidate = 0

type FoodPageProps = {
    searchParams: {
        q: string
        page: string
    }
}

export default async function FoodPage({ searchParams }: FoodPageProps) {

    const q = searchParams?.q ?? ''
    const page = searchParams?.page ?? '1'

    const [foodTypeResult, foodsResult] = await Promise.all([getFoodType(q, page), getFoods(q, page)])

    const { foodType } = foodTypeResult
    const { foods, totalFoods } = foodsResult

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

                <div className='flex gap-2 items-center'>
                    <Search placeholder='ค้นหา' />
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
                        <TableHead className='text-center'>สถานะ</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
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
                                    className='object-cover rounded-md'
                                />
                            </TableCell>
                            <TableCell>{getFoodTypeName(item.foodType)}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.FoodType.name}</TableCell>
                            <TableCell>{item.remark}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell className='text-center'>
                                {item.status === 'active' && (
                                    <div className='text-green-600 bg-green-300 px-2 py-1 rounded-xl'>Active</div>
                                )}
                            </TableCell>
                            <TableCell className='space-x-2'>
                                <EditFoodBtn food={item} foodType={foodType ?? []} />
                                <RemoveFoodBtn id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination total={Number(totalFoods)} />
        </div>
    )
}