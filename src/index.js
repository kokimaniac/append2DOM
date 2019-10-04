/*
*	author: Jorge Luis
*	github: github.com/kokimaniac/append2DOM
*
*/

class AppendRemove {
	rootComponent = undefined;
	addButtonElement = [];
	clicks = 1;
	limitClicks = NaN;

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
		let limitClicks = this.limitClicks;
		let root = this.getRootComponent();
		let count = this.getClicks();
		let clicked = (count) => {
			return this.setClicks(count);
		}
		this.addButtonElement[index].addEventListener("click", function(e) {
			/*
			* All child elements from the parent container are store here
			*/
			if (count < limitClicks) {
				let childList = Object.values(e.target.parentNode.children);
				let newContainer = document.createElement("div");
				let buttonElement = document.createElement("button");
				newContainer.className = e.target.parentNode.className;

				childList.map((child, index, arr) => {
					/*
					*	The last element it will not be stored. The last element will be created latter.
					*/
					if (index != arr.length-1) {
						let formElement = document.createElement(child.tagName.toLowerCase());
						if (child.tagName.toLowerCase() == "select") {
							Object.assign(formElement, {
								className: child.className,
								name: `${child.name}[]`,
								id: `${child.id}_${count}`,
							});
							for(let option=0; option<child.options.length; option++) {
								formElement.options[formElement.options.length] = new Option(child.options[option].textContent, child.options[option].value);
							}
							newContainer.appendChild(formElement);
						} else {
							Object.assign(formElement, {
								type: child.type,
								className: child.className,
								name: `${child.name}[]`,
								id: `${child.id}_${count}`,
								placeholder: child.placeholder,
							});						
							newContainer.appendChild(formElement);
						}
					}
				})
				Object.assign(buttonElement, {
					type: "button",
					className: "bt bt-danger",
					innerText: "Remove Element",
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
			}
		});
	}

	constructor(rootId, buttonClass, index, clicks) {
		/*
		*	root		: Is the root parent node.
		*	buttonClass	: Is the className of button (required for executing the event)
		*	index		: The index position of the class element (starts from 0 to n)
		*/
		this.limitClicks = clicks;
		this.setAddButton(buttonClass);
		this.addButtonEvent(rootId, index);
	}
}