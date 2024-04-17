import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interface/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] =[];

  private _tagsHistrory: string[] = [];
  private apikey:        string = 'ljslpzjcKS3J6pV6OszKSzHLOnnQhqjL';
  private serviceUrl :   string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    // console.log('Gifs Service Ready')
   }

  get tagsHistory(){
    return [...this._tagsHistrory];
  }

  private organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if ( this._tagsHistrory.includes(tag) ){
      this._tagsHistrory = this._tagsHistrory.filter( (oldtag) => oldtag !== tag)
    }

    this._tagsHistrory.unshift( tag );
    this._tagsHistrory = this.tagsHistory.splice(0,15);
    this.saveStorage();

  }

    private saveStorage():void{
      localStorage.setItem('history', JSON.stringify( this._tagsHistrory ));
    }

    private loadLocalStorage():void{
      if( !localStorage.getItem('history') ) return;

      this._tagsHistrory = JSON.parse( localStorage.getItem('history')! );

      if( this._tagsHistrory.length === 0 )return;
      this.searchTag( this._tagsHistrory[0] );
    }


  searchTag(tag: string): void{
    if(tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '21')
    .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params })
    .subscribe( resp => {

      this.gifList = resp.data;
      // console.log({ gifs: this.gifList });

    });

    // console.log(this.tagsHistory);


  }
}
