/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.ingridients = {
            "spaghetti": 1,
            "tomato": 2,
            "meat": 1
        };
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.ingridients = {
            "potato": 1
        };
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.ingridients = {
            "meat": 2,
        };
    }
}

class SteakAndFries extends Steak {
    constructor() {
        super();
        this.cookingTime += 2;
        this.ingridients["potato"] = 1;
    }
}

class Ingridient {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }
}

class Kitchen {
    constructor() {
        this.orders = [];
        this.fridge = {};
    }

    addToFridge(ingridients) {
        for (let i of ingridients) {
            if (i.name in this.fridge) {
                this.fridge[i.name] += i.count;
            } else {
                this.fridge[i.name] = i.count;
            }
        }
    }

    order(dish) {
        for (let name in dish.ingridients) {
            if (!(name in this.fridge) || this.fridge[name] < dish.ingridients[name]) {
                throw "Not enough ingridients in fridge";
            }
        }

        for (let name in dish.ingridients) {
            this.fridge[name] -= dish.ingridients[name];
        }

        this.orders.push(dish);
    }

    async cookFastestOrder() {
        if (this.orders.length == 0) {
            throw "No orders to cook";
        }

        let fastestIndex = 0;
        for (let index in this.orders) {
            if (this.orders[index].cookingTime < this.orders[fastestIndex].cookingTime) {
                fastestIndex = index;
            }
        }

        await this.orders[fastestIndex].cook();
        this.orders.splice(fastestIndex, 1);
        return this.orders[fastestIndex];
    }

    async cookAllOrders() {
        for (let dish of this.orders) {
            dish.cook;
        }
        let cookedDishes = this.orders;
        this.orders = [];
        return cookedDishes;
    }
}

async function test() {
    try {
        const kitchen = new Kitchen();
        kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

        kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
        kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
        kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

        // Feel free to experiment with various dishes and ingridients

        await kitchen.cookFastestOrder(); // Returns fastest dish to make
        await kitchen.cookAllOrders(); // Returns two dishes in array

        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    } catch (err) {
        console.error(err)
    }
}

test();
