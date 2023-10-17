import cv from '@techstark/opencv-js';

export default class Capture {
  private captureStream: MediaStream | null = null;
  private videoSource = document.createElement('video');
  private videoCapture: cv.VideoCapture | null = null;
  private _captureMatrix: cv.Mat | null = null;

  private get videoSettings() {
    const [primaryVideoTrack] = this.captureStream?.getVideoTracks() || [];

    if (!primaryVideoTrack) throw new Error(`Cannot retrieve video track`);
    return primaryVideoTrack.getSettings();
  }

  private get captureMatrix(): cv.Mat {
    if (
      !this._captureMatrix ||
      this._captureMatrix.rows !== this.videoSettings.height ||
      this._captureMatrix.cols !== this.videoSettings.width
    ) {
      this._captureMatrix?.delete();

      this.videoSource.width = this.videoSettings.width ?? 0;
      this.videoSource.height = this.videoSettings.height ?? 0;

      this._captureMatrix = new cv.Mat(
        this.videoSettings.height,
        this.videoSettings.width,
        cv.CV_8UC4,
      );
    }

    if (!this._captureMatrix)
      throw new Error(`Failed to create capture matrix`);

    return this._captureMatrix;
  }

  async initialize() {
    this.captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    const { width, height } = this.videoSettings;

    if (!width || !height)
      throw new Error(
        'Cannot retrieve video dimensions; Check if capture is valid',
      );

    this.videoSource.width = width;
    this.videoSource.height = height;

    this.videoSource.srcObject = this.captureStream;
    this.videoSource.play();

    this.videoCapture = new cv.VideoCapture(this.videoSource);
  }

  takeCapture() {
    if (!this.videoCapture)
      throw new Error(`VideoCapture is null; Check if capture is started`);

    this.videoCapture.read(this.captureMatrix);

    return this.captureMatrix;
  }
}
