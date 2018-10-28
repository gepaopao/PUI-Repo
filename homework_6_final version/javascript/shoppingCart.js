
//replace price in JS
//var pricetotalone = document.getElementById ('t2');
// var XXXBackpack = new shoppingCart("name", "price", "count");

//1. S Q C -- image change
//2. S Q C -- price change
//3. S Q C + Add = new data


var shoppingCart = {};
shoppingCart.cart = [];

/*
function addAnItem(price, count, color,size){
	this.price = price;
	this.count = count;
	this.color = color;
	this.size= size;
}*/
/*
$("#buttonAddToCart").click(function(){
	array.push (new addAnItem )


}
*/

var currentProductDetail = {
	size: 'S',
	quantity: '1',
	color: 'Backpack-grey',
};


shoppingCart.Item = function(name,price,count) {
	this.price = price
	this.count = count
	this.name = name
}


// Add to cart function
shoppingCart.addItemToCart = function (name,price,count) {
	console.log(this);
	for (var i in this.cart){
		if (this.cart[i].name === name){
			var currentCount = parseInt(this.cart[i].count);
			this.cart[i].count = currentCount + parseInt(count); //add exact number of same identity to the previous database 
			this.saveCart();
			return;  // 
		}
	}
	if (!this.cart) {
		this.cart = [];
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
			break; 
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
		totalCount += parseInt(this.cart[i].count);
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
	console.log('fkdjtfdrsesuya');
	localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}


//loadCart
shoppingCart.loadCart = function(){
	this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
} 

shoppingCart.loadCart();







//


$ (".add-to-cart").click(function(event){
	event.preventDefault();
	var name = $(this).attr("data-name");
	var price = Number($(this).attr("data-price"));

	shoppingCart.addItemToCart(name,price,1);
	displayCart();

});


$ ("#clear-cart").click(function(event){
	shoppingCart.clearCart();
	displayCart();
});


function displayCart(){

var cartArray = shoppingCart.listCart();
var output = "";


for (var i in cartArray){


	output += "<li class= 'youngisthebest01'>"+cartArray[i].name+"</li>";
	output += "<li class= 'youngisthebest02'>"+"$" + cartArray[i].price+"&nbsp&#935;" +"</li>";
	output += "<li class= 'young-input'>"
	+" <input class='item-count' type ='number' data-name='"
	+cartArray[i].name
	+"' value = '" + cartArray[i].count + "' >"+"</li>";
	output += "<li class= 'youngisthebest03'>"+ cartArray[i].total + "</li>";
	output += "<li class= 'youngisthebest04'>"+ "<button class='subtract-item' data-name='"
	+cartArray[i].name+"'>&#9660</button>"+"</li>";
	output += "<li class= 'youngisthebest04'>"+ "<button class='add-item' data-name='"
	+cartArray[i].name+"'>&#9650</button>"+"</li>";
	output += "<li class= 'youngisthebest05'>"+"<button class='delete-item' data-name='"
	+cartArray[i].name+"'> Delete </button>"+"</li>";
	output += "<li class= 'youngisthebest00'>"+" "+"</li>";
	
}

$ ("#show-cart").html(output);
$ ("#count-cart").html(shoppingCart.countCart());
$ ("#total-cart").html(shoppingCart.totalItemCost());

}


$("#show-cart").on("click",".delete-item",function(event){
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCartAll(name);
	displayCart();
});


$("#show-cart").on("click",".subtract-item",function(event){
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCart(name);
	displayCart();
});

$("#show-cart").on("click",".add-item",function(event){
	var name = $(this).attr("data-name");
	shoppingCart.addItemToCart(name,0,1);  // "0" to hold the place of price and only changes count
	displayCart();
});


$("#show-cart").on("change", ".item-count", function(event){
	var name = $(this).attr("data-name");
	var count = Number($(this).val()); //otherwise it is string
	shoppingCart.setCountForItem(name,count);
	displayCart();
});

displayCart();

$(document).on("click", ".btn-size", function(){
	$(".btn-size").removeClass("active1");
	$(this).addClass("active1");
	var value = $(this).text();
	if (value) {
		currentProductDetail.size = value;
	}
	
});

$(document).on("click", ".btn-quan", function(){
	$(".btn-quan").removeClass("active2");
	$(this).addClass("active2");
	var value = $(this).text();
	if (value) {
		currentProductDetail.quantity = value;
	}
});

$(document).on("click", ".btn-color", function(){
	$(".btn-color").removeClass("active3");
	$(this).addClass("active3");
	var value = $(this).attr('data-color');
	if (value) {
		currentProductDetail.color = value;
	}
});

$(document).on("click", "#buttonAddToCart", function(){
	console.log(currentProductDetail);
	shoppingCart.addItemToCart(currentProductDetail.color + '-' + currentProductDetail.size, 25, currentProductDetail.quantity)
});




