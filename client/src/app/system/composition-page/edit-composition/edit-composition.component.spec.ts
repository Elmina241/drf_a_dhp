import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompositionComponent } from './edit-composition.component';

describe('EditCompositionComponent', () => {
  let component: EditCompositionComponent;
  let fixture: ComponentFixture<EditCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
