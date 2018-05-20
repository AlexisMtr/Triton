import { Component, OnInit } from '@angular/core';
import { PoseidonApiService } from '../../services/poseidon-api.service';
import { Pool } from '../../interfaces/pool';

@Component({
  selector: 'app-triton-content',
  templateUrl: './triton-content.component.html',
  styleUrls: ['./triton-content.component.css']
})
export class TritonContentComponent implements OnInit 
{
  private pool: Pool;

  constructor(private poseidon: PoseidonApiService) { }

  ngOnInit() {
    this.poseidon.GetPool(1)
      .subscribe(data => this.pool = data);
  }
}
