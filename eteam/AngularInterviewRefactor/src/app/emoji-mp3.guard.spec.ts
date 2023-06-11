import { TestBed, async, inject } from '@angular/core/testing';

import { EmojiMp3Guard } from './emoji-mp3.guard';

describe('EmojiMp3Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmojiMp3Guard]
    });
  });

  it('should ...', inject([EmojiMp3Guard], (guard: EmojiMp3Guard) => {
    expect(guard).toBeTruthy();
  }));
});
