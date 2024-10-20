enum Status {
    SHIPPABLE,
    RENTED,
    NEEDS_PROCESSING
}

interface Place {
    id:number,
    real_name?:string
}

interface Item {
    id:number
    name:string,
    type:string, 
    status:string,
}

interface InventoryCounters {
    washed_count:number,
    unwashed_count:number,
    uncollected_count:number
}

interface Inventory {
    vegan: InventoryCounters;
    halal: InventoryCounters;
    none: InventoryCounters;
}

interface User {
    user_id:string
    name:string
}

interface Vendor {
    id:number, 
    lat:number, 
    lng:number, 
    name?:string, 
    inventory?: Item[]
}

export type {User, Place, Item, Vendor};