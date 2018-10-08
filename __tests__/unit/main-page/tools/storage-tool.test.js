import StorageTool from 'main-page/tools/storage-tool';

describe('Cookie tool test', () => {
    const LocalStorag = new StorageTool(localStorage);

    it('should set storage', () => {
        LocalStorag.set('test', 'value');

        expect(LocalStorag.get('test')).toEqual('value');
    });

    it('should delete item', () => {
        LocalStorag.remove('test');

        expect(LocalStorag.get('test')).toEqual(null);
    });

    it('should clere storage', () => {
        LocalStorag.set('test1', 'value1');
        LocalStorag.set('test2', 'value2');

        LocalStorag.clear();

        expect(LocalStorag.get('test1')).toEqual(null);
    });
});
