//lemme know if something doesn't look correct

type User = {
    id: string
    name: string | null
    email: string
    password: string
    points : number
    discounts : number[] //array of discount ids
    history : Item[] //array of items
}

type Item = {
    id : string
    name : string
    type : string | null
    status : string
    owner : string
    size : number | null // for the drop off Station
}

type Vendor = {
    id : string
    name : string | null
    x : number 
    y : number
    inventory : Item[]
}

type Discount = {
    id : string
    cost : number
    reward : number
}

type Washer = {
    id : string
    x : number
    y : number
    inventory : Item[]
}

type Station = {
    id : string
    x : number
    y : number
    capacity : number
    inventory : Item[]
}