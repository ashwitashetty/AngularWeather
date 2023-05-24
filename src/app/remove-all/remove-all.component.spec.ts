import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAllComponent } from './remove-all.component';

describe('RemoveAllComponent', () => {
  let component: RemoveAllComponent;
  let fixture: ComponentFixture<RemoveAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
