class PipElements {
  private canvas: HTMLCanvasElement;
  private ctx: ImageBitmapRenderingContext;

  private captureStream: MediaStream;

  video = document.createElement('video');

  constructor() {
    this.canvas = document.createElement('canvas');
    this.captureStream = this.canvas.captureStream();

    const ctx = this.canvas.getContext('bitmaprenderer');
    if (!ctx) throw new Error('Cannot initialize canvas context');
    this.ctx = ctx;

    this.video.srcObject = this.captureStream;
  }

  resize(width: number, height: number) {
    if (this.canvas.width === width && this.canvas.height === height) return;

    this.canvas.width = this.video.width = width;
    this.canvas.height = this.video.height = height;
  }

  update(canvas: OffscreenCanvas) {
    this.resize(canvas.width, canvas.height);
    this.ctx.transferFromImageBitmap(canvas.transferToImageBitmap());
  }
}

const pipElements = new PipElements();
export default pipElements;
