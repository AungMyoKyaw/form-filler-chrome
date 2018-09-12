class FormFiller {
	private textareas: any;
	private body: any = document.body;
	private datalist_id: string = '___form_filler__';
	private options: string[] = [];

	constructor() {
		this.optionsCollector().then(_ => {
			this.setDataList(this.options);
		});
		this.textareas = document.getElementsByTagName('input');
		this.setInputListId(this.textareas);
	}

	private optionsCollector(): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			chrome.storage.local.get('options', result => {
				if (result.options) {
					this.options = JSON.parse(result.options);
				}
				resolve(true);
			});
		});
	}

	static console(): void {
		console.log('FORM FILLER');
	}

	private setInputListId(inputs: any): void {
		//set list id for input element
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].setAttribute('list', this.datalist_id);
		}
	}

	private setDataList(options: string[]): void {
		//create datalist element
		const datalistElement = document.createElement('datalist');
		datalistElement.id = this.datalist_id;

		//append options to datalist Element
		options.forEach(option => {
			const optionElement = document.createElement('option');
			optionElement.value = option;

			//append option to datalist element
			datalistElement.appendChild(optionElement);
		});

		//append to body
		this.body.appendChild(datalistElement);
	}
}

FormFiller.console();
const formfiller = new FormFiller();
