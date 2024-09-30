document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const excludedUrls = [
        // Add URLs here
    ];

    function isExcludedPage() {
        const currentUrl = window.location.href;
        return excludedUrls.includes(currentUrl);
    }

    // Function to inject the share button HTML
    function injectShareButton() {
        const shareButtonHtml = `
<!-- Floating Main Share Button -->
<div class="floating-share">
    <div class="share-button" id="mainShareButton">
        <img src="icons/share_button.png" alt="Share Button" />
    </div>

    <div id="overlay"></div>

    <!-- Share Options Modal -->
    <div id="shareOptionModal" class="share-modal">
        <div class="share-modal-content">
            <span class="close-button" id="closeModal">&times;</span>
            <div class="share-options">
                <div class="share-option" id="nativeShareButton">
                    <img src="icons/share.png" alt="Share Profile" />
                    <p>Share Profile</p>
                </div>
                <div class="share-option" id="qrShareButton">
                    <img src="icons/Qr_button.png" alt="Share QR code" />
                    <p>Share QR</p>
                </div>
                <div class="share-option" id="qrDownloadButton">
                    <img src="icons/download.png" alt="Download QR code" />
                    <p>Download QR</p>
                </div>
            </div>
        </div>
        <div id="socialShareModal" class="share-modal">
            <div class="share-modal-content">
                <span class="close-button" id="closeSocialModal">&times;</span>
                <div class="share-options">
                    <a id="facebookShare" class="share-option">
                        <img src="icons/facebook.png" alt="Share on Facebook" />
                    </a>
                    <a id="twitterShare" class="share-option">
                        <img src="icons/twitter.png" alt="Share on Twitter" />
                    </a>
                    <a id="linkedinShare" class="share-option">
                        <img src="icons/LinkedIn.png" alt="Share on LinkedIn" />
                    </a>
                    <a id="whatsappShare" class="share-option">
                        <img
                            src="icons/whatsapp.webp"
                            alt="Share on WhatsApp"
                        />
                    </a>
                    <a id="emailShare" class="share-option">
                        <img src="icons/mail.png" alt="Share on Mail" />
                    </a>
                    <a id="copyLink" class="share-option">
                        <img src="icons/copy_purple.png" alt="Copy Link" />
                    </a>
                </div>
            </div>
        </div>
    </div>


        `;
        body.insertAdjacentHTML("beforeend", shareButtonHtml);
    }

    if (!isExcludedPage()) {
        injectShareButton();
    }
});
