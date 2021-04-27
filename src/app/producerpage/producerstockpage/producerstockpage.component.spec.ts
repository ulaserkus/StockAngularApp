import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerstockpageComponent } from './producerstockpage.component';

describe('ProducerstockpageComponent', () => {
  let component: ProducerstockpageComponent;
  let fixture: ComponentFixture<ProducerstockpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducerstockpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerstockpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
