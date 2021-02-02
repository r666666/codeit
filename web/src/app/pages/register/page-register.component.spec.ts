import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRegister } from './page-register.component';

describe('RegisterComponent', () => {
  let component: PageRegister;
  let fixture: ComponentFixture<PageRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRegister ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
