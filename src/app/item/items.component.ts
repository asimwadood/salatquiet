import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { Item } from "./item";
import { Page } from "tns-core-modules/ui/page";
import { SearchMosqueComponent } from '../search-mosque/search-mosque.component';
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    mosqueFound: string;
    labelSearch: string = 'Find your Mosque';

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(private _modalService: ModalDialogService,
		private _vcRef: ViewContainerRef,
		private page: Page) { }

    ngOnInit(): void {
        //this.items = this.itemService.getItems();
    }

    onOpenSearchMosque(isFrom: boolean): void {
		const options: ModalDialogOptions = {
			viewContainerRef: this._vcRef,
			context: { isFrom },
			fullscreen: true
		};

		this._modalService.showModal(SearchMosqueComponent, options)
			.then((result: any) => {
				if (result && result.mosque && result.mosque.name) {
                    this.mosqueFound = result.mosque.name;
                    this.labelSearch = 'Mosque Selected:';
                }
			});
	}
}
