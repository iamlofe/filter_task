import { idGenerator } from 'main-page/tools/generation-id-tool';

describe('generation tool', () => {
    it('should have length 19 symbols', () => {
        expect(idGenerator().length).toEqual(36);
    });
});
