export async function copyToClipboard(text: string): Promise<void> {
  try {
    // Modern Clipboard API (secure contexts only)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Prevent scrolling to bottom on iOS
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
  } catch (error) {
    console.error("Failed to copy text:", error);
  }
}
