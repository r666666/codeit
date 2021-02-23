import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePost } from './post.component';

describe('PagePost', () => {
  let component: PagePost;
  let fixture: ComponentFixture<PagePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePost ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
