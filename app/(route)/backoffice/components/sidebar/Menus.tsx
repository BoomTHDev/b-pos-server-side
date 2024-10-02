type MenusProps = {
    children: React.ReactNode
}

export default function Menus({ children }: MenusProps) {
    return (
        <div className='flex flex-col py-3'>
            {children}
        </div>
    )
}