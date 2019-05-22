
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { isAndroid } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";

class DataItem {
	constructor(public name: string) {
	}
}

@Component({
  selector: 'ns-search-mosque',
  templateUrl: './search-mosque.component.html',
  styleUrls: ['./search-mosque.component.css'],
  moduleId: module.id,
})

export class SearchMosqueComponent implements OnInit {
	private _searchedText: string = '';
	private arrayMosques: Array<DataItem> = [];
	public mosques: ObservableArray<DataItem> = new ObservableArray<DataItem>();
	public isFrom: boolean = false;

	constructor(private _params: ModalDialogParams, private _page: Page, private router: RouterExtensions, private _activeRoute: ActivatedRoute) {
		this.arrayMosques.push(new DataItem("Madina Masjid"));
		this.arrayMosques.push(new DataItem("Didsbury Mosque"));
		this.arrayMosques.push(new DataItem("Victoria Mosque"));
		this.arrayMosques.push(new DataItem("Arequipa Rodríguez Ballón Airport"));
		this.arrayMosques.push(new DataItem("Cuzco Alejandro Velazco Astete Airport"));
		this.arrayMosques.push(new DataItem("Atlanta Hartsfield-Jackson International Airport"));
		this.arrayMosques.push(new DataItem("New York John F. Kennedy International Airport"));
		this.arrayMosques.push(new DataItem("New York LaGuardia Airport"));
		this.arrayMosques.push(new DataItem("San Diego International Airport"));

		this.mosques = new ObservableArray<DataItem>(this.arrayMosques);

		this.isFrom = this._params.context.isFrom;
	}

	ngOnInit() {
	}

	onClose(): void {
		this._params.closeCallback("return value");
	}

	onSelectItem(args) {
		let mosque = (this._searchedText !== "") ? this.mosques.getItem(args.index) : this.arrayMosques[args.index];
		this._params.closeCallback({
			isFrom: this.isFrom,
			mosque: mosque
		});
	}

	public onSubmit(args) {
		let searchBar = <SearchBar>args.object;
		let searchValue = searchBar.text.toLowerCase();
		this._searchedText = searchValue;

		this.mosques = new ObservableArray<DataItem>();
		if (searchValue !== "") {
			for (let i = 0; i < this.arrayMosques.length; i++) {
				if (this.arrayMosques[i].name.toLowerCase().indexOf(searchValue) !== -1) {
					this.mosques.push(this.arrayMosques[i]);
				}
			}
		}
	}

	public searchBarLoaded(args) {
		let searchBar = <SearchBar>args.object;
		searchBar.dismissSoftInput();

		if (isAndroid) {
			searchBar.android.clearFocus();
		}

		searchBar.text = "";
	}

	public onClear(args) {
		let searchBar = <SearchBar>args.object;
		searchBar.text = "";
		searchBar.hint = "Search for a airport";

		this.mosques = new ObservableArray<DataItem>();
		this.arrayMosques.forEach(item => {
			this.mosques.push(item);
		});
	}

	public onTextChanged(args) {
		this.onSubmit(args);
	}
}
