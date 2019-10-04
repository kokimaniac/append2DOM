/*
let emailComponent = document.getElementById("email_component");
//buttons
let addButton = document.getElementsByClassName("add-element");
//global variable
let clicks = 1;

addButton[0].addEventListener("click", function(e) {
	let newContainer = document.createElement("div");
	let fieldElement = document.createElement("input");
	let buttonElement = document.createElement("button");
	newContainer.className = e.target.parentNode.className;
	fieldElement.className = "form-field";
	fieldElement.name = `${e.target.previousElementSibling.name}[]`;
	fieldElement.id = `${e.target.previousElementSibling}_${clicks}`;
	fieldElement.value = clicks;
	buttonElement.className = "del-element bt bt-danger";
	buttonElement.innerText = "Del Element";
	buttonElement.onclick = function (e) {
		console.log(e.target.previousElementSibling.id);
		e.target.previousElementSibling.parentNode.remove();
	};
	newContainer.appendChild(fieldElement);
	newContainer.appendChild(buttonElement);
	emailComponent.appendChild(newContainer);
	clicks += 1;
});
*/
class AppendRemove {
	rootComponent = undefined;
	addButtonElement = [];
	clicks = 1;

	setClicks (click) {
		this.clicks = click;
	}

	getClicks () {
		return this.clicks;
	}

	setAddButton (buttonTag) {
		this.addButtonElement = document.getElementsByClassName(buttonTag);
	}

	setRootComponent (rootId) {
		this.rootComponent = document.getElementById(rootId);
	}

	getRootComponent () {
		return this.rootComponent;
	}

	addButtonEvent (rootId, index) {
		this.setRootComponent(rootId);
		let root = this.getRootComponent();
		let count = this.getClicks();
		let clicked = (count) => {
			return this.setClicks(count);
		}
		this.addButtonElement[index != 0 ? index : 0].addEventListener("click", function(e) {
			let childList = [];
			let newContainer = document.createElement("div");
			let buttonElement = document.createElement("button");
			//let fieldElement = document.createElement("input");
			newContainer.className = e.target.parentNode.className;

			childList = Object.values(e.target.parentNode.children)

			childList.map((child, index, arr) => {
				if (index != arr.length-1) {
					let formElement = document.createElement(child.tagName.toLowerCase());
					Object.assign(formElement, {
						className: child.className,
						name: `${child.name}[]`,
						id: `${child.id}_${count}`,
						placeholder: child.placeholder
					});
					newContainer.appendChild(formElement);
				}
			})
			Object.assign(buttonElement, {
				className: "del-element bt bt-danger",
				innerText: "Del Element",
				onclick: function (e) {
					e.target.parentNode.remove();
					count-=1;
					clicked(count);
				}
			})
			newContainer.appendChild(buttonElement);
			root.appendChild(newContainer);
			count+=1;
			clicked(count);
		})
	}

	constructor(rootId, buttonClass, index) {
		this.setAddButton(buttonClass);
		this.addButtonEvent(rootId, index);
	}
}

let emailComponent = new AppendRemove("email_component", "add-element", 0);