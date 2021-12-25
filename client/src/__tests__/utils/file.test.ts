import {FileUtils} from '../../utils';

describe(`FileUtils should work correctly`, () => {
  it(`encodeToBase64 test`, () => {
    const file = new File(['a'.repeat(1)], `test`, {type: 'image/png'});
    const mockCallback = jest.fn();
    const fileReader = {
      readAsDataURL: jest.fn(),
      result: `test`,
    };
    let onloadRef;
    Object.defineProperty(fileReader, 'onload', {
      get() {
        return this.onloadF;
      },
      set(onload) {
        onloadRef = onload;
        this.onloadF = onload;
      },
    });
    jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader as unknown as FileReader);

    FileUtils.encodeToBase64(file, mockCallback);
    // @ts-ignore
    onloadRef();
    expect(fileReader.readAsDataURL).toBeCalledWith(file);
    expect(mockCallback).toBeCalledWith('test');
  });
});
