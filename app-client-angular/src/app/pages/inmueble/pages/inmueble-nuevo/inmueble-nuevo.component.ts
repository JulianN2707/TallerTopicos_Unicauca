import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/save';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-inmueble-nuevo',
  templateUrl: './inmueble-nuevo.component.html',
  styleUrls: ['./inmueble-nuevo.component.scss']
})
export class InmuebleNuevoComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  photoLoaded!: string;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
  }

  registrarInmueble(form: NgForm): void {

      if(form.valid)
      {
        this.loading$ = this.store.pipe(select(fromList.getLoading));

        const inmuebleCreateRequest : fromList.InmuebleCreateRequest = {
          nombre : form.value.nombre,
          picture : this.photoLoaded,
          precio: Number(form.value.precio),
          direccion : form.value.direccion
        }
        console.log(this.photoLoaded+"FOTO A CARGAR")
        this.store.dispatch(new fromList.Create(inmuebleCreateRequest));

      }


  }

  onFilesChanged(url: any): void {
    if(url){
      this.photoLoaded = url;
    }

  }
}
