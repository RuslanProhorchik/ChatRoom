import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectConversationComponent } from './direct-conversation.component';

describe('DirectConversationComponent', () => {
  let component: DirectConversationComponent;
  let fixture: ComponentFixture<DirectConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
