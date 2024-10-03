import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddFoodSizeBtn from "../components/button/foodsize/AddFoodSizeBtn";
import { getFoodSize, getFoodType } from "@/actions/food-action";
import RemoveFoodSizeBtn from "../components/button/foodsize/RemoveFoodSizeBtn";
import EditFoodSizeBtn from "../components/button/foodsize/EditFoodSizeBtn";

export const revalidate = 0

export default async function FoodSizePage() {

    const { foodType } = await getFoodType()
    const { foodSize } = await getFoodSize()


    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>ขนาดอาหาร</h2>

                <div>
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
                        <TableHead>Action</TableHead>
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
                            <TableCell className='text-start'>
                                {item.status === 'active' && (
                                    <div className='w-6 h-6 bg-green-500 rounded-full' />
                                )}
                            </TableCell>
                            <TableCell className='flex gap-2'>
                                <EditFoodSizeBtn foodSize={item} foodType={foodType ?? []} />
                                <RemoveFoodSizeBtn id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}