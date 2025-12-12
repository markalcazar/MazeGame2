# Mute Toggle Button - Implementation Reference

## HTML Structure

```html
<button id="mute-toggle" class="control-btn" data-muted="false" aria-label="Mute/Unmute">
  <span class="icon-unmuted">🔊</span>
  <span class="icon-muted hidden">🔇</span>
</button>
```

## CSS Behavior

The icon visibility is controlled by the `data-muted` attribute:
- `data-muted="false"` → Shows 🔊 (unmuted icon)
- `data-muted="true"` → Shows 🔇 (muted icon)

## JavaScript Implementation (for T070)

When implementing the mute toggle in `js/UIManager.js`, use this pattern:

```javascript
function toggleMute() {
  const muteBtn = document.getElementById('mute-toggle');
  const isMuted = muteBtn.getAttribute('data-muted') === 'true';
  const newMutedState = !isMuted;

  // Update the data attribute to toggle icons
  muteBtn.setAttribute('data-muted', newMutedState.toString());

  // Update aria-label for accessibility
  muteBtn.setAttribute('aria-label', newMutedState ? 'Unmute' : 'Mute');

  // Call AudioManager to actually mute/unmute
  audioManager.setMuted(newMutedState);
}

// Wire up the event listener
document.getElementById('mute-toggle').addEventListener('click', toggleMute);
```

## Testing

1. **Initial state**: Button shows 🔊 (unmuted)
2. **Click once**: Button changes to 🔇 (muted), audio stops
3. **Click again**: Button changes back to 🔊 (unmuted), audio resumes at previous volume

## Accessibility

- `aria-label` updates to reflect current state ("Mute" vs "Unmute")
- Keyboard accessible (standard button behavior)
- Visual icon provides clear feedback
