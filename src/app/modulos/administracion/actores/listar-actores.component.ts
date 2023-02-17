import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from 'src/app/interface/actores';

@Component({
  selector: 'app-listar-actores',
  templateUrl: './listar-actores.component.html'
})
export class ListarActoresComponent {

  @Input() actores: Actor[] = [];
  @Output() onEliminar: EventEmitter<Actor> = new EventEmitter();

  eventEliminar(actor: Actor): void {
    this.onEliminar.emit(actor);
    console.log(actor);
  }

}
