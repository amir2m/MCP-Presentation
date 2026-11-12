/**
 * Checks whether an active event originates from an editable input,
 * textarea, or contentEditable element to prevent hotkey collisions.
 */
export function isEditableElement(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toUpperCase();
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
    return true;
  }

  if (target.isContentEditable) {
    return true;
  }

  return false;
}

/**
 * Normalizes keyboard event key codes for presentation navigation.
 * Note: In RTL contexts, ArrowLeft typically advances forward (next) and ArrowRight goes back,
 * or standard presenter remotes often map ArrowRight to next.
 * We support both intuitively:
 * - Next slide: Space, PageDown, or ArrowLeft (in RTL) / ArrowRight
 * - Previous slide: PageUp, Backspace, or ArrowRight (in RTL) / ArrowLeft
 * Let's provide an explicit configuration for standard intuitive presentation navigation.
 */
export interface KeyNavAction {
  action: 'next' | 'prev' | 'exit' | 'none';
}

export function parsePresentationKey(event: KeyboardEvent, isRTL: boolean = true): KeyNavAction {
  if (isEditableElement(event.target)) {
    return { action: 'none' };
  }

  const key = event.key;

  if (key === 'Escape') {
    return { action: 'exit' };
  }

  // Next Slide actions
  // In Persian RTL reading order, ArrowLeft is moving forward (next)
  // But many presenter clickers / users press ArrowRight or Space
  // We accept ArrowLeft, ArrowRight (with preference or standard), Space, PageDown
  if (key === 'Space' || key === ' ' || key === 'PageDown') {
    return { action: 'next' };
  }

  if (key === 'PageUp') {
    return { action: 'prev' };
  }

  // Left and Right arrows:
  // Requirements specify: "Keyboard navigation using ArrowLeft and ArrowRight. Escape to exit presentation mode."
  // When in RTL layout:
  // Next in Persian: ArrowLeft (flowing leftwards) or ArrowRight (traditional clicker)
  // Let's allow ArrowLeft for next in RTL, or check standard:
  // If user presses ArrowLeft -> next (forward in RTL)
  // If user presses ArrowRight -> prev (backward in RTL)
  if (key === 'ArrowLeft') {
    return { action: isRTL ? 'next' : 'prev' };
  }

  if (key === 'ArrowRight') {
    return { action: isRTL ? 'prev' : 'next' };
  }

  return { action: 'none' };
}

