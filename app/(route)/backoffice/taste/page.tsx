import { getFoodType, getTastes } from '@/actions/food-action'
import AddTasteBtn from '@/app/(route)/backoffice/components/button/taste/AddTasteBtn'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EditTasteBtn from '../components/button/taste/EditTasteBtn'
import RemoveTasteBtn from '../components/button/taste/RemoveTasteBtn'
import Pagination from '../components/pagination/Pagination'
import Search from '../components/search/Search'

export const revalidate = 0

type TastePageProps = {
    searchParams: {
      q: string
      page: string
    }
}

export default async function TastePage({ searchParams }: TastePageProps) {

    const q = searchParams?.q ?? ''
    const page = searchParams?.page ?? '1'

    const [foodTypeResult, tastesResult] = await Promise.all([getFoodType(q, page), getTastes(q, page)])

    const { foodType } = foodTypeResult
    const { tastes, totalTastes } = tastesResult

    return (
        <div>
            <div className='flex justify-between items-center px-4 py-2'>
                <h2 className='text-2xl'>รสชาติอาหาร</h2>

                <div className='flex items-center gap-2'>
                    <Search placeholder='ค้นหา' />
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
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tastes?.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.FoodType.name}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.remark || '-'}</TableCell>
                            <TableCell className='text-center'>
                                {item.status === 'active' && (
                                    <div className='text-green-600 bg-green-300 px-2 py-1 w-1/2 rounded-xl'>Active</div>
                                )}
                            </TableCell>
                            <TableCell className='space-x-2 text-center'>
                                <EditTasteBtn tastes={item} foodType={foodType ?? []} />
                                <RemoveTasteBtn id={item.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination total={Number(totalTastes)} />
        </div>
    )
}