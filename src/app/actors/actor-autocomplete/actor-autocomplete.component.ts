import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MaterialModuleModule } from '../../material-module/material-module.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorMovie } from '../../interfaces/actor';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actor-autocomplete',
  standalone: true,
  imports: [MaterialModuleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './actor-autocomplete.component.html',
  styleUrl: './actor-autocomplete.component.scss'
})
export class ActorAutocompleteComponent implements OnInit {
  constructor(private actorsService: ActorsService) {
    
  }
  control: FormControl = new FormControl();

  ngOnInit(): void {
    this.control?.valueChanges.subscribe(name => {
      this.actorsService.getByName(name)
        .subscribe({
          next: (actors) => {
            this.actors = actors
          },
          error: (err) => {

          }
        })
    })
  }

  actors: ActorMovie[] = []

  @Input()
  selectedActors: ActorMovie[] = []

  columnsToShow = ['image', 'name', 'character', 'actions']

  @ViewChild(MatTable) table: MatTable<any> | undefined

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedActors.push(event.option.value)
    this.control.patchValue('')
    if(this.table !== undefined) {
      this.table.renderRows();
    }
  }
 
  delete(actor: any) {
    const index = this.selectedActors.findIndex((a: any) => a.name === actor.name)
    this.selectedActors.splice(index, 1);
    this.table?.renderRows()
  }

  finishDrag(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedActors.findIndex((actor: any) => actor === event.item.data)
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table?.renderRows()
  }
}
