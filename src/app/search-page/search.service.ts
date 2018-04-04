import { Injectable } from "@angular/core";




@Injectable()
export class SearchService {


    private searchText: string;

    constructor() {

    }



    //
    // OPERATIONS
    //

    setSearchText(text: string) {
        this.searchText = text;
    }

    getSearchText(): string {
        return this.searchText;
    }



}

