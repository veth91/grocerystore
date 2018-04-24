class Product {
  constructor (name, unit, quantity, price) {
		this.name = name;
    this.unit = unit;
    this.quantity = quantity;
    this.price = price;
		this.subtotal = quantity * price;
  }
}

var startButton = document.querySelector("#start")
var cart = [];

//============seed data========================
var newItem = new Product("Cheese", "Wheels", 10, 5.75);
cart.push(newItem);
var newItem = new Product("Soup", "Cans", 50, 1.50);
cart.push(newItem);
var newItem = new Product("Apples", "lbs", 30, 2.20);
cart.push(newItem);
//==================================================

startButton.addEventListener("click", function(){
	var input = prompt("What would you like to do?")

	while(input !== "quit") {
		if(input === "listPrice") {
			listProducts("Subtotal");
		} else if (input ==="listName") {
			listProducts("Name")
		} else if(input === "new") {
			addProduct();
		} else if (input === "delete") {
			deleteProduct();
		} else if (input === "emptyCart") {
			emptyCart();
		} else if (input === "checkout") {
			checkout();
		}
		else {
			console.log(`I don't know that command`);
		}

		input = prompt("What would you like to do?")
	}
	console.log(`Okay, you quit the app`);


	function listProducts(type){
		if (cart.length < 1) {
			console.log(`Your cart is empty`);
			return;
		} else if (type === "Subtotal") {
			console.log(`Sorted by Subtotal`);
			var sorted = cart.sort((a,b) => b.subtotal - a.subtotal);
		} else if (type === "Name"){
			console.log(`Sorted by Name`);
			var sorted = cart.sort(function(a,b) {
				var nameA = a.name.toUpperCase();
				var nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}
		console.log(`**********`)
		sorted.forEach(function(item, i){
			console.log(`${i+1}: ${item.name} subtotal: $${item.subtotal}`);
		});
		console.log(`**********`)
	}

	function addProduct(){
		var quantity = NaN;
		var price = NaN;

		var name = prompt("Enter new Item name");
		name = name[0].toUpperCase() + name.slice(1,name.length).toLowerCase();
		var unit = prompt("Enter the item's unit ex:cans");
		while(isNaN(quantity)) {
			quantity = parseFloat(prompt("Enter the item's quantity"));
		}
		while(isNaN(price)) {
			price = parseFloat(prompt("Enter the item's price").replace(/[^\d.-]/g, ''));
		}
		var newItem = new Product(name, unit, quantity, price);
		cart.push(newItem);
		console.log(`Added ${newItem.quantity} ${newItem.unit} of ${newItem.name} at $${newItem.price} each`);
	}

	function deleteProduct(){
		var name = prompt("Enter name of item to delete").toUpperCase();
		for (var i=0; i<cart.length; i++) {
			if (cart[i].name.toUpperCase() === name ) {
				console.log(`Deleted ${cart[i].name}`);
				cart.splice(i, 1);
				return;
			}
		}
		console.log(`I couldn't find that product`);
	}

	function emptyCart() {
		var confirm = prompt(`Type 'DELETE' if you are sure you want to empty your cart`)
		if (confirm === "DELETE") {
			cart = [];
			listProducts("Name");
		} else {
			alert(`Whew, that was a close one!`);
		}
	}

	function checkout() {
		var total = 0;

		for (var i = 0; i < cart.length; i++) {
			total += cart[i].subtotal;
		};
		alert(`Your total is $${total}`);
		var paymentType = prompt("You can pay with 'cash', 'card' or 'iou'");
		switch (paymentType) {
			case "cash":
				var payment = prompt(`You owe me $${total} type in how much you have`);
				var change = payment - total;
				if (payment > total) {
					alert(`Thanks, here is $${change} back for you`);
					break;
				} else if (payment < total) {
					alert(`That's $${-1 * change} short, try again!`);
					break;
				} else if (payment == total) {
					alert("Pleasure doing business with you")
				}
				break;
			case "card":
				var payment = "";
				while (payment.length !== 16) {
					var payment = prompt("Please input your 16 digit credit card number without spaces");
				}
					var exp = prompt("And the expiration date please");
					var code = prompt("Finally, the security code");
					alert(`Processing card ending in ${payment.slice(12)}`);
					console.log("Approved, Thank you for your business");
				break;
			case "iou":
				var payment = alert("I know you're good for it!");
				break;
			default:
				console.log("Sorry I don't recognize that form of payment");
		}

	}
});
