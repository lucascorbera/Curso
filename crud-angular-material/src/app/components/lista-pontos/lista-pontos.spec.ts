import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPontos } from './lista-pontos';

describe('ListaPontos', () => {
  let component: ListaPontos;
  let fixture: ComponentFixture<ListaPontos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPontos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPontos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
