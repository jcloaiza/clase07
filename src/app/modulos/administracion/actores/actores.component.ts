import { Component } from '@angular/core';
import { Actor } from 'src/app/interface/actores';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html'
})
export class ActoresComponent {

  public misActores: Actor[] = [];

  public id: number = 1;

  /** Propiedad actor */
  public actor: Actor = { Id: 1, Nombre: '', Apellido: '' }

  /** propiedad mensaje */
  public msg: boolean = false;


  /**Evemto guardar */
  Guardar() {

    if (this.actor.Nombre === '' || this.actor.Apellido === '') {
      this.msg = true;
    } else {
      this.msg = false;
      //Puedo guardar la informciín

      this.misActores.push(this.actor);
      this.id++;
      this.actor = { Id: this.id, Nombre: '', Apellido: '' };

    }
    //event.preventDefault();
    console.log("actor", this.actor);
  }

  eliminarenpapa(event: Actor) {

    let index = this.misActores.findIndex(w => w.Id == event.Id);
    this.misActores.splice(index, 1);

  }

  /*
    cambiarNombre($event:any){
      this.nombre=$event.target.value;
      //console.log($event);
    }
    */
}
