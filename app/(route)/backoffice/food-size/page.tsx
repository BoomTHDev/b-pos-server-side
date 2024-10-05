import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddFoodSizeBtn from "../components/button/foodsize/AddFoodSizeBtn";
import { getFoodSize, getFoodType } from "@/actions/food-action";
import RemoveFoodSizeBtn from "../components/button/foodsize/RemoveFoodSizeBtn";
import EditFoodSizeBtn from "../components/button/foodsize/EditFoodSizeBtn";
import Pagination from "../components/pagination/Pagination";
import Search from "../components/search/Search";

export const revalidate = 0

type FoodSizePageProps = {
    searchParams: {
        q: string
        page: string
    }
}

export default async function FoodSizePage({ searchParams }: FoodSizePageProps) {

    const q = searchParams?.q ?? ''
    const page = searchParams?.page ?? '1'

    const [foodTypeResult, foodSizeResult] = await Promise.all([getFoodType(q, page), getFoodSize(q, page)])

    const { foodType } = foodTypeResult
    const { foodSize, totalFoodSize } = foodSizeResult


    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>ขนาดอาหาร</h2>

                <div className='flex items-center gap-2'>
                    <Search placeholder='ค้นหา' />
                    <AddFoodSizeBtn foodType={foodType ?? []} />
                </div>
            </div>

            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/4'>ไอดี</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>ชื่อ</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                        <TableHead>คิดเงินเพิ่ม</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {foodSize?.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.FoodType.name}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.remark || '-'}</TableCell>
                            <TableCell className=''>{item.moneyAdded}</TableCell>
                            <TableCell className='text-center'>
                                {item.status === 'active' && (
                                    <div className='text-green-600 bg-green-300 px-2 py-1 w-3/4 rounded-xl'>Active</div>
                                )}
                            </TableCell>
                            <TableCell className='space-x-2 text-center'>
                                <EditFoodSizeBtn foodSize={item} foodType={foodType ?? []} />
                                <RemoveFoodSizeBtn id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            <Pagination total={Number(totalFoodSize)} />
        </div>
    )
}