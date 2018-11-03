define(["sugar-web/activity/activity", "sugar-web/env", "webL10n"], function (activity, env, webL10n) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

		env.getEnvironment(function (err, environment) {
			currentenv = environment;
			// Set current language to Sugarizer
			var defaultLanguage = (typeof chrome != 'undefined' && chrome.app && chrome.app.runtime) ? chrome.i18n.getUILanguage() : navigator.language;
			var language = environment.user ? environment.user.language : defaultLanguage;
			webL10n.language.code = language;
		});

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
			var fruitBox = document.getElementById("fruitBox");
			while (fruitBox.firstChild) {
				fruitBox.removeChild(fruitBox.firstChild);
			}
		}

		var addFruit = function () {
			var fruit = document.createElement("div");
			fruit.id = "fruit";
			fruit.classList.add("fruit");
			fruit.classList.add("orange");
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

		var startGame = function (event) {
			fruitKilled = 0;
			var fruitBox = document.getElementById("fruitBox");
			while (fruitBox.firstChild) {
				fruitBox.removeChild(fruitBox.firstChild);
			}
			addFruitWrapper();
		}

		// Handle click on start
		document.getElementById("start-button").addEventListener('click', startGame);

		// Process localize event
		window.addEventListener("localized", function () {
			document.querySelector("#tutorialMsg").innerHTML = webL10n.get("tutorialMsg");
			document.querySelector("#fruitStatMsg").innerHTML = webL10n.get("fruitStatMsg");
			document.querySelector("#gameOverMsg").innerHTML = webL10n.get("gameOverMsg");
			document.querySelector("#start-button").setAttribute('title', webL10n.get("startGame"));
		});
	});

});
