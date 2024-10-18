// NAME IS OPTIONAL 
// EMAIL AND PASSWORD IS REQUIRED
// POINTS DEFAULTS TO 0
// DISCOUNTS IS AN ARRAY OF DISCOUNT IDS
// ITEMS IS AN ARRAY OF ITEM IDS ( CURRENTLY OWNED BY THIS USER )
// HISTORY IS AN ARRAY OF ITEM IDS ( OWNED BY THIS USER AND RETURNED )

type User = {
    id: string
    name: string | null
    email: string
    password: string
    points : number
    discounts : number[]
    items : number[] 
    history : number[] 
}

// LETS SAY SIZE FOR CUPS IS 2 AND SIZE FOR PLATES IS 5

// NAME CAN BE CUP OR PLATE 

// TYPE FOR CUP IS NULL, FOR PLATES ITS EITHER VEGETARIAN OR HALAL OR ANY

// STATUS CAN BE FRESH OR DIRTY 

// OWNER CAN BE AN ID OF A USER/VENDOR/STATION/WASHER

type Item = {
    id : string
    name : string
    type : string | null
    status : string
    owner : string
    size : number | null // for the drop off Station
}

// X,Y COORDINATES
// INVENTORY IS AN ARRAY OF ITEMS IDS ( CURRENTLY OWNED BY THIS VENDOR )

type Vendor = {
    id : string
    name : string | null
    x : number 
    y : number
    inventory : number[]
}

// COST IS THE AMOUNT OF POINTS REQUIRED TO USE THIS DISCOUNT
// REWARD IS THE AMOUNT OF DOLLARS TO RECEIVE WHEN THIS DISCOUNT IS USED

type Discount = {
    id : string
    cost : number
    reward : number
}

// X,Y COORDINATES
// INVENTORY IS AN ARRAY OF ITEMS IDS ( CURRENTLY OWNED BY THIS WASHER )

type Washer = {
    x : number
    y : number
    inventory : number[]
}

// X,Y COORDINATES
// CAPACITY IS THE CAPACITY OF THE STATION
// TOKENS IS THE NUMBER OF TOKENS CURRENTLY IN THE STATION
// INVENTORY IS AN ARRAY OF ITEMS IDS ( CURRENTLY OWNED BY THIS STATION )

type Station = {
    id : string
    x : number
    y : number
    capacity : number
    tokens : number
    inventory : Item[]
}