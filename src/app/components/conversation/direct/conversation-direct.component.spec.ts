import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationDirectComponent } from './conversation-direct.component';

describe('ConversationDirectComponent', () => {
  let component: ConversationDirectComponent;
  let fixture: ComponentFixture<ConversationDirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationDirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
