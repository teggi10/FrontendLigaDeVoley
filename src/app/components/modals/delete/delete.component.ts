import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{


  constructor( @Inject(MAT_DIALOG_DATA) public data: {nombre: string},
  private dialogRef: MatDialogRef<DeleteComponent>){}

  ngOnInit(): void {

  }

  cancelar(){
    this.dialogRef.close(false);
  }

  aceptar(){
    this.dialogRef.close(true);
  }
}
