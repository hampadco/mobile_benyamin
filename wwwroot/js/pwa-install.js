let deferredPrompt;

// Check if the app is already installed
window.addEventListener('load', () => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        console.log('Application is already installed');
        return;
    }
});

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show the custom install button if we haven't shown it recently
    if (shouldShowPrompt()) {
        setTimeout(() => {
            showInstallPromotion();
        }, 3000);
    }
});

// Handle the success of installation
window.addEventListener('appinstalled', (evt) => {
    console.log('Application was successfully installed');
    // Hide any install promotions
    const popup = document.querySelector('.pwa-install-popup');
    if (popup) popup.remove();
});

function showInstallPromotion() {
    if (!deferredPrompt) {
        console.log('No installation prompt available');
        return;
    }

    console.log('Showing install promotion');
    // Create the popup container
    const popup = document.createElement('div');
    popup.className = 'pwa-install-popup';
    popup.innerHTML = `
        <div class="pwa-install-content">
            <img src="assets/images/logo.png" alt="شوفر" style="width: 64px; height: 64px; margin-bottom: 10px;">
            <h3>نصب اپلیکیشن شوفر</h3>
            <p>برای دسترسی سریع‌تر، اپلیکیشن ما را نصب کنید</p>
            <div class="pwa-install-buttons">
                <button id="installPWA" class="install-button">نصب برنامه</button>
                <button id="closePWAPrompt" class="close-button">بعداً</button>
            </div>
        </div>
    `;

    // Add styles for the popup
    const style = document.createElement('style');
    style.textContent = `
        .pwa-install-popup {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            text-align: center;
            direction: rtl;
            max-width: 90%;
            width: 360px;
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
            from {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, 0);
                opacity: 1;
            }
        }
        .pwa-install-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .pwa-install-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .install-button {
            background: #03173d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            transition: background-color 0.2s;
        }
        .close-button {
            background: #f5f5f5;
            color: #666;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: inherit;
            transition: background-color 0.2s;
        }
        .install-button:hover {
            background: #052461;
        }
        .close-button:hover {
            background: #e5e5e5;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(popup);

    // Add event listeners
    document.getElementById('installPWA').addEventListener('click', async () => {
        console.log('Install button clicked');
        if (deferredPrompt) {
            try {
                // Show the installation prompt
                deferredPrompt.prompt();
                console.log('Installation prompt shown');
                
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                
                if (outcome === 'accepted') {
                    console.log('PWA was installed');
                } else {
                    console.log('PWA installation was declined');
                }
                
                // Clear the deferredPrompt variable
                deferredPrompt = null;
                // Remove the popup
                popup.remove();
            } catch (error) {
                console.error('Error during installation:', error);
            }
        } else {
            console.log('No installation prompt available when trying to install');
        }
    });

    document.getElementById('closePWAPrompt').addEventListener('click', () => {
        console.log('Install prompt dismissed');
        popup.remove();
        // Set a flag in localStorage to not show the prompt again for some time
        localStorage.setItem('pwaPromptDismissed', Date.now());
    });
}

// Check if we should show the prompt (not shown in last 24 hours)
function shouldShowPrompt() {
    const lastDismissed = localStorage.getItem('pwaPromptDismissed');
    if (!lastDismissed) return true;
    
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return Date.now() - parseInt(lastDismissed) > oneDay;
} 