import { useRef, useState } from "react";
import "./shortcode.scss";

const ShortCode = ({ shortcode }) => {
    const tooltip = useRef(null);
    const inputRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const textToCopy = shortcode || (inputRef.current ? inputRef.current.value : "");

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

        if (inputRef.current) {
            try {
                inputRef.current.focus();
                inputRef.current.select();
                inputRef.current.setSelectionRange(0, 99999);
            } catch (err) {
                // Ignore focus error
            }
        }

        let success = false;
        if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            try {
                await navigator.clipboard.writeText(textToCopy);
                success = true;
            } catch (err) {
                console.warn("navigator.clipboard.writeText failed:", err);
            }
        }

        if (!success) {
            try {
                const el = document.createElement("textarea");
                el.value = textToCopy;
                el.setAttribute("readonly", "");
                el.style.position = "fixed";
                el.style.left = "-9999px";
                el.style.top = "-9999px";
                document.body.appendChild(el);
                el.focus();
                el.select();
                el.setSelectionRange(0, 99999);
                success = document.execCommand("copy");
                document.body.removeChild(el);
            } catch (err) {
                console.error("execCommand fallback failed:", err);
            }
        }

        if (success) {
            feedback();
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
                            ref={inputRef}
                            readOnly
                            value={shortcode}
                            onClick={handleCopy}
                        />
                    </div>

                    <div className="pdfEmbedShortCodeCopyBtn" onClick={handleCopy}>
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
