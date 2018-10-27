
//Use shoppingCart to list all the relevant functions within {} 
var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function(name,price,count) {
	this.name = name
	this.price = price
	this.count = count
}


// Add to cart function
shoppingCart.addItemToCart = function (name,price,count) {
	for (var i in this.cart){
		if (this.cart[i].name === name){
			this.cart[i].count += count; //add exact number of same identity to the previous database 
			this.saveCart();
			return;  // 
		}
	}
	var item = new this.Item (name, price, count);
	this.cart.push(item);
	this.saveCart(); //associated w the function saveCart below to record any changes
}

//For data input: 
shoppingCart.setCountForItem = function (name,count){
	for (var i in this.cart) {
		if (this.cart[i].name === name){
			this.cart[i].count = count;
			break;
		}
	}
	this.saveCart();
}



//remove item by one
shoppingCart.removeItemFromCart = function (name){
	for (var i in this.cart){
		if (this.cart[i].name === name){
			this.cart[i].count -- ; // -- means minus one from list
			if (this.cart[i].count === 0) {
				this.cart.splice(i,1); 
			}
			break; //哪里break？？？？？？？
		}
	}
	this.saveCart(); //associated w the function saveCart below to record any changes
}

//remove item all
shoppingCart.removeItemFromCartAll = function (name){
	for (var i in this.cart){
		if (this.cart[i].name === name){
			this.cart.splice(i,1);
			break;
		}
	}
	this.saveCart(); //associated w the function saveCart below to record any changes
}


//clear all
shoppingCart.clearCart = function (){
	this.cart = [];
	this.saveCart(); //associated w the function saveCart below to record any changes
}

//total count of all items
shoppingCart.countCart = function(){
	var totalCount = 0;
	for (var i in this.cart) {
		totalCount += this.cart[i].count;
	}
	return totalCount;
}
//total cost of all items
shoppingCart.totalItemCost = function(){
	var totalCost = 0;
	for (var i in this.cart){
		totalCost += this.cart[i].price * this.cart[i].count;
	}
	return totalCost.toFixed(2);
}

//list Cart, array of items
shoppingCart.listCart = function(){
	var cartCopy = [];
	for (var i in this.cart){
		var item = this.cart[i];
		var itemCopy = {};
		for (var j in item){
			itemCopy[j] = item [j];
		}
		itemCopy.total = (item.price * item.count).toFixed(2);
		cartCopy.push(itemCopy);
	}
	return cartCopy; //create a copy of the original cart wihtout changing the original one; important not to use "=" 
}

//saveCart
shoppingCart.saveCart = function(){
	localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}


//loadCart
shoppingCart.loadCart = function(){
	this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
} 

shoppingCart.loadCart();
