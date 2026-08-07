import { useRef, useState } from "@wordpress/element";
import { useCopyToClipboard } from "@wordpress/compose";
import "./shortcode.scss";

const ShortCode = ({ shortcode }) => {
    const tooltip = useRef(null);
    const [copied, setCopied] = useState(false);

    const feedback = () => {
        setCopied(true);

        if (tooltip.current) {
            tooltip.current.innerHTML = "Copied Successfully!";
            tooltip.current.classList.add("copied");
        }

        setTimeout(() => {
            setCopied(false);

            if (tooltip.current) {
                tooltip.current.innerHTML = "Copy To Clipboard";
                tooltip.current.classList.remove("copied");
            }
        }, 1500);
    };

    const copyRef = useCopyToClipboard(shortcode, feedback);

    const handleInputClick = (e) => {
        if (e && e.target) {
            e.target.select();
        }
    };

    return (
        <div className="pdfEmbedShortCode">
            <div className="pdfEmbedShortCodeInner">
                <div className="pdfEmbedShortCodeInputWrapper">
                    <span ref={tooltip} className="tooltip">
                        Copy To Clipboard
                    </span>

                    <div className="pdfEmbedShortCodeInput">
                        <input
                            ref={copyRef}
                            readOnly
                            value={shortcode}
                            onClick={handleInputClick}
                        />
                    </div>

                    <div ref={copyRef} className="pdfEmbedShortCodeCopyBtn">
                        {copied ? (
                            "✓"
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="pdfEmbedShortCodeHeader">
                    <span>Copy the shortcode and use it anywhere.</span>
                </div>
            </div>
        </div>
    );
};

export default ShortCode;
