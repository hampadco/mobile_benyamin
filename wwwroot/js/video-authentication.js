window.videoAuthModule = {
    mediaRecorder: null,
    stream: null,
    videoElement: null,
    chunks: [],

    async initializeCamera() {
        try {
            console.log('Initializing camera...');
            
            // Stop any existing streams
            await this.cleanupCamera();

            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('getUserMedia is not supported');
                return false;
            }

            // Try to get camera access
            try {
                console.log('Requesting camera access...');
                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280, max: 1920 },
                        height: { ideal: 720, max: 1080 },
                        facingMode: 'user',
                        frameRate: 30
                    },
                    audio: true
                });
                console.log('Camera access granted');
            } catch (err) {
                console.error('Camera access failed:', err);
                return false;
            }

            // Show preview
            this.videoElement = document.getElementById('video-preview');
            if (this.videoElement) {
                console.log('Setting up video preview...');
                this.videoElement.srcObject = this.stream;
                await this.videoElement.play();
                console.log('Video preview started');
            }

            return true;
        } catch (error) {
            console.error('Error in initializeCamera:', error);
            return false;
        }
    },

    async startVideoRecording() {
        try {
            if (!this.stream) {
                console.error('No camera stream available');
                return false;
            }

            // Reset chunks array
            this.chunks = [];

            // Setup recording
            try {
                const options = {
                    mimeType: 'video/webm;codecs=vp8,opus',
                    videoBitsPerSecond: 2500000
                };

                this.mediaRecorder = new MediaRecorder(this.stream, options);
                
                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        this.chunks.push(e.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    console.log('Recording stopped, creating preview...');
                    const blob = new Blob(this.chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const playbackVideo = document.getElementById('video-playback');
                    if (playbackVideo) {
                        playbackVideo.src = url;
                        playbackVideo.play().catch(err => console.error('Error playing preview:', err));
                    }
                };

                // Start recording
                console.log('Starting MediaRecorder...');
                this.mediaRecorder.start(1000);
                console.log('Recording started successfully');
                return true;
            } catch (err) {
                console.error('MediaRecorder setup failed:', err);
                return false;
            }
        } catch (error) {
            console.error('Error in startVideoRecording:', error);
            return false;
        }
    },

    async stopVideoRecording() {
        try {
            console.log('Stopping recording...');
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
                this.mediaRecorder = null;
            }
            return true;
        } catch (error) {
            console.error('Error in stopVideoRecording:', error);
            return false;
        }
    },

    async cleanupCamera() {
        try {
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
                this.mediaRecorder = null;
            }
            
            if (this.videoElement) {
                this.videoElement.srcObject = null;
                this.videoElement = null;
            }

            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
                this.stream = null;
            }

            const playbackVideo = document.getElementById('video-playback');
            if (playbackVideo) {
                playbackVideo.src = '';
            }

            this.chunks = [];
            return true;
        } catch (error) {
            console.error('Error in cleanupCamera:', error);
            return false;
        }
    }
}; 