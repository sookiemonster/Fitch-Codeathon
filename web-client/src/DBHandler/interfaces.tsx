enum Status {
    SHIPPABLE,
    RENTED,
    NEEDS_PROCESSING
}

interface Location {
    id:number,
    real_name:string
}

interface Item {
    type:string,
    last_checkout_date:Date,
    status:Status,
    location:Location
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

interface Station {
    id:string,
    current_capacity:number,
    alert_threshold:number,
    token_count:number
}