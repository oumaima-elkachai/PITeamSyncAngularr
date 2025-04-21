import { TestBed } from '@angular/core/testing';
import { WebSocketService } from './websocket.service';
import { ToastrService } from 'ngx-toastr';
import { Client, IFrame } from '@stomp/stompjs';

describe('WebSocketService', () => {
  let service: WebSocketService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);
    TestBed.configureTestingModule({
      providers: [
        WebSocketService,
        { provide: ToastrService, useValue: spy }
      ]
    });
    service = TestBed.inject(WebSocketService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success toast on connection', () => {
    service.initConnection();
    const client = (service as any).stompClient as Client;
    // Trigger the onConnect callback directly
    (client.onConnect as Function)();
    expect(toastrSpy.success).toHaveBeenCalledWith('Connected to WebSocket', 'Connection');
  });

  it('should show error toast on connection error', () => {
    service.initConnection();
    const client = (service as any).stompClient as Client;
    // Create a proper IFrame object
    const errorFrame: IFrame = {
      command: 'ERROR',
      headers: { 'message': 'Test error' },
      body: '',
      binaryBody: new Uint8Array(),
      isBinaryBody: false,
    };
    (client.onStompError as Function)(errorFrame);
    expect(toastrSpy.error).toHaveBeenCalledWith('WebSocket connection error', 'Error');
  });
});
