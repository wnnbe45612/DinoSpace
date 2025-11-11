import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTest } from './registro-test';

describe('RegistroTest', () => {
  let component: RegistroTest;
  let fixture: ComponentFixture<RegistroTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
