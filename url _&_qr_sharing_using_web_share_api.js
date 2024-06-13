// Social Sharing
document.addEventListener("DOMContentLoaded", function () {
    const mainShareButton = document.getElementById("mainShareButton");
    const nativeShareButton = document.getElementById("nativeShareButton");
    const qrShareButton = document.getElementById("qrShareButton");
    const qrDownloadButton = document.getElementById("qrDownloadButton");
    const socialShareModal = document.getElementById("socialShareModal");
    const shareOptionModal = document.getElementById("shareOptionModal");
    const closeModal = document.getElementById("closeModal");
    const closeSocialModal = document.getElementById("closeSocialModal");
    const pageUrl = window.location.href;
    const documentTitle = document.title;

    // Helper function to generate a valid file name from the document title
    function generateFileName(title) {
        return title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + "_qr.png";
    }

    // Show the modal with share options
    mainShareButton.addEventListener("click", function () {
        shareOptionModal.style.display = "block";
    });

    // Close the share modal
    closeModal.addEventListener("click", () => {
        shareOptionModal.style.display = "none";
    });

    // Close the social media modal
    closeSocialModal.addEventListener("click", () => {
        socialShareModal.style.display = "none";
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
        if (event.target == socialShareModal) {
            socialShareModal.style.display = "none";
        }
        if (event.target == shareOptionModal) {
            shareOptionModal.style.display = "none";
        }
    });

    // Function to share via Web Share API
    nativeShareButton.addEventListener("click", function () {
        if (navigator.share) {
            try {
                navigator.share({
                    title: documentTitle,
                    url: pageUrl,
                });
                console.log("Thanks for sharing!");
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            socialShareModal.style.display = "block";
        }
    });

    qrShareButton.addEventListener("click", function () {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
            pageUrl
        )}&size=200x200`;

        // Fetch the QR code image
        fetch(qrCodeUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], generateFileName(documentTitle), {
                    type: "image/png",
                });

                if (navigator.share) {
                    navigator
                        .share({
                            title: "QR Code for this page",
                            text: "Scan this QR code to visit the page",
                            files: [file],
                        })
                        .then(() => console.log("Successful QR code share"))
                        .catch((error) =>
                            console.log("Error sharing QR code", error)
                        );
                } else {
                    alert(
                        "Web Share API is not available. Please download the QR code to share it."
                    );
                }
            })
            .catch((error) => console.error("Error generating QR code", error));
    });

    qrDownloadButton.addEventListener("click", function () {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
            pageUrl
        )}&size=200x200`;

        // Fetch the QR code image and trigger download
        fetch(qrCodeUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = generateFileName(documentTitle);
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => console.error("Error generating QR code", error));
    });

    // Function to attempt opening app, then fallback to web URL
    function openAppOrFallback(appUrl, webUrl) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = appUrl;

        document.body.appendChild(iframe);

        setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(webUrl, "_blank");
        }, 1000);
    }

    // Set the URLs for social media sharing with app redirection for socialShareModal
    document
        .getElementById("facebookShare")
        .addEventListener("click", function (e) {
            e.preventDefault();
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    pageUrl
                )}`,
                "_blank"
            );
        });

    document
        .getElementById("twitterShare")
        .addEventListener("click", function (e) {
            e.preventDefault();
            window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    pageUrl
                )}`,
                "_blank"
            );
        });

    document
        .getElementById("linkedinShare")
        .addEventListener("click", function (e) {
            e.preventDefault();
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    pageUrl
                )}`,
                "_blank"
            );
        });

    document
        .getElementById("whatsappShare")
        .addEventListener("click", function (e) {
            e.preventDefault();
            openAppOrFallback(
                "whatsapp://send?text=" + encodeURIComponent(pageUrl),
                `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    pageUrl
                )}`
            );
        });
});
