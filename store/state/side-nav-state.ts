import { atom } from 'recoil'

type SideNavState = boolean

export const sideNavState = atom<SideNavState>({
    key: 'sideNavState',
    default: true
})