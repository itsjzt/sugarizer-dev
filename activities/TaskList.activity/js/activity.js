define(["sugar-web/activity/activity", "sugar-web/env"], function (activity, env) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

		var fruitKilled = 0;

		var addFruitWrapper = function (numberOfFruits) {
			var i = 1;
			if (fruitKilled == 1)
				i = 2;
			else
				i = 1;

			console.log(i);
			while (i > 0) {
				addFruit();
				i--
			}
		}

		var killFruit = function (event) {
			event.target.parentNode.removeChild(event.target);
			// event.target.style.display = 'none';
			fruitKilled++;
			addFruitWrapper();
		}

		var gameOver = function (event) {
			console.log('Game Over!');
			document.querySelector("#gameOver").style.display = 'block';
		}

		var addFruit = function () {
			var fruit = document.createElement("div");
			fruit.id = "fruit";
			fruit.className = "fruit";
			fruit.style.left = `${Math.floor(Math.random() * 90)}%`
			fruit.addEventListener('click', killFruit);
			fruit.addEventListener("mouseleave", killFruit);
			// Code for Chrome, Safari and Opera
			fruit.addEventListener("webkitAnimationEnd", gameOver);
			// Standard syntax
			fruit.addEventListener("animationend", gameOver);
			document.getElementById("fruitBox").appendChild(fruit);
			document.querySelector("#killedStat").innerHTML = fruitKilled;
		}

		// Handle click on start
		document.getElementById("start-button").addEventListener('click', function (event) {
			fruitKilled = 0;
			var fruitBox = document.getElementById("fruitBox");
			while (fruitBox.firstChild) {
				fruitBox.removeChild(fruitBox.firstChild);
			}
			addFruitWrapper();
		});

	});

});
