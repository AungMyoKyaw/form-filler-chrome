var header = document.getElementById('header');
var option_submitter = document.getElementById('option_submitter');
var option = document.getElementById('option');
var option_list = document.getElementById('option_list');
var clear_all = document.getElementById('clear_all');

//display options list
optionsCollector()
	.then(_ => {
		return optionList(_);
	})
	.catch(err => {
		console.log(err);
	});

// option submitter

option_submitter.addEventListener('submit', e => {
	optionsCollector()
		.then(_ => {
			return chrome.storage.local.set({
				options: JSON.stringify(_.concat([option.value]).sort())
			});
		})
		.then(_ => {
			return optionsCollector();
		})
		.then(_ => {
			return optionList(_);
		})
		.then(_ => {
			option.value = null;
		})
		.catch(err => {
			console.log(err);
		});
	e.preventDefault();
});

clear_all.addEventListener('click', e => {
	clearOptions();
});

function optionsCollector() {
	return new Promise(resolve => {
		chrome.storage.local.get('options', result => {
			if (result.options) {
				resolve(JSON.parse(result.options));
			}
			resolve([]);
		});
	});
}

function optionList(options) {
	try {
		document.getElementsByTagName('ul')[0].remove();
	} catch (err) {}
	var ulElement = document.createElement('ul');
	return new Promise(resolve => {
		options.forEach(option => {
			var liElement = document.createElement('li');
			var liText = document.createTextNode(option);
			liElement.appendChild(liText);
			ulElement.appendChild(liElement);
		});
		document.body.appendChild(ulElement);
		resolve(true);
	});
}

function clearOptions() {
	document.getElementsByTagName('ul')[0].remove();
	chrome.storage.local.set({
		options: JSON.stringify([])
	});
}
