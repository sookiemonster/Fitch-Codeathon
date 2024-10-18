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