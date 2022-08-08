import { Interceptable, MockAgent, setGlobalDispatcher } from 'undici';

export let mockClient: Interceptable;

beforeEach(() => {
  const mockAgent = new MockAgent({ connections: 1 });

  mockAgent.disableNetConnect();

  setGlobalDispatcher(mockAgent);

  mockClient = mockAgent.get('https://example.com');
});

afterEach(() => mockClient.close());
