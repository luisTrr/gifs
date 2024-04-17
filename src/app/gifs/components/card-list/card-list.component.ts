import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  @Input()
  public gifs: Gif[] = [];
}
